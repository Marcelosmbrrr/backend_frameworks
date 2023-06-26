from django.db import models

class Role(models.Model):
    id = models.IntegerField()
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(null=True)
    deleted_at = models.DateTimeField(null=True)
    modules = models.ManyToManyField("Module")

    class Meta:
        db_table = "roles"

class Module(models.Model):
    id = models.IntegerField()
    name = models.CharField(max_length=100)
    roles = models.ManyToManyField("Role")

class ModuleRole(models.Model):
    role = models.ForeignKey(Role)
    module = models.ForeignKey(Module)
    read = models.BooleanField(default=False)
    write = models.BooleanField(default=False)

    class Meta:
        db_table = "module_role"
