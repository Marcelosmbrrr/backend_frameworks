from django.db import models

class Module(models.Model):
    name = models.CharField(max_length=100)

class Role(models.Model):
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    deleted_at = models.DateTimeField()

    class Meta:
        db_table = "roles"

class ModuleRole(models.Model):
    role_id = models.ForeignKey(Role)
    module_id = models.ForeignKey(Module)
    read = models.BooleanField(default=False)
    write = models.BooleanField(default=False)

    class Meta:
        db_table = "module_role"
