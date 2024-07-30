from django.shortcuts import render, get_object_or_404
from rest_framework import views
from rest_framework import status
from rest_framework.response import Response
from django.http import Http404
from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated  # 인증된 사용자만 접근 가능
from requests.exceptions import HTTPError
from googletrans import Translator

# 번역기 인스턴스 생성
translator = Translator()

def translate_text(text, dest_language):
    try:
        translation = translator.translate(text, dest=dest_language)
        return translation.text
    except Exception as e:
        print(f"Translation error: {e}")
        return text
# libertranslate api를 위해 추가됨
import requests
import time
class TranslateMediInfoView(APIView):
    def get(self, request, *args, **kwargs):
        user = request.user
        medicard = MediCard.objects.get(user=user)
        
        # 한국어 데이터를 가져옵니다.
        try:
            medi_info = MediInfo.objects.get(medicard=medicard)
            basic_info = BasicInfo.objects.get(medicard=medicard)
        except MediInfo.DoesNotExist or BasicInfo.DoesNotExist:
            return Response({"error": "User information not found"}, status=404)
        
        # 번역 함수 정의
        def translate_info(info, lang):
            translated_info = {}
            for field, value in info.items():
                translated_info[field] = translate_text(value, lang)
            return translated_info

        # 기본 정보와 의료 정보 번역
        english_lang = 'en'
        travel_lang = medicard.language  # 사용자 여행 국가 언어

        medi_info_data = {
            "condition": medi_info.condition,
            "illness": medi_info.illness,
            "medicine": medi_info.medicine,
            "allergy": medi_info.allergy,
            "diagnosis": medi_info.diagnosis,
            "surgery": medi_info.surgery
        }

        basic_info_data = {
            "name": basic_info.name,
            "sex": basic_info.sex,
            "nationality": basic_info.nationality,
            "name_eng": basic_info.name_eng,
            "birthdate": str(basic_info.birthdate),
            "height": basic_info.height,
            "weight": basic_info.weight,
            "bloodtype": basic_info.bloodtype,
            "pregnant": basic_info.pregnant
        }

        # 영어로 번역
        medi_info_english = translate_info(medi_info_data, english_lang)
        basic_info_english = translate_info(basic_info_data, english_lang)

        # 여행 국가 언어로 번역
        medi_info_travel = translate_info(medi_info_data, travel_lang)
        basic_info_travel = translate_info(basic_info_data, travel_lang)

        # 사용자에게 반환
        return Response({
            "medicard": {
                "한국어": {
                    "medi_info": medi_info_data,
                    "basic_info": basic_info_data
                },
                "영어": {
                    "medi_info": medi_info_english,
                    "basic_info": basic_info_english
                },
                travel_lang: {
                    "medi_info": medi_info_travel,
                    "basic_info": basic_info_travel
                }
            }
        })

class AssistView(views.APIView):
    def post(self, request, format=None):
        serializer = AssistSerializer(data=request.data)
        if serializer.is_valid():
            assist_instance = serializer.save()
            response_serializer = AssistSerializer(assist_instance)
            return Response(response_serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, format=None):
        assist = Assist.objects.all()
        serializer = AssistSerializer(assist, many=True)
        return Response(serializer.data)


class TripListCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]  # 사용자 인증 필요

    def get(self, request):
        trips = Trip.objects.filter(user=request.user)  # 로그인된 사용자의 여행만 가져온다
        serializer = TripSerializer(trips, many=True)
        return Response(serializer.data)

    def post(self, request):
        # 기존 여행 삭제 (하나의 여행만 등록 가능하도록)
        Trip.objects.filter(user=request.user).delete()

        # 새로운 여행 등록
        serializer = TripSerializer(data=request.data)
        if serializer.is_valid():
            # 여행 등록 시 로그인된 사용자를 여행의 사용자로 설정
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class MediCardView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        medicard = get_object_or_404(MediCard, user=request.user)
        serializer = MediCardSerializer(medicard)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = MediCardSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    

class AssistView(APIView):
    def post(self, request, format=None):
        serializer = AssistSerializer(data=request.data)
        if serializer.is_valid():
            assist_instance = serializer.save()

            ins_req1 = request.data.get('ins_req1', None)
            ins_req2 = request.data.get('ins_req2', None)

            # 병원비와 질병->진단->질환 종류 필드 가져오기
            hospital_fee = request.data.get('hospital_fee')
            disease_detail = request.data.get('disease_detail')

            # 초기 documents 리스트 설정
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

            # documents 리스트를 문자열로 변환하여 저장
            assist_instance.document = ', '.join(
                documents)  # ', '로 각 문서를 구분하여 저장
            assist_instance.save()

            # assist_instance를 다시 직렬화하여 반환
            response_serializer = AssistSerializer(assist_instance)
            return Response(response_serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, format=None):
        assist = Assist.objects.all()
        serializer = AssistSerializer(assist, many=True)
        return Response(serializer.data)
