from rest_framework.authtoken.views import ObtainAuthToken
from .views import UserRegisterView,TodoView,TodoEditView,TodoListView
from django.urls import path

urlpatterns = [
    path('login/',ObtainAuthToken.as_view()),
    path('todo/',TodoView.as_view()),
    path('todo/all/',TodoListView.as_view()),
    path('todo/<int:pk>/',TodoEditView.as_view()),
    path('register/',UserRegisterView.as_view())
]
