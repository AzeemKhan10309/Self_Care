import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CollectInfoState {
  age: number | null;
  gender: string;
  weight: number | null;
  height: number | null;
  dob: Date | null; 
}

const initialState: CollectInfoState = {
  age: null,
  gender: "",
  weight: null,
  height: null,
  dob: null,
};

const collectInfoSlice = createSlice({
  name: "collectInfo",
  initialState,
  reducers: {
    setCollectInfo: (state, action: PayloadAction<CollectInfoState>) => {
      return action.payload;
    },
    clearCollectInfo: () => initialState,
  },
});

export const { setCollectInfo, clearCollectInfo } = collectInfoSlice.actions;
export default collectInfoSlice.reducer;
