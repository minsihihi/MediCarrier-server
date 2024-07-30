import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import styled from "styled-components";
import ProgressIndicator from "../../components/ProgressIndicator";

const MapHospitalView = () => {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [hospitals, setHospitals] = useState([]);
  const [selected, setSelected] = useState(null); // 선택된 병원 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const navigate = useNavigate();
  const locationState = useLocation().state || {};
  const { facility, hospital_type } = locationState;
  
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    } else {
      console.error("Geolocation not supported by this browser.");
    }
  }, []);
  
  // 위치 정보와 keyword가 있을 때 병원 검색 API 호출
  useEffect(() => {
    if (location.lat && location.lng && hospital_type) {
      setLoading(true); // 로딩 시작
      axios
        .get(`http://localhost:8000/medicarrier/hospitals/?lat=${location.lat}&lng=${location.lng}&keyword=${hospital_type}`)
        .then((response) => {
          // 병원을 별점순으로 정렬하고 상위 3개의 병원만 설정
          const sortedHospitals = response.data.results.sort((a, b) => b.rating - a.rating).slice(0, 3);
          setHospitals(sortedHospitals);
          setLoading(false); // 로딩 완료
        })
        .catch((error) => {
          console.error("Error fetching hospitals: ", error);
          setLoading(false); // 로딩 완료
        });
    }
  }, [location, hospital_type]);

  const handleSelect = (id) => {
    setSelected(id);
  };

  const handleNext = () => {
    if (selected) {
      // 선택된 병원 ID를 배열로 만듭니다.
      const selectedHospitalIds = [selected]; // 선택된 병원의 ID를 배열로 생성합니다.
      navigate("/symptom-form", { state: { facility, hospital_type, 
        //recommended_hospitals : selectedHospitalIds 
      } });
    }
  };

  const handleMoreInfo = (placeId) => {
    window.open(`https://www.google.com/maps/place/?q=place_id:${placeId}`, '_blank');
  };

  const handleNearbySearch = () => {
    if (location.lat && location.lng) {
      setLoading(true);
      axios
        .get(`http://localhost:8000/medicarrier/hospitals/?lat=${location.lat}&lng=${location.lng}`)
        .then((response) => {
          setHospitals(response.data.results);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching hospitals: ", error);
          setLoading(false);
        });
    }
  };

  return (
    <PageContainer>
      <Container>
        <ProgressIndicator step={1} />
        <Title>
          병원을 추천해드릴게요
          <br />
          이용하실 병원을 선택해 주세요
        </Title>
        <Subtitle>
          추천된 병원은 구글맵 기준 별점, 후기가 좋은 병원들이에요
        </Subtitle>
        <NearbyButton onClick={handleNearbySearch}>내 주변</NearbyButton>
        {loading ? (
          <LoadingText>Loading...</LoadingText>
        ) : (
          <ListContainer>
            {hospitals.map((hospital) => (
              <ListItem
                key={hospital.place_id}
                selected={selected === hospital.place_id}
                onClick={() => handleSelect(hospital.place_id)}
              >
                <InfoContainer>
                  <ImagePlaceholder>
                    {hospital.photo_url ? (
                      <PlaceholderImage src={hospital.photo_url} alt={hospital.name} />
                    ) : (
                      <PlaceholderText>No Image</PlaceholderText>
                    )}
                  </ImagePlaceholder>
                  <InfoText>
                    <DetailText>{hospital.distance.toFixed(0)}m</DetailText>
                    <HospitalName>{hospital.name}</HospitalName>
                    <DetailText>{hospital.address}</DetailText>
                    <DetailText>⭐ {hospital.rating || '정보 없음'}</DetailText>
                  </InfoText>
                  <MoreButton onClick={() => handleMoreInfo(hospital.place_id)}>더보기</MoreButton>
                </InfoContainer>
              </ListItem>
            ))}
          </ListContainer>
        )}
        <ButtonContainer>
          <Button onClick={() => navigate(-1)} primary={false}>
            이전
          </Button>
          <Button onClick={handleNext} primary={true} disabled={!selected}>
            다음
          </Button>
        </ButtonContainer>
      </Container>
    </PageContainer>
  );
};

export default MapHospitalView;

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  background: #fafafa;
  overflow-y: auto;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 393px;
  height: auto;
  margin: 0;
  background: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding-bottom: 95px;
  position: relative;
`;

const Title = styled.h1`
  font-family: Pretendard;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: left;
  line-height: 1.5;
  align-self: flex-start;
  margin-left: 20px;
  margin-top: 51px;
`;

const Subtitle = styled.p`
  color: #000;
  font-family: "Pretendard";
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  letter-spacing: -0.439px;
  margin-bottom: 20px;
  margin-left: 20px;
  align-self: flex-start;
`;

const NearbyButton = styled.button`
  font-family: "Pretendard";
  font-size: 14px;
  color: #4a7dff;
  background: #fff;
  border: 1px solid #4a7dff;
  border-radius: 53px;
  padding: 10px 20px;
  cursor: pointer;
  margin-left: auto;
  margin-right: 20px;
  margin-bottom: 10px;
`;

const ListContainer = styled.div`
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
  width: 100%;
`;

const ListItem = styled.div`
  flex: 0 0 auto; /* 아이템이 고정된 너비를 가지도록 설정 */
  width: 100%; /* 전체 너비 사용 */
  max-width: 353px; /* 최대 너비 설정 */
  height: 190px;
  display: flex;
  align-items: center;
  padding: 15px;
  margin: 10px 0; /* 가로 마진 제거 */
  background:  "#F8F8F8";
  border-radius: 15px;
  cursor: pointer;

`;

const InfoContainer = styled.div`
  display: flex;
  width: 100%;
`;

const ImagePlaceholder = styled.div`
  width: 115px;
  height: 110px;
  background-color: #e0e0e0;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden; /* 이미지가 넘치지 않도록 함 */
`;

const PlaceholderImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* 이미지가 placeholder 안에 맞게 조정되도록 함 */
`;

const PlaceholderText = styled.p`
  font-family: "Pretendard";
  font-size: 14px;
  color: #aaa;
`;

const InfoText = styled.div`
  flex: 1;
  margin-left: 15px;
  display: flex;
  flex-direction: column;
`;

const HospitalName = styled.h2`
  font-family: "Pretendard";
  font-size: 16px;
  font-weight: bold;
  margin: 0;
`;

const DetailText = styled.p`
  font-family: "Pretendard";
  font-size: 14px;
  margin: 0;
`;

const MoreButton = styled.a`
  font-family: "Pretendard";
  font-size: 14px;
  color: #4a7dff;
  text-decoration: none;
  margin-left: auto;
  margin-top: auto;
  &:hover {
    color: #003cff;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 11px;
  width: 100%;
  padding: 0 20px;
  margin-top: 20px;
  margin-bottom: 25px;
`;

const Button = styled.button`
  font-family: "Pretendard";
  width: 171px;
  height: 51px;
  padding: 10px 20px;
  font-size: 16px;
  color: ${(props) => (props.primary ? "#FFFFFF" : "#000000")};
  background-color: ${(props) => (props.primary ? "#4A7DFF" : "#F8F8F8")};
  border: none;
  border-radius: 16px;
  cursor: pointer;
`;

const LoadingText = styled.p`
  font-family: "Pretendard";
  font-size: 16px;
  color: #aaa;
  margin-top: 20px;
`;