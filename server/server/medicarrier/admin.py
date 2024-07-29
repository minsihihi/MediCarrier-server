from django.contrib import admin
from .models import *

# Register your models here.
@admin.register(Trip)
class TripAdmin(admin.ModelAdmin):
    list_display = ('user', 'country', 'start_date', 'end_date')
    search_fields = ('country', 'user__username')
    
admin.site.register(Hospital)
admin.site.register(Pharmacy)
admin.site.register(Script)


@admin.register(MediCard)
class MediCardAdmin(admin.ModelAdmin):
    list_display = ('user', 'country', 'language')  # 표시할 필드 설정
    search_fields = ('user__username', 'country__name')  # 검색 필드 설정


@admin.register(MediInfo)
class MediInfoAdmin(admin.ModelAdmin):
    list_display = ('medicard', 'condition', 'illness', 'medicine', 'allergy', 'diagnosis', 'surgery')
    

@admin.register(BasicInfo)
class BasicInfoAdmin(admin.ModelAdmin):
    list_display = ('medicard', 'name', 'sex', 'nationality', 'name_eng', 'birthdate', 'height', 'weight', 'bloodtype', 'pregnant')
    

class AssistAdmin(admin.ModelAdmin):
    list_display = ('id', 'facility', 'hospital_type', 'symptom_type', 'document')

    def save_model(self, request, obj, form, change):
        # 기본 문서 목록
        documents = [
            '보험금 청구서',
            '개인(신용)정보처리동의서',
            '신분증사본'
        ]

        # 조건에 따라 문서 목록 업데이트
        if obj.ins_req1 == '상해':
            if obj.ins_req2 == '입원':
                documents.extend([
                    '진단서',
                    '진료비 계산서(영수증)',
                    '진료비 세부 내역서'
                ])
            elif obj.ins_req2 == '통원':
                if obj.hospital_fee == '3만원 미만':
                    documents.extend([
                        '진료비 계산서(영수증)',
                        '진료비 세부 내역서'
                    ])
                elif obj.hospital_fee == '3만원 이상 ~ 10만원 미만':
                    documents.extend([
                        '진료비 계산서(영수증)',
                        '진료비 세부 내역서',
                        '처방전'
                    ])
                elif obj.hospital_fee == '10만원 이상':
                    documents.extend([
                        '진료비 계산서(영수증)',
                        '진료비 세부 내역서',
                        '진단명이 포함된 서류'
                    ])
            elif obj.ins_req2 == '후유장해':
                documents.append('후유장해진단서')
            elif obj.ins_req2 == '수술':
                documents.append('진단명/수술명/수술일자가 포함된 서류')

        elif obj.ins_req1 == '질병':
            if obj.ins_req2 == '입원':
                documents.extend([
                    '진단서',
                    '진료비 계산서(영수증)',
                    '진료비 세부 내역서'
                ])
            elif obj.ins_req2 == '통원':
                if obj.hospital_fee == '3만원 미만':
                    documents.extend([
                        '진료비 계산서(영수증)',
                        '진료비 세부 내역서'
                    ])
                elif obj.hospital_fee == '3만원 이상 ~ 10만원 미만':
                    documents.extend([
                        '진료비 계산서(영수증)',
                        '진료비 세부 내역서',
                        '처방전'
                    ])
                elif obj.hospital_fee == '10만원 이상':
                    documents.extend([
                        '진료비 계산서(영수증)',
                        '진료비 세부 내역서',
                        '진단명이 포함된 서류'
                    ])
            elif obj.ins_req2 == '후유장해':
                documents.append('후유장해진단서')
            elif obj.ins_req2 == '수술':
                documents.append('진단명/수술명/수술일자가 포함된 서류')
            elif obj.ins_req2 == '진단':
                if obj.disease_detail == '암':
                    documents.extend([
                        '진단서',
                        '조직검사결과지'
                    ])
                elif obj.disease_detail == '뇌질환':
                    documents.extend([
                        '진단서',
                        'CT, MRI 등 방사선 판독 결과지'
                    ])
                elif obj.disease_detail == '심질환':
                    documents.extend([
                        '진단서',
                        '각종 검사 결과지'
                    ])
                elif obj.disease_detail == '기타':
                    documents.extend([
                        '진단서',
                        '진단 사실 확인 서류'
                    ])

        # 문서 목록을 문자열로 변환하여 필드에 설정
        obj.document = ', '.join(documents)
        
        # 모델 저장
        super().save_model(request, obj, form, change)

admin.site.register(Assist, AssistAdmin)
