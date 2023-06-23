from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("/update/<int:role_id>", views.index, name="update"),
    path("/delete/<int:role_id>", views.index, name="delete"),
]