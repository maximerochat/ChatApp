import json

from asgiref.sync import sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.layers import get_channel_layer
from channels.db import database_sync_to_async
from rest_framework_simplejwt.authentication import JWTAuthentication

from accounts.models import Conversation, Message


class ChatConsumer(AsyncWebsocketConsumer):
    token = ""
    conv_id = ""
    current_user = None
    current_conv = None

    async def connect(self):

        self.room_group_name = 'chat'
        jwt_auth = JWTAuthentication()
        jwt_auth.get_validated_token(self.scope['path'].split("/")[3].split("&")[0])

        self.conv_id = self.scope['path'].split("/")[3].split("&")[1]
        token = self.scope['path'].split("/")[3].split("&")[0]

        try:
            valid_token = jwt_auth.get_validated_token(token)
            self.token = valid_token
        except Exception as e:
            return self.disconnect(-1)
        self.current_user = await self.get_user_from_token(valid_token)

        self.current_conv = await self.get_conv(int(self.conv_id))

        if self.current_user is None or self.current_conv is None:
            return self.disconnect(-1)



        await self.channel_layer.group_add(
            self.conv_id,
            self.channel_name
        )
        await self.accept()

    @database_sync_to_async
    def get_user_from_token(self, token):
        jwt_auth = JWTAuthentication()
        return jwt_auth.get_user(token)

    @database_sync_to_async
    def get_conv(self, conv_id):

        return Conversation.objects.filter(participants=self.current_user, id=conv_id).first()


    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.conv_id,
            self.channel_name
        )

    @database_sync_to_async
    def create_message(self, message):
        message_obj = Message(content=message, author=self.current_user)
        message_obj.save()
        self.current_conv.messages.add(message_obj)
        return message_obj

    async def receive(self, text_data=None):
        data = json.loads(text_data)
        message = data['message']


        # Create a new message object and save it to the database
        message_obj = await self.create_message(message)

        # Send the message to the group
        await self.channel_layer.group_send(
            self.conv_id,
            {
                'type': 'chat_message',
                'message': message_obj.content,
                'username': message_obj.author.first_name,
                'timestamp': str(message_obj.timestamp)
            }
        )

    async def chat_message(self, event):
        message = event['message']
        username = event['username']
        timestamp = event['timestamp']

        # Send the message to the websocket
        await self.send(text_data=json.dumps({
            'message': message,
            'username': username,
            'timestamp': timestamp
        }))

