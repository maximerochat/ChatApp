from django.shortcuts import redirect
from django.contrib import messages
from django.contrib.auth.models import User


def auth_allowed(backend, details, response,request, *args, **kwargs):
    print(details)
    print(response)
    if not backend.auth_allowed(response, details):
        print(details)
        print(response)
