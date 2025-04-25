import django.contrib.auth
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.models import User

@api_view(['POST'])
def register(request):

    return Response()
