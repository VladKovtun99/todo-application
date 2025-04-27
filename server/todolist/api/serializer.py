from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from rest_framework import serializers


class UserRegistrationSerializer(serializers.ModelSerializer):

    # What this does is map the incoming field name (from the JSON) to the field first_name in the User model.
    # In Django's ModelSerializer, source tells the serializer that the name field from the input should correspond to first_name in the model.

    name = serializers.CharField(source='first_name', required=True)
    email = serializers.EmailField(required=True)

    class Meta:
        model = User
        fields = ('name', 'email', 'password')
        extra_kwargs = {
            'password': {'write_only': True},
            'id': {'read_only': True}
        }


    def create(self, validated_data):
        first_name = validated_data.get('first_name')
        email = validated_data.get('email')
        password = validated_data.get('password')

        user = User.objects.create_user(
            username=email,
            email=email,
            password=password,
            first_name=first_name
        )

        
        return user