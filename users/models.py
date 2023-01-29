from uuid import uuid4

from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin, UserManager
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
    firstname = models.CharField(max_length=64, blank=True)
    lastname = models.CharField(max_length=64, blank=True)
    email = models.CharField(
        max_length=128,
        unique=True,
        error_messages={
            "unique": ("A user with that email address already exists."),
        },
    )

    is_staff = models.BooleanField(
        ("staff status"),
        default=False,
        help_text=("Designates whether the user can log into this admin site."),
    )
    is_active = models.BooleanField(
        ("active"),
        default=True,
        help_text=(
            "Designates whether this user should be treated as active. \
            Unselect this instead of deleting accounts."
        ),
    )
    date_joined = models.DateTimeField(("date joined"), auto_now_add=True)

    objects = UserManager()

    EMAIL_FIELD = "email"
    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]

    def __str__(self):
        return self.username

    class Meta:
        verbose_name = ("User")
        verbose_name_plural = ("Users")
