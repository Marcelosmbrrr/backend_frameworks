from django.contrib import admin
from django.urls import include, path

# The idea behind include() is to make it easy to plug-and-play URLs from different modules
# The URLconf doesn’t look at the request method. In other words, all request methods – POST, GET, HEAD, etc. – will be routed to the same function for the same URL.

urlpatterns = [
    path("users/", include("users.urls")), 
    path("roles/", include("roles.urls")), 
    path("admin/", admin.site.urls),
]
