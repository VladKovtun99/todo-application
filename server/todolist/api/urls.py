from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register),
    path('login/', views.login),
    path('todos/get-all/', views.get_all_todos),
    path('todos/create-todo/', views.create_todo),
    path('todos/change-todo/', views.change_todo_by_id),
    path('todos/delete-todo/', views.delete_todo_by_id),
    path('todos/clear/', views.delete_all_todos)
]