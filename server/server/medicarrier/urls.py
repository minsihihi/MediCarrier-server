from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter

app_name = 'medicarrier'

urlpatterns = [
    path('assist', AssistView.as_view()),
    path('register.trip', TripListCreateAPIView.as_view(), name='trip-list-create'),
    path('medicard/', MediCardView.as_view(), name='medicard'),
    path('translate/', TranslateMediInfoView.as_view(), name='translate_mediinfo'),
    path('script/', TranslateScriptView.as_view(), name='save-script'),
    path('hospitals/', get_hospitals, name='get_hospitals'),
    path('pharmacies/', get_pharmacies, name='get_pharmacies'),
]