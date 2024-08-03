import { create } from "zustand";

const useInsuranceStore = create((set) => ({
  // insuranceType: "",
  // setInsuranceType: (type) => set({ insuranceType: type }), // setInsuranceType 액션 추가
  insuranceName: "DB 손해보험",
  insuranceCall: "080-841-1000",
}));

// const onPost = async () => {
//   // Zustand에서 상태 가져오기
//   const { insuranceType } = useInsuranceStore.getState();

//   // 로컬 스토리지에서 사용자 ID 가져오기
//   const userId = localStorage.getItem("userId");

//   // insuranceData 정의
//   const insuranceData = {
//     insuranceType: insuranceType,
//     user: userId, // 사용자 ID 추가
//   };

//   try {
//     const response = await axios({
//       method: "POST",
//       url: "http://127.0.0.1:8000/medicarrier/register.trip/",
//       data: insuranceData,
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`, // 인증 토큰
//         "Content-Type": "application/json", // 데이터 형식 지정
//       },
//     });

//     console.log("성공:", response.data);
//   } catch (error) {
//     console.error(
//       "오류:",
//       error.response ? error.response.data : error.message
//     );
//   }
// };

// const onGet = async () => {
//   try {
//     // 로컬 스토리지에서 사용자 ID 가져오기
//     const userId = localStorage.getItem("userId");

//     // GET 요청을 보낼 URL
//     const url = `http://127.0.0.1:8000/medicarrier/register.trip?user=${userId}`;

//     const response = await axios({
//       method: "GET",
//       url: url,
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`, // 인증 토큰
//         "Content-Type": "application/json", // 데이터 형식 지정
//       },
//     });

//     return response.data; // 성공 시 데이터 반환
//   } catch (error) {
//     console.error(
//       "오류:",
//       error.response ? error.response.data : error.message
//     );
//     return null; // 오류 발생 시 null 반환
//   }
// };

// export { onPost, onGet };
<<<<<<< HEAD
export default useInsuranceStore;
=======
export default useInsuranceStore;
>>>>>>> 6ad88bf29db11b3feaebe9a469ae621e031c47da
