
from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .serializer import UserRegistrationSerializer, UserLoginSerializer, TodoSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes, action
from todos.models import Todo


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    refresh['name'] = user.first_name
    refresh['email'] = user.email
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

@api_view(['POST'])
def register(request):
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        tokens = get_tokens_for_user(user)
        return Response(tokens, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login(request):
    serializer = UserLoginSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.validated_data['user']
        tokens = get_tokens_for_user(user)
        return Response(tokens, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class TodoViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()

    def get_queryset(self):
        return Todo.objects.filter(user=self.request.user.id)

    def destroy (self, request, *args, **kwargs):
        todo_id = kwargs.get('pk')
        if todo_id is not None:
            todo_to_delete = get_object_or_404(Todo, id=todo_id, user=self.request.user)
            todo_to_delete.delete()
            return Response({'Success':'Todo was successfully deleted!'})

    @action(detail=False, methods=['delete'], url_path='delete-all')
    def delete_all(self, request):
        todos = Todo.objects.filter(user=self.request.user.id)
        count = todos.count()
        todos.delete()
        return Response({'Success':f'{count} objects were successfully deleted.'}, status=status.HTTP_200_OK)


