from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from .serializers import UserSerializer, TestSerializer, ChatSerializer, UserSerializerWithToken, AppSerializer, ClassSerializer
from .models import User, Test, Chat, App, Class

# Create your views here.
class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

class TestView(viewsets.ModelViewSet):
    serializer_class = TestSerializer
    queryset = Test.objects.all()

class ChatView(viewsets.ModelViewSet):
    parser_classes = [MultiPartParser]
    serializer_class = ChatSerializer
    queryset = Chat.objects.all()

class ClassView(viewsets.ModelViewSet):
    serializer_class = ClassSerializer
    queryset = Class.objects.all()

class LessonView(viewsets.ReadOnlyModelViewSet):
    serializer_class = ClassSerializer
    queryset = Class.objects.all()
    lookup_field = "createdby"

class ClassLessonView(viewsets.ReadOnlyModelViewSet):
    serializer_class = ClassSerializer
    queryset = Class.objects.all()
    lookup_field = "classid"

class AppView(viewsets.ModelViewSet):
    serializer_class = AppSerializer
    queryset = App.objects.all()

class UserList(APIView):
    permission_classes = (permissions.AllowAny,)
    def post (self, request):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)