from django.urls import path, include, re_path
from django_src import settings
from django.views.generic import TemplateView
from django.conf.urls.static import static
from . import routing

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path("auth/", include("djoser.social.urls")),
    path('api/', include('chat.urls')),
    path('ws/', include(routing.websocket_urlpatterns)),
    path('api/', include("accounts.urls"))
]

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
