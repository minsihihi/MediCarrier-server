from django.contrib import admin
<<<<<<< HEAD
from django.urls import path , include
=======
from django.urls import path, include

>>>>>>> f6fc0956b7d273d6e8c73e0ff41513a500046c2d

urlpatterns = [
    path('admin/', admin.site.urls),
    path('medicarrier/', include('medicarrier.urls')),
]
