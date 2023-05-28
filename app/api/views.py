from django.shortcuts import render
from .serializers import TodoSerializer,UserRegisterSerializer,TodoAllSerializer
from .models import TodoModel
from django.contrib.auth.models import User
from rest_framework.generics import CreateAPIView,ListCreateAPIView , RetrieveUpdateDestroyAPIView,ListAPIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import BasePermission

class OnlyAdmin(BasePermission):
    def has_permission(self,request,view):
        if request.user.is_authenticated and request.user.is_superuser:
            return True
        else:
            return False

class UserRegisterView(CreateAPIView):
    serializer_class = UserRegisterSerializer

class TodoView(ListCreateAPIView):
    serializer_class = TodoSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    def get_queryset(self):
        return TodoModel.objects.filter(user=self.request.user)

class TodoEditView(RetrieveUpdateDestroyAPIView):
    
    serializer_class = TodoSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return TodoModel.objects.filter(user=self.request.user)

class TodoListView(ListAPIView):
    serializer_class = TodoAllSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [OnlyAdmin]
    queryset = TodoModel.objects.all()


