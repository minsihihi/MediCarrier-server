
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
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from googletrans import Translator
from rest_framework import generics
from rest_framework import viewsets
import requests


import math


# 번역기 인스턴스 생성
translator = Translator()

# 검색뷰
def search_hospitals(request):
    keyword = request.GET.get('keyword')
    lat = request.GET.get('lat')
    lng = request.GET.get('lng')
    radius = request.GET.get('radius', 1000)  # 기본 반경 1000미터

    api_key = settings.GOOGLE_MAPS_API_KEY
    url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={lat},{lng}&radius={radius}&type=hospital&keyword={keyword}&key={api_key}"

    response = requests.get(url)
    data = response.json()

    if response.status_code == 200:
        hospitals = []
        for result in data.get('results', []):
            photos = result.get('photos', [])
            photo_url = None
            if photos:
                photo_reference = photos[0].get('photo_reference')
                photo_url = f"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference={photo_reference}&key={api_key}"

            hospitals.append({
                "name": result.get("name"),
                "rating": result.get("rating"),
                "address": result.get("vicinity"),
                "lat": result["geometry"]["location"].get("lat"),
                "lng": result["geometry"]["location"].get("lng"),
                "place_id": result.get("place_id"),
                "photo_url": photo_url,
            })
        return JsonResponse({'results': hospitals})
    else:
        return JsonResponse({'error': data.get('error_message', 'Unknown error')}, status=response.status_code)

def translate_text(text, dest_language):
    try:
        translation = translator.translate(text, dest=dest_language)
        return translation.text
    except Exception as e:
        print(f"Translation error: {e}")
        return text

class TranslateScriptView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        data = request.data
        original_script = data.get('script', '')
        trip = Trip.objects.get(user=user)
        dest_language = self.get_language_from_country(trip.country)
        

        # 기본 스크립트 저장
        user = request.user
        script = Script.objects.create(
            user=user,
            language=dest_language,
            original_script=original_script,
            translated_script=''  # 초기 번역은 비워둡니다
        )

        # 자동 번역
        translated_script = translate_text(original_script, dest_language)
        script.translated_script = translated_script
        script.save()

        serializer = ScriptSerializer(script)
        return Response(serializer.data)
    
    def get_language_from_country(self, country):
        # 나라에 기반한 언어 매핑 로직 (여기서는 간단한 예시)
        country_language_map = {
        '남아프리카 공화국': 'af',
        '알바니아': 'sq',
        '에티오피아': 'am',
        '아랍 국가들': 'ar',
        '아르메니아': 'hy',
        '아제르바이잔': 'az',
        '바스크': 'eu',
        '벨라루스': 'be',
        '방글라데시': 'bn',
        '보스니아': 'bs',
        '불가리아': 'bg',
        '카탈로니아': 'ca',
        '필리핀': 'ceb',
        '말라위': 'ny',
        '중국': 'zh-cn',
        '대만': 'zh-tw',
        '프랑스': 'co',
        '크로아티아': 'hr',
        '체코': 'cs',
        '덴마크': 'da',
        '네덜란드': 'nl',
        '영국': 'en',
        '국제어': 'eo',
        '에스토니아': 'et',
        '필리핀': 'tl',
        '핀란드': 'fi',
        '프랑스': 'fr',
        '네덜란드': 'fy',
        '스페인': 'gl',
        '조지아': 'ka',
        '독일': 'de',
        '그리스': 'el',
        '인도': 'gu',
        '아이티': 'ht',
        '니제르': 'ha',
        '하와이': 'haw',
        '이스라엘': 'iw',
        '이스라엘': 'he',
        '인도': 'hi',
        '중국': 'hmn',
        '헝가리': 'hu',
        '아이슬란드': 'is',
        '나이지리아': 'ig',
        '인도네시아': 'id',
        '아일랜드': 'ga',
        '이탈리아': 'it',
        '일본': 'ja',
        '자바': 'jw',
        '인도': 'kn',
        '카자흐스탄': 'kk',
        '캄보디아': 'km',
        '한국': 'ko',
        '터키': 'ku',
        '키르기스스탄': 'ky',
        '라오스': 'lo',
        '로마': 'la',
        '라트비아': 'lv',
        '리투아니아': 'lt',
        '룩셈부르크': 'lb',
        '북마케도니아': 'mk',
        '마다가스카르': 'mg',
        '말레이시아': 'ms',
        '인도': 'ml',
        '몰타': 'mt',
        '뉴질랜드': 'mi',
        '인도': 'mr',
        '몽골': 'mn',
        '미얀마': 'my',
        '네팔': 'ne',
        '노르웨이': 'no',
        '인도': 'or',
        '파키스탄': 'ps',
        '이란': 'fa',
        '폴란드': 'pl',
        '포르투갈': 'pt',
        '인도': 'pa',
        '루마니아': 'ro',
        '러시아': 'ru',
        '사모아': 'sm',
        '스코틀랜드': 'gd',
        '세르비아': 'sr',
        '남아프리카': 'st',
        '짐바브웨': 'sn',
        '파키스탄': 'sd',
        '스리랑카': 'si',
        '슬로바키아': 'sk',
        '슬로베니아': 'sl',
        '소말리아': 'so',
        '스페인': 'es',
        '인도네시아': 'su',
        '탄자니아': 'sw',
        '스웨덴': 'sv',
        '타지키스탄': 'tg',
        '인도': 'ta',
        '인도': 'te',
        '태국': 'th',
        '터키': 'tr',
        '우크라이나': 'uk',
        '파키스탄': 'ur',
        '위구르': 'ug',
        '우즈베키스탄': 'uz',
        '베트남': 'vi',
        '웨일스': 'cy',
        '남아프리카': 'xh',
        '유대인': 'yi',
        '나이지리아': 'yo',
        '남아프리카': 'zu'
    }

        return country_language_map.get(country, 'en')  # 
    
    def get(self, request, *args, **kwargs):
        user = request.user
        scripts = Script.objects.filter(user=user)
        serializer = ScriptSerializer(scripts, many=True)
        return Response(serializer.data)
 
