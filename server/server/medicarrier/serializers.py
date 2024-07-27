from rest_framework import serializers
from .models import Trip, Assist, Hospital, Insurance, MediCard, MediInfo, BasicInfo
from api.models import User

class TripSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trip
        fields = '__all__'

class MediCardSerializer(serializers.ModelSerializer):
<<<<<<< HEAD
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    country = serializers.PrimaryKeyRelatedField(queryset=Trip.objects.all())

    class Meta:
        model = MediCard
        fields = ['user', 'country', 'language']  # 'id' 필드 제외
        
=======
    user = serializers.ReadOnlyField(source='user.username')  # 읽기 전용 필드로 설정
    country = serializers.SlugRelatedField(slug_field='country', queryset=Trip.objects.all())

    class Meta:
        model = MediCard
        fields = ['user', 'country', 'language']
>>>>>>> 6ddcfa2b5aee103e14bb6b5ddb6490dd4543737d
        
class MediInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model=MediInfo
        fields = ['medicard', 'condition', 'illness', 'allergy', 'diagnosis', 'surgery']
        
        
class BasicInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = BasicInfo
        fields = ['medicard', 'name', 'sex', 'nationality', 'name_eng', 'birthdate', 'height', 'weight', 'bloodtype', 'pregnant']
        
        
class AssistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assist
        fields = '__all__'

    def create(self, validated_data):
        assist_instance = Assist.objects.create(**validated_data)
        self.update_document(assist_instance)
        return assist_instance

    def update_document(self, assist_instance):
        ins_req1 = assist_instance.ins_req1
        ins_req2 = assist_instance.ins_req2
        hospital_fee = assist_instance.hospital_fee
        disease_detail = assist_instance.disease_detail
        
        documents = [
            '보험금 청구서',
            '개인(신용)정보처리동의서',
            '신분증사본'
        ]

        if ins_req1 == '상해':
            if ins_req2 == '입원':
                documents.extend([
                    '진단서',
                    '진료비 계산서(영수증)',
                    '진료비 세부 내역서'
                ])
            elif ins_req2 == '통원':
                if hospital_fee == '3만원 미만':
                    documents.extend([
                        '진료비 계산서(영수증)',
                        '진료비 세부 내역서'
                    ])
                elif hospital_fee == '3만원 이상 ~ 10만원 미만':
                    documents.extend([
                        '진료비 계산서(영수증)',
                        '진료비 세부 내역서',
                        '처방전'
                    ])
                elif hospital_fee == '10만원 이상':
                    documents.extend([
                        '진료비계산서(영수증)',
                        '진료비세부내역서',
                        '진단명이 포함된 서류'
                    ])
            elif ins_req2 == '후유장해':
                documents.append('후유장해진단서')
            elif ins_req2 == '수술':
                documents.append('진단명/수술명/수술일자가 포함된 서류')

        elif ins_req1 == '질병':
            if ins_req2 == '입원':
                documents.extend([
                    '진단서',
                    '진료비 계산서(영수증)',
                    '진료비 세부 내역서'
                ])
            elif ins_req2 == '통원':
                if hospital_fee == '3만원 미만':
                    documents.extend([
                        '진료비 계산서(영수증)',
                        '진료비 세부 내역서'
                    ])
                elif hospital_fee == '3만원 이상 ~ 10만원 미만':
                    documents.extend([
                        '진료비 계산서(영수증)',
                        '진료비 세부 내역서',
                        '처방전'
                    ])
                elif hospital_fee == '10만원 이상':
                    documents.extend([
                        '진료비계산서(영수증)',
                        '진료비세부내역서',
                        '진단명이 포함된 서류'
                    ])
            elif ins_req2 == '후유장해':
                documents.append('후유장해진단서')
            elif ins_req2 == '수술':
                documents.append('진단명/수술명/수술일자가 포함된 서류')
            elif ins_req2 == '진단':
                if disease_detail == '암':
                    documents.extend(['진단서',
                                      '조직검사결과지'])
                elif disease_detail == '뇌질환':
                    documents.extend(['진단서',
                                      'CT, MRI등 방사선 판독결과지'])
                elif disease_detail == '심질환':
                    documents.extend(['진단서',
                                      '각종 검사결과지'])
                elif disease_detail == '기타':
                    documents.extend(['진단서',
                                      '진단사실 확인서류'])

        assist_instance.document = ', '.join(documents)  # ', '로 각 문서를 구분하여 저장
        assist_instance.save()
    

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
        fields = ['id', 'user', 'insurance_type',
                  'insturance_name', 'insurance_call']



