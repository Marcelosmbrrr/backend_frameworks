from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def index(request):
    return Response("User paginate.")

@api_view(['POST'])
def create(request):
    return Response("Create user.")

@api_view(['PATCH'])
def update(request, user_id):
    return Response("User update.")

@api_view(['DELETE'])
def delete(user_id):
    return Response("User delete.")