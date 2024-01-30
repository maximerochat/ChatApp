import django
import  os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "django_src.settings")
django.setup()
from django.core.asgi import get_asgi_application

from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from . import routing

django_asgi_app = get_asgi_application()


application = ProtocolTypeRouter({
    "http" : get_asgi_application(),
    "https": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            routing.websocket_urlpatterns
        )
    ),
})
