import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type TASK_STATUS = "TODO" | "IN_PROGRESS" | "DONE";

export type TASK_TYPE = {
  name: string;
  description: string;
  startDate: string;
  slug: string;
  status: TASK_STATUS;
  endDate: string;
  createdBy: {
    name: string;
  };
  assignedUser: {
    name: string;
    email: string;
  };
};

export type MODE_TYPE = "CREATE" | "UPDATE" | null;

export type taskInitialState = {
  tasks: TASK_TYPE[];
  editingTask: TASK_TYPE | null;
  totalCount: number;
  page: number;
  mode: MODE_TYPE;
  fetchingTask: boolean;
};

const initialState: taskInitialState = {
  tasks: [],
  editingTask: null,
  totalCount: 0,
  page: 1,
  mode: null,
  fetchingTask: false,
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTasks: (
      state,
      action: PayloadAction<{
        tasks: TASK_TYPE[];
        totalCount: number;
        page: number;
      }>
    ) => {
      return {
        ...state,
        tasks: action.payload.tasks,
        totalCount: action.payload.totalCount,
        page: action.payload.page,
      };
    },
    setMode: (state, action: PayloadAction<MODE_TYPE>) => {
      return { ...state, mode: action.payload };
    },
    setFetchingTask: (state, action: PayloadAction<boolean>) => {
      return { ...state, fetchingTask: action.payload };
    },
    setEditingTask: (state, action: PayloadAction<TASK_TYPE | null>) => {
      return {
        ...state,
        editingTask: action.payload,
        mode: action.payload === null ? null : "UPDATE",
      };
    },
  },
});

export const { setTasks, setMode, setFetchingTask, setEditingTask } =
  taskSlice.actions;
export default taskSlice.reducer;