class TranslateMediInfoView(APIView):
    def get(self, request, *args, **kwargs):
        user = request.user
        
        # 사용자의 MediCard를 필터링하고 country가 '한국'인 것을 찾습니다.
        try:
            medicard = MediCard.objects.get(user=user, country='한국')
        except MediCard.DoesNotExist:
            return Response({"error": "No MediCard found for this user with country '한국'."}, status=status.HTTP_404_NOT_FOUND)
        
        # MediCard를 통해 MediInfo와 BasicInfo를 가져옵니다.
        try:
            medi_info = MediInfo.objects.get(medicard=medicard)
            basic_info = BasicInfo.objects.get(medicard=medicard)
        except MediInfo.DoesNotExist or BasicInfo.DoesNotExist:
            return Response({"error": "User information not found"}, status=status.HTTP_404_NOT_FOUND)
        
        # 번역 함수 정의
        def translate_text(text, lang):
            # 여기에 실제 번역 API 호출을 구현합니다.
            return text  # 예시로 원본 텍스트를 반환합니다.

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

        # 사용자와 관련된 스크립트가 존재하는 경우에만 삭제
        if Script.objects.filter(user=request.user).exists():
            Script.objects.filter(user=request.user).delete()

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
        user = request.user
        assists = Assist.objects.filter(user=user)  # 현재 사용자가 작성한 어시스트만 필터링
        serializer = AssistSerializer(assists, many=True)
        return Response(serializer.data)


def haversine(lat1, lon1, lat2, lon2):
    R = 6371  # Earth radius in kilometers

    lat1, lon1, lat2, lon2 = float(lat1), float(lon1), float(lat2), float(lon2)

    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    
    a = math.sin(dlat / 2) ** 2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon / 2) ** 2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    
    distance_km = R * c
    distance_m = distance_km * 1000  # Convert kilometers to meters
    return distance_m


