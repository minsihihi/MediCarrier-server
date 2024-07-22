// tripStore.js
import { create } from "zustand";

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

//백 api 연결
// const onPost = () => {
//     axios({
//         method: "POST",
//         url: "",
//         data: {

//         },
//     })
//     .then((response) => {
//         console.log(response);
//     })
//     .catch((error) => {
//         console.log(error);
//         throw new Error(error);
//     });
// };

export default useTripStore;
