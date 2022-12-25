from uuid import uuid4

from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.validators import ASCIIUsernameValidator
from django.db import models


class CustomUser(AbstractBaseUser, PermissionsMixin):
    username_validator = ASCIIUsernameValidator()

    id = models.UUIDField(default=uuid4, primary_key=True)
    username = models.CharField(
        max_length=64,
        unique=True,
        help_text=("Required. 64 characters or fewer. Letters, digits and @/./+/-/_ only."),
        validators=[username_validator],
        error_messages={
            "unique": ("A user with that username already exists."),
        },
    )
    first_name = models.CharField(max_length=64, blank=True)
    last_name = models.CharField(max_length=64, blank=True)
    email = models.CharField(
        max_length=128,
        unique=True,
        error_messages={
            "unique": ("A user with that email address already exists."),
        },
    )
