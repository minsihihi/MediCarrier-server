import React, { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import BottomSheet from "../../components/BottomSheet";

const GOOGLE_MAPS_LIBRARIES = ["places"];

const MapSearch = () => {
  const location = useLocation();
  const { searchValue } = location.state || { searchValue: "" };
  const [searchInput, setSearchInput] = useState(searchValue);
  const [places, setPlaces] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState({ lat: null, lng: null });
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null); // 선택된 장소

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBiUBN4DAVpfYWsadzciLTbNCYtPA1UIpE",
    libraries: GOOGLE_MAPS_LIBRARIES,
  });

  const mapOptions = {
    mapTypeControl: false, // 지도 유형 컨트롤 숨기기
    zoomControl: false, // 줌 컨트롤 숨기기
    streetViewControl: false, // 스트리트 뷰 컨트롤 숨기기
    fullscreenControl: false, // 전체 화면 컨트롤 숨기기
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
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

  const handleSearchSubmit = () => {
    if (!isLoaded || !userLocation.lat || !userLocation.lng) return;

    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );
    setLoading(true);

    service.textSearch(
      {
        location: userLocation,
        radius: 1000,
        query: searchInput,
      },
      (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setPlaces(results);
          setLoading(false);
          setIsSheetOpen(true);
          setSelectedPlace(null); // 검색 결과 초기화
        } else {
          console.error("Search failed: ", status);
          setLoading(false);
        }
      }
    );
  };

  const handleSearch = () => {
    if (searchInput.trim()) {
      handleSearchSubmit(); // 검색 요청 함수 호출
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch(); // 엔터키 눌렀을 때 검색
    }
  };

  const handleSelect = (placeId) => {
    setSelected(placeId);
  };

  const handleMoreInfo = (placeId) => {
    window.open(
      `https://www.google.com/maps/place/?q=place_id:${placeId}`,
      "_blank"
    );
  };

  const handleMoreInfoS = (placeId, event) => {
    event.stopPropagation(); // 클릭 이벤트 전파 방지

    // 장소의 자세한 정보를 가져오기 위해 URL을 생성
    const url = `https://www.google.com/maps/place/?q=place_id:${placeId}`;

    // 새 창 또는 탭에서 구글 맵 웹사이트 열기
    window.open(url, "_blank");
  };

  const handleMarkerClick = (place) => {
    setSelectedPlace(place);
    setIsSheetOpen(true);
  };

  return (
    <>
      <MapSearchBar onSubmit={(e) => e.preventDefault()}>
        <input
          placeholder="의료시설을 검색해보세요!"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyDown} // 엔터키 이벤트 핸들러 추가
        />
        <img
          src="/img/search-normal-gray.svg"
          alt="search"
          onClick={handleSearch} // 이미지 클릭 이벤트 핸들러 추가
        />
      </MapSearchBar>

      {isLoaded && (
        <GoogleMap
          center={userLocation}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "700px" }}
          options={mapOptions}
        >
          {places.map((place) => (
            <Marker
              key={place.place_id}
              position={place.geometry.location}
              onClick={() => handleMarkerClick(place)}
              icon="/img/map_marker.png"
            />
          ))}
        </GoogleMap>
      )}

      <BottomSheet
        isOpen={isSheetOpen}
        onClose={() => {
          setIsSheetOpen(false);
          setSelectedPlace(null); // 시트 닫을 때 선택된 장소 초기화
        }}
        autoExpand={selectedPlace !== null} // 선택된 장소가 있으면 자동으로 확장
      >
        {loading ? (
          <LoadingText>Loading...</LoadingText>
        ) : selectedPlace ? (
          <ListContainer>
            <ListItem key={selectedPlace.place_id}>
              <InfoContainer>
                <ImagePlaceholder>
                  {selectedPlace.photos && selectedPlace.photos.length > 0 ? (
                    <PlaceholderImage
                      src={selectedPlace.photos[0].getUrl()}
                      alt={selectedPlace.name}
                    />
                  ) : (
                    <PlaceholderText>No Image</PlaceholderText>
                  )}
                </ImagePlaceholder>
                <InfoText>
                  <HospitalName>{selectedPlace.name}</HospitalName>
                  <DetailText>{selectedPlace.formatted_address}</DetailText>
                  <DetailText>
                    ⭐ {selectedPlace.rating || "정보 없음"}
                  </DetailText>
                </InfoText>
                <MoreButton
                  onClick={(event) =>
                    handleMoreInfoS(selectedPlace.place_id, event)
                  }
                >
                  더보기
                </MoreButton>
              </InfoContainer>
            </ListItem>
          </ListContainer>
        ) : (
          <ListContainer>
            {places.map((place) => (
              <ListItem
                key={place.place_id}
                selected={selected === place.place_id}
                onClick={() => handleSelect(place.place_id)}
              >
                <InfoContainer>
                  <ImagePlaceholder>
                    {place.photos && place.photos.length > 0 ? (
                      <PlaceholderImage
                        src={place.photos[0].getUrl()}
                        alt={place.name}
                      />
                    ) : (
                      <PlaceholderText>No Image</PlaceholderText>
                    )}
                  </ImagePlaceholder>
                  <InfoText>
                    <HospitalName>{place.name}</HospitalName>
                    <DetailText>{place.formatted_address}</DetailText>
                    <DetailText>⭐ {place.rating || "정보 없음"}</DetailText>
                  </InfoText>
                  <MoreButton onClick={() => handleMoreInfo(place.place_id)}>
                    더보기
                  </MoreButton>
                </InfoContainer>
              </ListItem>
            ))}
          </ListContainer>
        )}
      </BottomSheet>
    </>
  );
};

export default MapSearch;

// Styled Components
const MapSearchBar = styled.form`
  position: fixed;
  display: flex;
  align-items: center;
  margin-top: 19px;
  padding: 0 20px;
  z-index: 10;
  input {
    width: 323px;
    height: 23px;
    padding: 14px 18px;
    border-radius: 12px;
    border: 1px solid #bdbdbd;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(10px);
    color: black;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.64px;
  }
  input::placeholder {
    color: #7e7e7e;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.64px;
  }
  img {
    margin-left: -40px;
    width: 24px;
    height: 24px;
    z-index: 100;
    cursor: pointer;
  }
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
  width: 312px; /* 전체 너비 사용 */
  height: 142px;
  display: flex;
  align-items: center;
  padding: 24px 17px;
  margin: 10px 0; /* 가로 마진 제거 */
  background: #fafafa;
  border-radius: 12px;
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
  font-size: 14px;
  font-weight: 700;
  color: #000;
  margin: 0;
`;

const DetailText = styled.p`
  font-family: "Pretendard";
  font-size: 12px;
  color: #333;
  margin: 2px 0;
`;

const MoreButton = styled.button`
  border: none;
  background: none;
  font-family: "Pretendard";
  font-size: 14px;
  color: black;
  text-decoration: none;
  margin-left: auto;
  margin-top: auto;
  cursor: pointer;
  z-index: 100;
`;

const LoadingText = styled.p`
  font-family: "Pretendard";
  font-size: 14px;
  color: #333;
  text-align: center;
  padding: 20px;
`;
