from django.db import models
from django.conf import settings

# Create your models here.
class Trip(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    country = models.CharField(max_length=20)
    start_date = models.DateTimeField
    end_date = models.DateTimeField

    def __str__(self):
        return self.country


class Assist(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    facility = models.CharField(max_length=20)
    hospital_type = models.CharField(max_length=20)
    symptom_type = models.CharField(max_length=20)
    symptom_etc = models.CharField(max_length=20)
    illness_etc = models.CharField(max_length=20)
    medicine_etc = models.CharField(max_length=20)
    etc = models.CharField(max_length=20)
    ins_req1 = models.CharField(max_length=20)
    ins_req2 = models.CharField(max_length=20)
    hospital_fee = models.CharField(max_length=20)
    document = models.CharField(max_length=20)

    def __str__(self):
        return self.facility


class Hospital(models.Model):
    assist = models.ForeignKey(Assist, on_delete=models.CASCADE)
    hospital_name = models.CharField(max_length=20)
    hospital_category = models.CharField(max_length=20)
    hospital_tel = models.IntegerField()
    hospital_ratings = models.CharField(max_length=20)
    hospital_open = models.BooleanField()

    def __str__(self):
        return self.hospital_name

class Insurance(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    insurance_type = models.CharField(max_length=20)
    insturance_name = models.CharField(max_length=20)
    insurance_call = models.CharField(max_length=20)

    def __str__(self):
        return self.insturance_name
    
class MediCard(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    country = models.OneToOneField(Trip, on_delete=models.CASCADE)
    language = models.CharField(max_length=20)

    def __str__(self):
        return self.country

class MediInfo(models.Model):
    medicard = models.OneToOneField(MediCard, on_delete=models.CASCADE, primary_key=True)
    condition = models.CharField(max_length=20, default="현재 증상 없음")
    illness = models.CharField(max_length=20, default="없음")
    medicine = models.CharField(max_length=20, default="복용하는 약 없음")
    allergy = models.CharField(max_length=20, default="알레르기 없음")
    diagnosis = models.CharField(max_length=20, default="근 n개월 이내 없음")
    surgery = models.CharField(max_length=20, default="근 n개월 이내 없음")

    def __str__(self):
        return self.medicard
    
class BasicInfo(models.Model):
    medicard = models.OneToOneField(MediCard, on_delete=models.CASCADE, primary_key=True)
    name = models.CharField(max_length=20)
    sex = models.CharField(max_length=20)
    nationality = models.CharField(max_length=20)
    name_eng = models.CharField(max_length=20)
    birthdate = models.CharField(max_length=20)
    height = models.CharField(max_length=20)
    weight = models.CharField(max_length=20)
    bloodtype = models.CharField(max_length=20)
    pregnant = models.CharField(max_length=20)

    def __str__(self):
        return self.medicard

