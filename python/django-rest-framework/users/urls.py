from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("/update/<int:user_id>", views.index, name="update"),
    path("/delete/<int:user_id>", views.index, name="delete"),
]