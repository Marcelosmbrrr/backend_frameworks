from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def index(request):
    return Response("Role paginate.")

@api_view(['POST'])
def create(request):
    return Response("Create role.")

@api_view(['PATCH'])
def update(request, user_id):
    return Response("Role update.")

@api_view(['DELETE'])
def delete(user_id):
    return Response("Role delete.")

