from django.urls import path
from .views import user_list_request, get_conversations, create_conversation, remove_conversation, get_messages

urlpatterns = [
    path('query-users/<str:start_chars>', user_list_request),
    path('query-conv/', get_conversations),
    path('create-conv/', create_conversation),
    path("remove-conv/<int:conv_id>", remove_conversation),
    path("get-messages/<int:conv_id>", get_messages)

]