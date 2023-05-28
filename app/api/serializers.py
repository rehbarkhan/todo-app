from rest_framework import serializers
from django.contrib.auth.models import User
from .models import TodoModel

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email','username','password']
        extra_kwargs = {
            'password':{'write_only':True}
        }
    
    def create(self,validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email = validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoModel
        exclude = ['user']

class TodoAllSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField()
    class Meta:
        model = TodoModel
        exclude = ['user']