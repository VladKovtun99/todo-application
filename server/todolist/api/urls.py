from django.urls import path, include
from rest_framework import routers
from . import views
from .views import TodoViewSet


router = routers.DefaultRouter()
router.register(r'todos', TodoViewSet, basename='todo')

urlpatterns = [
    path('register/', views.register),
    path('login/', views.login),
    path('verify-email/', views.verify_email),
    path('reset-password-request/', views.reset_password_request),
    path('reset-password/', views.reset_password),
    path('', include(router.urls))
]