def get_hospitals(request):
    lat = float(request.GET.get('lat'))
    lng = float(request.GET.get('lng'))
    api_key = settings.GOOGLE_MAPS_API_KEY
    keyword = request.GET.get('keyword', '')  # 기본값은 빈 문자열
    
    # Google Places API 호출
    url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={lat},{lng}&radius=1000&type=hospital&key={api_key}&keyword={keyword}"
    response = requests.get(url)
    data = response.json()
    
    if response.status_code == 200:
        hospitals = []
        for result in data.get('results', []):
            photos = result.get('photos', [])
            photo_url = None
            if photos:
                photo_reference = photos[0].get('photo_reference')
                photo_url = f"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference={photo_reference}&key={api_key}"
            
            # 병원 정보 가공
            hospitals.append({
                "name": result.get("name"),
                "rating": result.get("rating"),
                "address": result.get("vicinity"),
                "lat": result["geometry"]["location"].get("lat"),
                "lng": result["geometry"]["location"].get("lng"),
                "place_id": result.get("place_id"),
                "distance": haversine(lat, lng, result["geometry"]["location"].get("lat"), result["geometry"]["location"].get("lng")),
                'photo_url': photo_url,
            })
    return JsonResponse({'results': hospitals})


def get_pharmacies(request):
    lat = request.GET.get('lat')
    lng = request.GET.get('lng')
    api_key = settings.GOOGLE_MAPS_API_KEY
    url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={lat},{lng}&radius=1000&type=pharmacy&key={api_key}"

    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        pharmacies = []
        for result in data.get('results', []):
            photos = result.get('photos', [])
            photo_url = None
            if photos:
                photo_reference = photos[0].get('photo_reference')
                photo_url = f"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference={photo_reference}&key={api_key}"

            # 약국 정보 가공
            pharmacies.append({
                "name": result.get("name"),
                "rating": result.get("rating"),
                "address": result.get("vicinity"),
                "lat": result["geometry"]["location"].get("lat"),
                "lng": result["geometry"]["location"].get("lng"),
                "place_id": result.get("place_id"),
                "distance": haversine(lat, lng, result["geometry"]["location"].get("lat"), result["geometry"]["location"].get("lng")),
                'photo_url': photo_url,
            })
        return JsonResponse({'results': pharmacies})
    else:
        return JsonResponse(response.json(), status=response.status_code)

class CreateMediInfoView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        # 필터링: country가 "한국"인 MediCard를 찾기
        try:
            medicard = MediCard.objects.get(user=request.user, country='한국')
        except MediCard.DoesNotExist:
            return Response({'error': 'No MediCard with country "한국" found for this user.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # 데이터에 Medicard PK 설정
        request.data['medicard'] = medicard.pk

        serializer = MediInfoSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, *args, **kwargs):
        # 로그인된 사용자의 MediCard를 필터링합니다.
        try:
            medicard = MediCard.objects.get(user=request.user, country='한국')
            medi_info = MediInfo.objects.get(medicard=medicard)
        except MediCard.DoesNotExist:
            return Response({'error': 'No MediCard with country "한국" found for this user.'}, status=status.HTTP_400_BAD_REQUEST)
        except MediInfo.DoesNotExist:
            return Response({'error': 'No MediInfo found for this user.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = MediInfoSerializer(medi_info, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CreateBasicInfoView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        # 필터링: country가 "한국"인 MediCard를 찾기
        try:
            medicard = MediCard.objects.get(user=request.user, country='한국')
        except MediCard.DoesNotExist:
            return Response({'error': 'No MediCard with country "한국" found for this user.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # 데이터에 Medicard PK 설정
        request.data['medicard'] = medicard.pk

        serializer = BasicInfoSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    def put(self, request, *args, **kwargs):
        # 로그인된 사용자의 MediCard를 필터링합니다.
        try:
            medicard = MediCard.objects.get(user=request.user, country='한국')
            basic_info = BasicInfo.objects.get(medicard=medicard)
        except MediCard.DoesNotExist:
            return Response({'error': 'No MediCard with country "한국" found for this user.'}, status=status.HTTP_400_BAD_REQUEST)
        except BasicInfo.DoesNotExist:
            return Response({'error': 'No BasicInfo found for this user.'}, status=status.HTTP_404_NOT_FOUND)

        # 기존 BasicInfo 객체를 업데이트합니다.
        serializer = BasicInfoSerializer(basic_info, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)