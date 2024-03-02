import AXIOS from "../configs/axiosConfig";

export const getUserData = async () => {
  const res: any = await AXIOS.get("/user/get-user");
  if (res.data.error) {
    return Promise.reject(res.data.error);
  }
  return res.data;
};

export const getAllUsers = async (searchVal = "") => {
  const params: any = {};
  if (searchVal.trim()) {
    params["searchVal"] = searchVal;
  }
  const res: any = await AXIOS.get("/user/all", { params });
  if (res.data.error) {
    return Promise.reject(res.data.error);
  }
  return res.data;
};
