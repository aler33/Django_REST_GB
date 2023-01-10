__all__ = ["Project"]


from django.db import models
from users.models import CustomUser

class Project(models.Model):
    name = models.CharField(max_length=64)
    url = models.URLField(max_length=180)
    users = models.ManyToManyField(CustomUser)