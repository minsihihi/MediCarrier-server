from django.urls import path
from .views import *

app_name = 'medicarrier'

urlpatterns = [
    path('trip/', TripListCreateAPIView.as_view(), name='trip-list-create'),
]
