"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from django.conf.urls.static import static
from django.conf import settings
from rest_framework_jwt.views import obtain_jwt_token
from lifehack import views
from rest_framework_jwt.views import refresh_jwt_token

router = routers.DefaultRouter()
router.register(r'user', views.UserView)
router.register(r'test', views.TestView)
router.register(r'chat', views.ChatView)
router.register(r'app', views.AppView)
router.register(r'class', views.ClassView)
router.register(r'class/fetchlesson', views.LessonView)
router.register(r'class/fetchclass', views.ClassLessonView)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('token-auth/', obtain_jwt_token),
    path('token-auth-refresh/', refresh_jwt_token),
    path('user/', views.UserList.as_view()),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
