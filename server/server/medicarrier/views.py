from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated  # 인증된 사용자만 접근 가능
from django.shortcuts import render, get_object_or_404
from rest_framework import views
from rest_framework import status
from rest_framework.response import Response
from django.http import Http404
from .models import *
from .serializers import *

# Create your views here.


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