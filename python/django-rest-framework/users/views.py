from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    if request.method == 'GET':     
        return HttpResponse("User paginate.")
    elif request.method == 'POST':
        return HttpResponse("User create.")

def update(request, user_id):
    return HttpResponse("User update.")

def delete(user_id):
    return HttpResponse("User delete.")