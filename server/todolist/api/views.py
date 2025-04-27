from django.contrib.auth.hashers import check_password
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response
from .serializer import UserRegistrationSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    refresh['name'] = user.first_name
    refresh['email'] = user.email
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

# https://www.youtube.com/watch?v=BMym71Dwox0&ab_channel=BugBytes
# Video about Serializers (good to watch)

@api_view(['POST'])
def register(request):


    serializer = UserRegistrationSerializer(data=request.data)

    if serializer.is_valid():
        email = request.data.get('email')

        if User.objects.filter(email=email).exists():
            return Response({'error': 'User with this email already exists!'}, status=status.HTTP_401_UNAUTHORIZED)

        user = serializer.save()

        tokens = get_tokens_for_user(user)

        return Response(tokens, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    try:
        user = User.objects.get(email=email)

        if not check_password(password, user.password):
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

    except User.DoesNotExist:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


    tokens = get_tokens_for_user(user)

    return Response(tokens, status=status.HTTP_200_OK)

