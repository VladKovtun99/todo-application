from django.contrib.auth.models import User
from django.db import models

class Todo(models.Model):
    title = models.CharField()
    status = models.CharField()
    description = models.TextField()
    deadline = models.DateTimeField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
