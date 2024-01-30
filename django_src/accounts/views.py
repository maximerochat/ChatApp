import json

import rest_framework_simplejwt.exceptions
from django.core.exceptions import SuspiciousOperation
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

import accounts.models
from utils.utils import jwt_authentication_required
from .models import UserAccount, Conversation, Message
from django.http import JsonResponse, HttpResponse
from rest_framework_simplejwt.authentication import JWTAuthentication


def user_list_request(request, start_chars):
    users = UserAccount.objects.filter(first_name__startswith=start_chars).exclude(first_name__exact=start_chars)
    return JsonResponse({
        "username_list": [user.get_full_name() for user in users]
    })


@csrf_exempt
def get_conversations(request):
    try:
        response = JWTAuthentication().authenticate(request)
    except rest_framework_simplejwt.exceptions.InvalidToken as e:
        return HttpResponse(status=400)
    if response is not None:
        # unpacking
        current_user, token = response
        conversations = Conversation.objects.filter(participants=current_user)
        return JsonResponse({
            "conversations": [
                {
                    "conv_id": conv.id,
                    "receivers": [user.get_full_name() for user in conv.participants.exclude(id=current_user.id)],
                    "lastMessage": conv.get_last_message_text(),
                    "timestamp": conv.get_latest_ts()
                }
                for conv in conversations
            ]
        })
    return HttpResponse(status=400)


@csrf_exempt
def create_conversation(request):
    if request.method == "GET":
        return HttpResponse(status=400)
    try:
        response = JWTAuthentication().authenticate(request)
    except rest_framework_simplejwt.exceptions.InvalidToken as e:
        return HttpResponse(status=400)
    if response is not None:
        # unpacking
        current_user, token = response
        other_username = json.loads(request.body).get("username")

        conv = Conversation()
        conv.save()
        try:
            conv.participants.add(current_user, UserAccount.objects.get(first_name__exact=other_username))

        except accounts.models.UserAccount.DoesNotExist as e:
            return HttpResponse("Invalid User: referred other user does not exist", status=400)

        return HttpResponse(status=200)

    return HttpResponse(status=400)


@jwt_authentication_required
@csrf_exempt
def remove_conversation(request, current_user, conv_id):
    conversation = Conversation.objects.filter(participants=current_user)

    if conversation.filter(id=conv_id).exists():
        conversation.filter(id=conv_id).first().delete()
        return HttpResponse(status=200)

    return HttpResponse(status=400)
    # response = JWTAuthentication().authenticate(request)
    # if response is not None:
    #     # unpacking
    #     current_user, token = response
    #     print(current_user)
    #
    #     conversation = Conversation.objects.filter(participants=current_user)
    #     print(conversation)
    #     if conversation.filter(id=conv_id).exists():
    #         conversation.filter(id=conv_id).first().delete()
    #         return HttpResponse(status=200)
    #
    # return HttpResponse(status=400)

@jwt_authentication_required
@csrf_exempt
def get_messages(request, current_user, conv_id):
    conv = Conversation.objects.filter(id=conv_id, participants=current_user)
    print(conv.first().messages.all())
    for i in conv.first().messages.all():
        print(i.content)
    if not conv.exists():
        return HttpResponse("Unauthorized request", status=400)
    messages = conv.first().messages.all()
    print(message for message in messages)
    if messages is None:
        return JsonResponse({})

    messages.order_by("-timestamp").all()
    res = {
        "messages": [
            {
                "message": message.content,
                "username": message.author.get_full_name(),
                "timestamp": message.get_timestamp()
            }
            for message in messages
        ]
    }
    print(res)

    return JsonResponse(res)


