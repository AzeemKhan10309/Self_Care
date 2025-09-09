import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CollectInfoState {
  age: number | null;
  gender: string;
  weight: number | null;
  height: number | null;
  dob: Date | null;

  // Doctor-specific fields
  specialization?: string;
  clinicAddress?: string;
  experienceYears?: number;
  qualifications?: string;

  // Trainer-specific fields
  expertise?: string;
  certification?: string;
  gymAddress?: string;
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
      return { ...state, ...action.payload }; // merge new fields with existing state
    },
    clearCollectInfo: () => initialState,
  },
});

export const { setCollectInfo, clearCollectInfo } = collectInfoSlice.actions;
export default collectInfoSlice.reducer;
