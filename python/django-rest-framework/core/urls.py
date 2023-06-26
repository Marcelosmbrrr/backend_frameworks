from django.urls import path, include
from rest_framework import routers
# Serializers
from users.serializers import UserSerializer
from roles.serializers import RoleSerializer

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'users', UserSerializer)
router.register(r'roles', RoleSerializer)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
