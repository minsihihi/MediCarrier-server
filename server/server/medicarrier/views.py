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
# libertranslate api를 위해 추가됨
import requests
import time


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




class MediCardView(APIView):    # 로그인된 사용자의 메디카드 정보 생성/반환
    def get(self, request, format=None):
        medicard = get_object_or_404(MediCard, user=request.user)
        serializer = MediCardSerializer(medicard)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = MediCardSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TranslateText:    # 번역 메소드
    def __init__(self):
        self.api_url = "https://libretranslate.com/translate"

    def translate_text(self, text, target_language):
        # 번역할 텍스트와 번역 대상 언어를 요청 데이터에 포함
        payload = {
            'q': text,
            'source': 'auto',  # 자동 언어 감지
            'target': target_language,
            'format': 'text'
        }
        headers = {
            'accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        try:
            response = requests.post(self.api_url, data=payload, headers=headers)
            response.raise_for_status()  # HTTPError 발생 시 예외 처리
            result = response.json()
            return result.get('translatedText', 'Translation error')
        except requests.RequestException as e:
            return f"Error: {e}"
        
    

class TranslateMediInfoView(APIView):
    def get(self, request, format=None):
        try:
            # 로그인된 사용자의 MediCard를 가져옴
            medicard = get_object_or_404(MediCard)

            # MediCard가 연결된 MediInfo 및 BasicInfo를 가져옴
            mediinfo = get_object_or_404(MediInfo)
            basicinfo = get_object_or_404(BasicInfo)

            translator = TranslateText()

            # MediInfo의 각 필드를 영어로 번역
            translated_mediinfo_en = {
                'condition': translator.translate_text(mediinfo.condition, target_language='en'),
                'illness': translator.translate_text(mediinfo.illness, target_language='en'),
                'medicine': translator.translate_text(mediinfo.medicine, target_language='en'),
                'allergy': translator.translate_text(mediinfo.allergy, target_language='en'),
                'diagnosis': translator.translate_text(mediinfo.diagnosis, target_language='en'),
                'surgery': translator.translate_text(mediinfo.surgery, target_language='en'),
            }

            # MediInfo의 각 필드를 여행 국가의 언어로 번역
            target_language = medicard.country.country.lower()[:2]  # 예: "Korea" -> "ko"
            translated_mediinfo_country = {
                'condition': translator.translate_text(mediinfo.condition, target_language=target_language),
                'illness': translator.translate_text(mediinfo.illness, target_language=target_language),
                'medicine': translator.translate_text(mediinfo.medicine, target_language='en'),
                'allergy': translator.translate_text(mediinfo.allergy, target_language=target_language),
                'diagnosis': translator.translate_text(mediinfo.diagnosis, target_language=target_language),
                'surgery': translator.translate_text(mediinfo.surgery, target_language=target_language),
            }

            # BasicInfo의 각 필드를 영어로 번역
            translated_basicinfo_en = {
                'name': translator.translate_text(basicinfo.name, target_language='en'),
                'sex': translator.translate_text(basicinfo.sex, target_language='en'),
                'nationality': translator.translate_text(basicinfo.nationality, target_language='en'),
                'name_eng': translator.translate_text(basicinfo.name_eng, target_language='en'),
                'birthdate': str(basicinfo.birthdate),
                'height': translator.translate_text(basicinfo.height, target_language='en'),
                'weight': translator.translate_text(basicinfo.weight, target_language='en'),
                'bloodtype': translator.translate_text(basicinfo.bloodtype, target_language='en'),
                'pregnant': translator.translate_text(basicinfo.pregnant, target_language='en'),
            }

            # BasicInfo의 각 필드를 여행 국가의 언어로 번역
            translated_basicinfo_country = {
                'name': translator.translate_text(basicinfo.name, target_language=target_language),
                'sex': translator.translate_text(basicinfo.sex, target_language=target_language),
                'nationality': translator.translate_text(basicinfo.nationality, target_language=target_language),
                'name_eng': translator.translate_text(basicinfo.name_eng, target_language=target_language),
                'birthdate': str(basicinfo.birthdate),
                'height': translator.translate_text(basicinfo.height, target_language=target_language),
                'weight': translator.translate_text(basicinfo.weight, target_language=target_language),
                'bloodtype': translator.translate_text(basicinfo.bloodtype, target_language=target_language),
                'pregnant': translator.translate_text(basicinfo.pregnant, target_language=target_language),
            }

            return Response({
                'mediinfo_en': translated_mediinfo_en,
                'mediinfo_country': translated_mediinfo_country,
                'basicinfo_en': translated_basicinfo_en,
                'basicinfo_country': translated_basicinfo_country
            })
        except MediCard.DoesNotExist:
            return Response({'error': 'MediCard가 존재하지 않습니다.'}, status=404)
        except MediInfo.DoesNotExist:
            return Response({'error': 'MediInfo가 존재하지 않습니다.'}, status=404)
        except BasicInfo.DoesNotExist:
            return Response({'error': 'BasicInfo가 존재하지 않습니다.'}, status=404)
        except Exception as e:
            return Response({'error': f'오류 발생: {e}'}, status=500)

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
