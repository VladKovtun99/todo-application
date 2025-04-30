from django.contrib.auth.models import User
from django.template.defaultfilters import title
from rest_framework import serializers
from todos.models import Todo

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

        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError({'error': 'User with this email already exists!'})

        user = User.objects.create_user(
            username=email,
            email=email,
            password=password,
            first_name=first_name
        )

        
        return user


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True)

    def validate(self, validated_data):
        email = validated_data.get('email')
        password = validated_data.get('password')

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError({'error':'User with email does not exist!'})

        if not user.check_password(password):
            raise serializers.ValidationError({'error':'Invalid credentials!'})

        return {
            'user': user
        }


statuses = ['Not Ready', 'In Progress', 'Done']
class TodoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Todo
        fields = ('id','title', 'status', 'deadline', 'description')

    def validate_status(self, value):
        if value not in statuses:
            raise serializers.ValidationError({'error': 'Invalid status value.'})
        return value

    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['user'] = request.user
        return super().create(validated_data)

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)