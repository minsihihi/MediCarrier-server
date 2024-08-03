import { create } from "zustand";
import axios from "axios";

const scriptStore = create((set, get) => ({
  scriptDate: null,
  scriptComponents: "",
  transScriptComponents: "",
  documents: [],
  setScriptComponents: ({ scriptComponents, scriptDate }) => {
    set({ scriptComponents, scriptDate });
    onPostScript();
  },
  setTransScriptComponents: (transScript) => {
    set({ transScriptComponents: transScript });
    onPostScript();
  },
  setDocuments: (docs) => set({ documents: docs }),
}));

const onPostScript = async () => {
  const { scriptDate, scriptComponents, transScriptComponents } =
    scriptStore.getState();
  const userId = localStorage.getItem("userId");
  const scriptData = {
    original_script: scriptComponents,
    translated_script: transScriptComponents,
    created_at: scriptDate,
    user: userId,
  };
  try {
    const response = await axios({
      method: "POST",
      url: "https://minsi.pythonanywhere.com/medicarrier/script/",
      data: scriptData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
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

const onGetScript = async () => {
  try {
    const userId = localStorage.getItem("userId");
    const url = `https://minsi.pythonanywhere.com/medicarrier/script?user=${userId}`;

    const response = await axios({
      method: "GET",
      url: url,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });

    const data = response.data;
    if (data.length > 0) {
      const latestScript = data[0];
      scriptStore.setState({
        scriptComponents: latestScript.original_script,
        transScriptComponents: latestScript.translated_script,
        scriptDate: latestScript.created_at,
        documents: latestScript.documents || [],
      });
    }

    return response.data;
  } catch (error) {
    console.error(
      "오류:",
      error.response ? error.response.data : error.message
    );
    return null;
  }
};

export default scriptStore;
export { onPostScript, onGetScript };