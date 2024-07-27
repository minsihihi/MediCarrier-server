from django.urls import path
from .views import *

app_name = 'medicarrier'

urlpatterns = [
    path('assist/', AssistView.as_view(), name='assist'),
    path('register/trip/', TripListCreateAPIView.as_view(), name='trip-list-create'),
    path('medicard/', MediCardView.as_view(), name='medicard'),
    path('translate/', TranslateMediInfoView.as_view(), name='translate_mediinfo'),
]
