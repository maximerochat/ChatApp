import datetime

from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.utils import timezone


class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Users must have an email address")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)

        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Users must have an email address")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields, is_superuser=True, is_staff=True)

        user.set_password(password)
        user.save()

        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', "last_name"]

    def get_full_name(self):
        return self.first_name

    def get_short_name(self):
        return self.first_name

    def __str__(self):
        return self.email


class Message(models.Model):
    content = models.TextField()
    author = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(default=timezone.now)

    def get_timestamp(self):
        return (self.timestamp + datetime.timedelta(hours=2)).strftime("%Y-%m-%dT%H:%M:%S")


class Conversation(models.Model):
    participants = models.ManyToManyField(UserAccount)
    messages = models.ManyToManyField(Message)
    created_time = models.DateTimeField(auto_now_add=True)

    def get_latest_ts(self):
        return self.messages.last().get_timestamp() if self.messages.last() is not None else (
                    self.created_time + datetime.timedelta(hours=2)).strftime(
            "%Y-%m-%dT%H:%M:%S")

    def get_last_message_text(self):
        return self.messages.last().content if self.messages.last() is not None else ""
