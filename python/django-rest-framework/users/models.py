from django.db import models
from roles.models import Role

class User(models.Model):
    id = models.IntegerField()
    name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=20)
    active = models.BooleanField(default=False)
    role = models.OneToOneField(Role)
    image = models.CharField(max_length=50, default="default.jpeg")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(null=True)
    deleted_at = models.DateTimeField(null=True)

    class Meta:
        db_table = "users"