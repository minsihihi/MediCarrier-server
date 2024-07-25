import { create } from "zustand";

const useInsuranceStore = create((set) => ({
  insuranceType: "",
  setInsuranceType: (type) => set({ insuranceType: type }), // setInsuranceType 액션 추가
  insuranceName: "DB 손해보험",
  insuranceCall: "080-841-1000",
}));

export default useInsuranceStore;
