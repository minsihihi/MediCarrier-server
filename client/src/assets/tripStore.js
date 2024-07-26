// tripStore.js
import { create } from "zustand";
import axios from "axios";

// 상태를 정의하는 store
const useTripStore = create((set) => ({
  country: "",
  startDate: null,
  endDate: null,
  setCountry: (country) => set({ country }),
  setStartDate: (startDate) => set({ startDate }),
  setEndDate: (endDate) => set({ endDate }),
  setDates: (startDate, endDate) => set({ startDate, endDate }),
}));
  //const handleSubmit = async (event) => {
    //event.preventDefault();
    //try {
      //  const response = await axios.post('http://127.0.0.1:8000/api/login', {
        //    username,
          //  password,
        //});
// 백 api 연결
const onPost = async () => {
  // Zustand에서 상태 가져오기
  const { country, startDate, endDate } = useTripStore.getState();

  // 로컬 스토리지에서 사용자 ID 가져오기
  const userId = localStorage.getItem('userId');

  // tripData 정의
  const tripData = {
    country: country,
    start_date: startDate,
    end_date: endDate,
    user: userId, // 사용자 ID 추가
  };

  try {
    const response = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/medicarrier/register.trip',
      data: tripData,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // 인증 토큰
        'Content-Type': 'application/json', // 데이터 형식 지정
      },
    });

    console.log('성공:', response.data);
  } catch (error) {
    console.error('오류:', error.response ? error.response.data : error.message);
  }
};

export default useTripStore;
export { onPost };

