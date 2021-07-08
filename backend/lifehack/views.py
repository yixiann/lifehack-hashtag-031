from rest_framework import viewsets
from .serializers import UserSerializer, TestSerializer, ChatSerializer
from .models import User, Test, Chat

# Create your views here.
class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

class TestView(viewsets.ModelViewSet):
    serializer_class = TestSerializer
    queryset = Test.objects.all()

class ChatView(viewsets.ModelViewSet):
    serializer_class = ChatSerializer
    queryset = Chat.objects.all()