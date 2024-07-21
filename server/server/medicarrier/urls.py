from django.urls import path
from .views import *

app_name = 'medicarrier'

urlpatterns = [
    path('assist', AssistView.as_view()),
]