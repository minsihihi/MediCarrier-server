# medicarrier/models.py
from django.db import models
from django.conf import settings


class Trip(models.Model):   # 사용자당 하나만 생성되는 여행 모델
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    country = models.CharField(max_length=20)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()

    def __str__(self):
        return self.country


class MediCard(models.Model):   # 사용자당 하나만 생성 & 여행의 국가를 외래키로 가져오고 언어를 정의하는 모델
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    country = models.CharField(max_length=20)
    language = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.user.username} - {self.country}"



class MediInfo(models.Model):   # 메디카드당 하나만 생성되는 메디인포 모델
    medicard = models.OneToOneField(
        'MediCard', on_delete=models.CASCADE, primary_key=True, db_constraint=False)
    condition = models.CharField(max_length=20, default="현재 증상 없음")
    illness = models.CharField(max_length=20, default="없음")
    medicine = models.CharField(max_length=20, default="복용하는 약 없음")
    allergy = models.CharField(max_length=20, default="알레르기 없음")
    diagnosis = models.CharField(max_length=20, default="근 n개월 이내 없음")
    surgery = models.CharField(max_length=20, default="근 n개월 이내 없음")

    def __str__(self):
        return f"{self.medicard.user.username}의 의료 정보"


class BasicInfo(models.Model):  # 메디카드당 하나만 생성되는 기본인포 모델
    medicard = models.OneToOneField(
        'MediCard', on_delete=models.CASCADE, primary_key=True, db_constraint=False)
    name = models.CharField(max_length=20, default="이름")

    SEX_CHOICES = [
        ('남', '남'),
        ('여', '여')
    ]

    sex = models.CharField(max_length=20, choices=SEX_CHOICES)
    nationality = models.CharField(max_length=20, default="국적")
    name_eng = models.CharField(max_length=20, default="영문 이름")
    birthdate = models.DateField()
    height = models.CharField(max_length=20, default="키")
    weight = models.CharField(max_length=20, default="몸무게")

    BLOODTYPE_CHOICES = [
        ('A', 'A'),
        ('B', 'B'),
        ('O', 'O'),
        ('AB', 'AB')
    ]

    bloodtype = models.CharField(max_length=20, choices=BLOODTYPE_CHOICES)

    PREGNANT_CHOICES = [
        ('임신중', '임신중'),
        ('임신 중 아님', '임신 중 아님'),
        ('가능성 있음', '가능성 있음')
    ]

    pregnant = models.CharField(max_length=20, choices=PREGNANT_CHOICES)

    def __str__(self):
        return f"{self.medicard.user.username}의 기본 정보"


class Assist(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    FACILITY = [
        ('약국', '약국'),
        ('병원', '병원'),
    ]

    facility = models.CharField(
        max_length=20,
        choices=FACILITY,
        default='',
    )

    HOSPITAL_TYPES = [
        ('내과', '내과'),
        ('외과', '외과'),
        ('정형외과', '정형외과'),
        ('이비인후과', '이비인후과'),
        ('응급실', '응급실'),
        ('산부인과', '산부인과'),
        ('피부과', '피부과'),
        ('치과', '치과'),
        ('안과', '안과'),
        ('비뇨기과', '비뇨기과'),
        ('신경외과', '신경외과'),
        ('항문외과', '항문외과'),
        ('성형외과', '성형외과'),
        ('정신건강의학과', '정신건강의학과'),
    ]

    hospital_type = models.CharField(
        max_length=20,
        choices=HOSPITAL_TYPES,
        default='',
    )

    recommended_hospitals = models.ManyToManyField(
        'Hospital', related_name='recommended_by_assists', blank=True)

    SYMPTOM_TYPE = [
        ('콧물이 나요', '콧물이 나요'),
        ('열이 나요', '열이 나요'),
        ('인후통이 있어요', '인후통이 있어요'),
        ('귀가 아파요', '귀가 아파요'),
        ('기침을 해요', '기침을 해요'),
    ]
    symptom_type = models.CharField(
        max_length=20,
        choices=SYMPTOM_TYPE,
        default='')

    symptom_etc = models.CharField(max_length=20, null=True, blank=True)

    SYMPTOM_START = [
        ('오늘', '오늘'),
        ('1일 전', '1일 전'),
        ('2-3일 전', '2-3일 전'),
        ('일주일 전', '일주일 전'),
        ('일주일 이상', '일주일 이상'),
    ]

    symptom_start = models.CharField(
        max_length=20,
        choices=SYMPTOM_START,
        default='',
    )

    SYMPTOM_FREQ = [
        ('지속적', '지속적'),
        ('간헐적', '간헐적'),
        ('특정 시간에만', '특정 시간에만'),
    ]

    symptom_freq = models.CharField(
        max_length=20,
        choices=SYMPTOM_FREQ,
        default='',
    )

    illness_etc = models.CharField(max_length=20, default='없')
    medicine_etc = models.CharField(max_length=20, default='없습')
    etc = models.CharField(max_length=20, null=True, blank=True)

    INS_REQ1 = [
        ('질병', '질병'),
        ('상해', '상해'),
    ]

    ins_req1 = models.CharField(
        max_length=20,
        choices=INS_REQ1,
        default='',
    )

    INS_REQ2 = [
        ('입원', '입원'),
        ('통원', '통원'),
        ('후유장해', '후유장해'),
        ('수술', '수술'),
        ('진단', '진단'),
    ]

    ins_req2 = models.CharField(
        max_length=20,
        choices=INS_REQ2,
        default='',
    )

    HOSPITAL_FEE = [
        ('3만원 미만', '3만원 미만'),
        ('3만원 이상 ~ 10만원 미만', '3만원 이상 ~ 10만원 미만'),
        ('10만원 이상', '10만원 이상'),
    ]

    hospital_fee = models.CharField(
        max_length=20,
        choices=HOSPITAL_FEE,
        default='')

    DISEASE_DETAIL = [
        ('암', '암'),
        ('뇌질환', '뇌질환'),
        ('심질환', '심질환'),
        ('기타', '기타'),
    ]

    disease_detail = models.CharField(
        max_length=20,
        choices=DISEASE_DETAIL,
        default='',
    )

    document = models.TextField(null=True, blank=True)

    def __str__(self):
        # user 모델의 nickname 속성을 포함하여 문자열 반환
        return f"Assist: {self.user.nickname}"


class Hospital(models.Model):
    hospital_distance = models.CharField(max_length=20, default='')
    hospital_name = models.CharField(max_length=20)
    hospital_category = models.CharField(max_length=20)
    hospital_tel = models.CharField(max_length=15)
    hospital_ratings = models.CharField(max_length=20)
    hospital_open = models.BooleanField()

    def __str__(self):
        return self.hospital_name


class Insurance(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    insurance_type = models.CharField(max_length=20)
    insturance_name = models.CharField(max_length=20)
    insurance_call = models.CharField(max_length=20)

    def __str__(self):
        return self.insturance_name


