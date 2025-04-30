from django.core.serializers import serialize
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializer import UserRegistrationSerializer, UserLoginSerializer, TodoSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes
from todos.models import Todo


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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_todos(request):
    todos = Todo.objects.filter(user=request.user)
    serializer = TodoSerializer(todos, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_todo(request):
    serializer = TodoSerializer(data = request.data, context={'request':request})
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def change_todo_by_id(request):
    todo_id = request.data.get('id')
    todo_to_change = get_object_or_404(Todo, id=todo_id)
    serializer = TodoSerializer(todo_to_change, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_todo_by_id(request):
    todo_id = request.data.get('id')
    todo_to_delete = get_object_or_404(Todo, id=todo_id)
    todo_to_delete.delete()
    return Response({'Success':'Todo was successfully deleted.'})

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_all_todos(request):
    all_todos = Todo.objects.filter(user=request.user.id)
    all_todos.delete()
    return Response({'Success':'All todos were successfully deleted.'})