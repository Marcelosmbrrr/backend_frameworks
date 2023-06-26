from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    if request.method == 'GET':     
        return HttpResponse("Role paginate.")
    elif request.method == 'POST':
        return HttpResponse("Role create.")

def create(request):
    return HttpResponse("Role create.")

def update(request, user_id):
    return HttpResponse("Role update.")

def delete(user_id):
    return HttpResponse("Role delete.")

