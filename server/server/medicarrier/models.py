from django.db import models

# Create your models here.


class Trip(models.Model):
    country = models.CharField(max_length=20)
    start_date = models.DateTimeField
    end_date = models.DateTimeField

    def __str__(self):
        return self.country


class Assist(models.Model):
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
    hospital_name = models.CharField(max_length=20)
    hospital_category = models.CharField(max_length=20)
    hospital_tel = models.IntegerField()
    hospital_ratings = models.CharField(max_length=20)
    hospital_open = models.BooleanField()

    def __str__(self):
        return self.hospital_name
