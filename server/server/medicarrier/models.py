from django.db import models

# Create your models here.
class Insurance(models.Model):
    insurance_type = models.CharField(max_length=20)
    insturance_name = models.CharField(max_length=20)
    insurance_call = models.CharField(max_length=20)

    def __str__(self):
        return self.insturance_name
    
class MediCard(models.Model):
    country = models.CharField(max_length=20)
    language = models.CharField(max_length=20)

class MediInfo(models.Model):
    medicard = models.OneToOneField(MediCard, on_delete=models.CASCADE, primary_key=True)
    
class BasicInfo(models.Model):
    medicard = models.OneToOneField(MediCard, on_delete=models.CASCADE, primary_key=True)