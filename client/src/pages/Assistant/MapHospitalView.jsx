import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ProgressIndicator from "../../components/ProgressIndicator";

const fakeData = [
  {
    id: 1,
    name: "오가조에 이비인후과 클리닉",
    distance: "100m",
    rating: "4.5 (65)",
    phone: "+81 3-3573-5487",
  },
  {
    id: 2,
    name: "니혼조제 츠키지 약국",
    distance: "100m",
    rating: "3.4 (18)",
    phone: "+81 3-6226-4025",
  },
  {
    id: 3,
    name: "니혼조제 츠키지 약국",
    distance: "100m",
    rating: "3.4 (18)",
    phone: "+81 3-6226-4025",
  },
];

function MapHospitalView() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const handleSelect = (hospital) => {
    setSelected(hospital);
  };

  const handleNext = () => {
    if (selected) {
      // 변수 정의
      const selected_hospital = fakeData.find(
        (hospital) => hospital.id === selected
      );

      navigate("/symptom-form", { state: { selected_hospital } });
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
        <NearbyButton>내 주변</NearbyButton>
        <ListContainer>
          {fakeData.map((hospital) => (
            <ListItem
              key={hospital.id}
              selected={selected === hospital.id}
              onClick={() => handleSelect(hospital.id)}
            >
              <InfoContainer>
                <ImagePlaceholder />
                <InfoText>
                  <DetailText>{hospital.distance}</DetailText>
                  <HospitalName>{hospital.name}</HospitalName>
                  <DetailText>{hospital.phone}</DetailText>
                  <DetailText>⭐ {hospital.rating}</DetailText>
                </InfoText>
                <MoreButton href="#">더보기</MoreButton>
              </InfoContainer>
            </ListItem>
          ))}
        </ListContainer>
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
}

export default MapHospitalView;

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #fafafa;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 393px;
  height: 792px;
  margin: 0;
  background: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding-bottom: 95px;
  position: relative;
`;

const Title = styled.h1`
  font-family: "Pretendard";
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
`;

const ListItem = styled.div`
  width: 353px;
  height: 190px;
  display: flex;
  align-items: center;
  padding: 15px;
  margin: 10px 20px;
  background: ${(props) =>
    props.selected ? "rgba(255, 249, 119, 0.40)" : "#F8F8F8"};
  border-radius: 15px;
  cursor: pointer;
  transition: background-color 0.3s;
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
  position: absolute;
  bottom: 20px;
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

const MapContainer = styled.div`
  width: 353px;
  height: 190px;
  flex: 1;
  background-color: #e0e0e0;
`;
