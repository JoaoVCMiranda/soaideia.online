from django.shortcuts import render

import json
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie

from django.views.decorators.http import require_POST
# Create your views here.

@require_POST
def login_view(request):
    data = json.loads(request.body)
    username = data.get("username")
    password = data.get("password")

    if username is None or password is None:
        return JsonResponse(
                {"detail": "Só faltou informar o usuário... ou a senha. Um dos dois, ou os dois, você quem sabe"}
                )
    user = authenticate(username=username, password=password)
    
    # Se a autenticação falhar
    if user is None:
        return JsonResponse(
                {"detail": "Errrou"}, 
                status=400
                )
    login(request, user)
    return JsonResponse(
            {"details":"Acertou mizeravi"}
            )

def logout_view(request):
    if request.user.is_authenticated:
        return JsonResponse(
                {"detail": "Mas você nem entrou e já quer sair..."},
                status=400
                )
    logout(request)
    return JsonResponse({"detail":"Já vai tarde"})

@ensure_csrf_cookie 
def session_view(req):
    if req.user.is_authenticated:
        return JsonResponse({"isAuthenticated":True})
    return JsonResponse({"isAuthenticated":False})

def whoami_view(req):
    if req.user.is_authenticated:
        return JsonResponse({"username":req.user.username})
    return JsonResponse({"isAuthenticated":False})

