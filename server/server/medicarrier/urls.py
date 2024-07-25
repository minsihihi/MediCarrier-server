from django.urls import path
from .views import *

app_name = 'medicarrier'

urlpatterns = [
    path('trip/', TripListCreateAPIView.as_view(), name='trip-list-create'),
    path('assist', AssistView.as_view()),
    path('medicard/', MediCardView.as_view(), name='medicard'),
    path('translate/', TranslateMediInfoView.as_view(), name='translate_mediInfo'),
]
