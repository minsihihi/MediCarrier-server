import { create } from "zustand";

const useStore = create((set) => ({
  scriptComponents: "",
  transScriptComponents: "",
  documents: [],
  facility: "", // 시설 상태 추가
  setScriptComponents: (script) => set({ scriptComponents: script }),
  setTransScriptComponents: (transScript) =>
    set({ transScriptComponents: transScript }),
  setDocuments: (docs) => set({ documents: docs }),
  setFacility: (facility) => set({ facility }), // 시설 상태 설정 함수 추가
}));

export default useStore;
