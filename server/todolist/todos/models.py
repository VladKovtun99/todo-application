from django.db import models
from users.models import User

class Todo(models.Model):
    title = models.CharField()
    status = models.CharField()
    description = models.TextField()
    deadline = models.DateTimeField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
