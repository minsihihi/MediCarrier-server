from rest_framework import serializers
from .models import *
from api.models import User

class ScriptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Script
        fields = '__all__'
class TripSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trip
        fields = '__all__'



    def create(self, validated_data):
        # Trip 객체를 생성
        trip = super().create(validated_data)
        
        # 여행 등록 후 MediCard 생성 또는 업데이트
        language = self.get_language_from_country(trip.country)
        
        # 이전 여행 국가 언어를 가진 MediCard 찾기
        existing_medi_cards = MediCard.objects.filter(user=trip.user).exclude(language__in=['ko', 'en'])
        
        if existing_medi_cards.exists():
            # 기존의 MediCard 업데이트
            # 기존 MediCard가 존재하면, 해당 MediCard 업데이트
            for medi_card in existing_medi_cards:
                medi_card.country = trip.country
                medi_card.language = language
                medi_card.save()
        else:
            # 새로운 MediCard 생성
            MediCard.objects.create(
                user=trip.user,
                country=trip.country,
                language=language
            )
        
        return trip

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

        return country_language_map.get(country, 'en')  # 기본값 'en'

class MediCardSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')  # 읽기 전용 필드로 설정
    country = serializers.ReadOnlyField(source= 'trip.country')  # PrimaryKeyRelatedField 사용

    class Meta:
        model = MediCard
        fields = ['user', 'country', 'language']
        
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

    def update(self, instance, validated_data):
        instance.facility = validated_data.get('facility', instance.facility)
        instance.hospital_type = validated_data.get('hospital_type', instance.hospital_type)
        instance.symptom_type = validated_data.get('symptom_type', instance.symptom_type)
        instance.symptom_etc = validated_data.get('symptom_etc', instance.symptom_etc)
        instance.symptom_start = validated_data.get('symptom_start', instance.symptom_start)
        instance.symptom_freq = validated_data.get('symptom_freq', instance.symptom_freq)
        instance.illness_etc = validated_data.get('illness_etc', instance.illness_etc)
        instance.medicine_etc = validated_data.get('medicine_etc', instance.medicine_etc)
        instance.etc = validated_data.get('etc', instance.etc)
        instance.ins_req1 = validated_data.get('ins_req1', instance.ins_req1)
        instance.ins_req2 = validated_data.get('ins_req2', instance.ins_req2)
        instance.hospital_fee = validated_data.get('hospital_fee', instance.hospital_fee)
        instance.disease_detail = validated_data.get('disease_detail', instance.disease_detail)
        instance.document = validated_data.get('document', instance.document)
        instance.save()
        self.update_document(instance)
        return instance

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
        fields = '__all__'

class PharmacySerializer(serializers.ModelSerializer):
    class Meta:
        model = Pharmacy
        fields = '__all__'





