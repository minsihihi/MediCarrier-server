# signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Trip, MediCard, MediInfo, BasicInfo
import requests

def get_language_from_country(country):
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

def check_and_create_medicard(user, country):
    # 모든 필수 데이터가 존재하는지 확인
    if Trip.objects.filter(user=user, country=country).exists() and \
       MediInfo.objects.filter(medicard__user=user, medicard__country__country=country).exists() and \
       BasicInfo.objects.filter(medicard__user=user, medicard__country__country=country).exists():
        
        language = get_language_from_country(country)
        MediCard.objects.get_or_create(user=user, country=Trip.objects.get(user=user, country=country), defaults={'language': language})

@receiver(post_save, sender=Trip)
def trip_post_save(sender, instance, created, **kwargs):
    if created:
        check_and_create_medicard(instance.user, instance.country)

@receiver(post_save, sender=MediInfo)
def mediinfo_post_save(sender, instance, created, **kwargs):
    if created:
        check_and_create_medicard(instance.medicard.user, instance.medicard.country.country)

@receiver(post_save, sender=BasicInfo)
def basicinfo_post_save(sender, instance, created, **kwargs):
    if created:
        check_and_create_medicard(instance.medicard.user, instance.medicard.country.country)
