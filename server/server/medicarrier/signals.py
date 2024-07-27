# signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Trip, MediCard, MediInfo, BasicInfo
from api.models import User
import requests

def get_language_from_country(country):
    # 언어 감지를 위한 API 요청 로직
    api_url = "https://libretranslate.com/translate"
    payload = {
        'q': 'hello',
        'source': 'en',
        'target': 'auto'
    }
    headers = {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    try:
        response = requests.post(api_url, data=payload, headers=headers)
        response.raise_for_status()
        result = response.json()
        return result.get('target', 'en')
    except requests.RequestException:
        return 'en'

def create_medicard(user, country, language):
    MediCard.objects.get_or_create(user=user, country=country, defaults={'language': language})

@receiver(post_save, sender=User)
def create_default_medicards(sender, instance, created, **kwargs):
    if created:
        # 기본 언어 설정 (한국어와 영어)
        create_medicard(instance, None, 'ko')
        create_medicard(instance, None, 'en')

@receiver(post_save, sender=Trip)
def create_trip_medicard(sender, instance, created, **kwargs):
    if created:
        language = get_language_from_country(instance.country)
        create_medicard(instance.user, instance, language)
