import AXIOS from "../configs/axiosConfig";
import { TASK_STATUS } from "../store/task/taskReducer";

type GET_TASKS_Fn_TYPE = (
  status?: TASK_STATUS,
  limit?: number,
  page?: number
) => any;

export const getTasks: GET_TASKS_Fn_TYPE = async (
  status,
  page = 1,
  limit = 10
) => {
  const params: any = { page, limit };
  if (status?.trim()) {
    params["status"] = status;
  }
  const res: any = await AXIOS.get("/task/all", { params });
  if (res.data.error) {
    return Promise.reject(res.data.error);
  }
  return res.data;
};

export const getMyTasks: GET_TASKS_Fn_TYPE = async (
  status,
  page = 1,
  limit = 10
) => {
  const params: any = { page, limit };
  if (status?.trim()) {
    params["status"] = status;
  }
  const res: any = await AXIOS.get("/task/my-tasks", { params });
  if (res.data.error) {
    return Promise.reject(res.data.error);
  }
  return res.data;
};

export const createTask = async (data: any) => {
  const res: any = await AXIOS.post("/task/create", { ...data });
  if (res.data.error) {
    return Promise.reject(res.data.error);
  }
  return res.data;
};

export const updateTask = async (data: any) => {
  const res: any = await AXIOS.patch(`/task/update/${data.slug}`, {
    ...data.data,
  });
  if (res.data.error) {
    return Promise.reject(res.data.error);
  }
  return res.data;
};

export const deleteTask = async (slug: any) => {
  const res: any = await AXIOS.delete(`/task/delete/${slug}`);
  if (res.data.error) {
    return Promise.reject(res.data.error);
  }
  return res.data;
};
