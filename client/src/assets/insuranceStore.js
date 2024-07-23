import { create } from "zustand";

const useInsuranceStore = create((set) => ({
  insuranceType: "",
  setInsuranceType: (type) => set({ insuranceType: type }), // setInsuranceType 액션 추가
}));

export default useInsuranceStore;
