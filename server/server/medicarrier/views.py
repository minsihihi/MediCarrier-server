from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated  #인증된 사용자만 접근 가능
from .models import Trip
from .serializers import TripSerializer

class TripListCreateAPIView(APIView):
    permission_classes = [IsAuthenticated] # 사용자 인증 필요

    def get(self, request):
        trips = Trip.objects.filter(user=request.user) # 로그인된 사용자의 여행만 가져온다
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