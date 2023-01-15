__all__ = ["Todo"]


from django.db import models
from users.models import CustomUser
from todo_work.models import Project


class Todo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.TextField()
    created = models.DateTimeField(auto_now_add=True, editable=False)
    updated = models.DateTimeField(auto_now=True, editable=False)
    user = models.ForeignKey(CustomUser, models.PROTECT)
    is_active = models.BooleanField(default=True)