from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from .models import User, Test, Chat

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')

    def create(self, validated_data):
        user = User.objects.create(username=validated_data['username'], password = make_password(validated_data['password']))
        user.save()
        return user

class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = ('id', 'text', 'number')

class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ('id', 'fromAddress', 'toAddress', 'text', 'date')
