from django.contrib.auth.models import User
from django.db import models

class Todo(models.Model):
    STATUS_CHOICES = [
        (1, 'Not Started'),
        (2, 'In Progress'),
        (3, 'Done'),
    ]

    title = models.CharField(max_length=255)
    status = models.IntegerField(choices=STATUS_CHOICES, default=1)
    description = models.TextField()
    deadline = models.DateTimeField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
