from django.contrib import admin

from django.urls import path, include


urlpatterns = [
    path('medicarrier-EwhaLikeLion12-admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('medicarrier/', include('medicarrier.urls')),
]
