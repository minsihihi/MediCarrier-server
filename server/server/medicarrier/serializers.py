from rest_framework import serializers
from .models import Trip, Assist, Hospital, Insurance, MediCard, MediInfo, BasicInfo

class TripSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trip
        fields = ['id', 'user', 'country', 'start_date', 'end_date']

class AssistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assist
        fields = [
            'id', 'user', 'facility', 'hospital_type', 'symptom_type',
            'symptom_etc', 'illness_etc', 'medicine_etc', 'etc',
            'ins_req1', 'ins_req2', 'hospital_fee', 'document'
        ]

class HospitalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hospital
        fields = [
            'id', 'assist', 'hospital_name', 'hospital_category',
            'hospital_tel', 'hospital_ratings', 'hospital_open'
        ]

class InsuranceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Insurance
        fields = ['id', 'user', 'insurance_type', 'insturance_name', 'insurance_call']

class MediCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = MediCard
        fields = ['id', 'user', 'country', 'language']

class MediInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MediInfo
        fields = [
            'medicard', 'condition', 'illness', 'medicine',
            'allergy', 'diagnosis', 'surgery'
        ]

class BasicInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = BasicInfo
        fields = [
            'medicard', 'name', 'sex', 'nationality', 'name_eng',
            'birthdate', 'height', 'weight', 'bloodtype', 'pregnant'
        ]

