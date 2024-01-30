from functools import wraps
from django.http import HttpResponse
from rest_framework_simplejwt.authentication import JWTAuthentication

def jwt_authentication_required(view_func):
    @wraps(view_func)
    def wrapped_view(request, *args, **kwargs):
        jwt_auth = JWTAuthentication()
        response = jwt_auth.authenticate(request)

        if response is None:
            return HttpResponse("Non-valid token", status=400)

        current_user, token = response
        return view_func(request, current_user=current_user, *args, **kwargs)

    return wrapped_view


