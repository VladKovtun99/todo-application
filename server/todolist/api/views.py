from datetime import datetime, timedelta
from email.message import EmailMessage
import jwt
from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializer import UserRegistrationSerializer, UserLoginSerializer, TodoSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, action
from todos.models import Todo
import smtplib
from todolist import settings
from users.models import PendingUser


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    refresh['name'] = user.first_name
    refresh['email'] = user.email
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

def get_email_confirmation_token(user_email):
    payload = {
        'email': user_email,
        'exp': datetime.utcnow() + timedelta(hours=1)
    }
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")
    return token


email_todo = 'todolistproject.email@gmail.com'
password_todo = 'dnws qnxh pcvr uinc'

def send_email_confirmation(user_email):
    token = get_email_confirmation_token(user_email)
    confirmation_link = f'http://localhost:8000/api/verify-email/?token={token}'

    msg = EmailMessage()
    msg['Subject'] = 'Email Confirmation'
    msg['From'] = email_todo
    msg['To'] = user_email
    msg.set_content(f"Use this link to confirm your email: {confirmation_link}")

    try:
        with smtplib.SMTP('smtp.gmail.com', 587) as connection:
            connection.starttls()
            connection.login(email_todo, password_todo)
            connection.send_message(msg)
    except smtplib.SMTPRecipientsRefused:
        return Response({'error': 'Something went wrong...'}, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def register(request):
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        PendingUser.objects.create(
            email = serializer.validated_data['email'],
            password = serializer.validated_data['password'],
            first_name = serializer.validated_data['first_name']
        )
        send_email_confirmation(serializer.validated_data['email'])
        return Response({'message':'Check your email for verification.'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def login(request):
    serializer = UserLoginSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.validated_data['user']
        tokens = get_tokens_for_user(user)
        return Response(tokens, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def registration_email_confirm(request):
    token = request.GET.get('token')

    if not token:
        return Response({'error':'No token provided.'}, status.HTTP_404_NOT_FOUND)
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        pending_user = PendingUser.objects.get(email=payload['email'])
        serializer = UserRegistrationSerializer(data={
            'name':pending_user.first_name,
            'email':pending_user.email,
            'password':pending_user.password
        })
        if serializer.is_valid():
            user = serializer.save()
            pending_user.delete()
            tokens = get_tokens_for_user(user)
            return Response(tokens, status=status.HTTP_201_CREATED)
        return Response({'error': 'Data has not surpassed validation (serializer).'}, status=status.HTTP_400_BAD_REQUEST)
    except jwt.ExpiredSignatureError:
        return Response({'error': 'Token has expired'}, status=status.HTTP_400_BAD_REQUEST)
    except PendingUser.DoesNotExist:
        return Response({'error': 'Pending user does not exist.'}, status=status.HTTP_400_BAD_REQUEST)




class TodoViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = TodoSerializer

    def get_queryset(self):
        return Todo.objects.filter(user=self.request.user.id).order_by('id')

    def destroy (self, request, *args, **kwargs):
        todo_id = kwargs.get('pk')
        if todo_id is not None:
            todo_to_delete = get_object_or_404(Todo, id=todo_id, user=self.request.user)
            todo_to_delete.delete()
            return Response({'Success':'Todo was successfully deleted!'})

    @action(detail=False, methods=['delete'])
    def delete(self, request):
        todos = self.get_queryset()
        count = todos.count()
        todos.delete()
        return Response({'Success':f'{count} objects were successfully deleted.'}, status=status.HTTP_200_OK)


