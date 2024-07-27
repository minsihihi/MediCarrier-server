from django.urls import path
from .views import *

app_name = 'medicarrier'

urlpatterns = [
<<<<<<< HEAD
    path('assist', AssistView.as_view()),
    path('register.trip', TripListCreateAPIView.as_view(), name='trip-list-create'),
=======
    path('assist/', AssistView.as_view(), name='assist'),
    path('register/trip/', TripListCreateAPIView.as_view(), name='trip-list-create'),
>>>>>>> 6ddcfa2b5aee103e14bb6b5ddb6490dd4543737d
    path('medicard/', MediCardView.as_view(), name='medicard'),
    path('translate/', TranslateMediInfoView.as_view(), name='translate_mediinfo'),
]
