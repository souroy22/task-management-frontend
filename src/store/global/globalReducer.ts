import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type SIDEBAR_OPTIONS =
  | "ALL"
  | "TODO"
  | "IN_PROGRESS"
  | "DONE"
  | "my-tasks";

export type SELECTED_OPTIONS = { label: string; value: SIDEBAR_OPTIONS };

export type GlobalInitialState = {
  selectedOption: SELECTED_OPTIONS;
};

const initialState: GlobalInitialState = {
  selectedOption: { label: "All Task", value: "ALL" },
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    selectOption: (state, action: PayloadAction<SELECTED_OPTIONS>) => {
      return { ...state, selectedOption: action.payload };
    },
  },
});

export const { selectOption } = globalSlice.actions;
export default globalSlice.reducer;
