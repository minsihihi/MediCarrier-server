// tripStore.js
import { create } from "zustand";
import axios from "axios";

// 상태를 정의하는 store
const useTripStore = create((set) => ({
  country: "",
  startDate: null,
  endDate: null,
  insuranceType: "",
  setCountry: (country) => set({ country }),
  setStartDate: (startDate) => set({ startDate }),
  setEndDate: (endDate) => set({ endDate }),
  setDates: (startDate, endDate) => set({ startDate, endDate }),
  setInsuranceType: (type) => set({ insuranceType: type }),
}));

const onPost = async () => {
  // Zustand에서 상태 가져오기
  const { country, startDate, endDate, insuranceType } = useTripStore.getState();

  // 로컬 스토리지에서 사용자 ID 가져오기
  const userId = localStorage.getItem("userId");

  // tripData 정의
  const tripData = {
    country: country,
    start_date: startDate,
    end_date: endDate,
    insuranceType: insuranceType, // 보험 정보 추가
    user: userId, // 사용자 ID 추가
  };

  try {
    const response = await axios({
      method: "POST",
      url: "https://minsi.pythonanywhere.com/medicarrier/register.trip/",
      data: tripData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // 인증 토큰
        "Content-Type": "application/json", // 데이터 형식 지정
      },
    });

    console.log("성공:", response.data);
  } catch (error) {
    console.error(
      "오류:",
      error.response ? error.response.data : error.message
    );
  }
};

const onGet = async () => {
  try {
    // 로컬 스토리지에서 사용자 ID 가져오기
    const userId = localStorage.getItem("userId");

    // GET 요청을 보낼 URL
    const url = `https://minsi.pythonanywhere.com/medicarrier/register.trip/`;

    const response = await axios({
      method: "GET",
      url: url,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // 인증 토큰
        "Content-Type": "application/json", // 데이터 형식 지정
      },
    });

    const data = response.data;

    // 상태 업데이트
    if (data && data.length > 0) {
      const tripData = data[0];
      useTripStore.getState().setCountry(tripData.country);
      useTripStore.getState().setStartDate(tripData.start_date);
      useTripStore.getState().setEndDate(tripData.end_date);
      useTripStore.getState().setInsuranceType(tripData.insuranceType); // 보험 정보 업데이트
    }

    return data; // 성공 시 데이터 반환
  } catch (error) {
    console.error(
      "오류:",
      error.response ? error.response.data : error.message
    );
    return null; // 오류 발생 시 null 반환
  }
};

export default useTripStore;
export { onPost, onGet };
