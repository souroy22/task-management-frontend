import AXIOS from "../configs/axiosConfig";

type SUGNUP_DATA_TYPE = {
  name: string;
  email: string;
  password: string;
};

type SUGNIN_DATA_TYPE = {
  email: string;
  password: string;
};

export const signup = async (data: SUGNUP_DATA_TYPE) => {
  const res: any = await AXIOS.post("/auth/signup", { ...data });
  if (res.data.error) {
    return Promise.reject(res.data.error);
  }
  return res.data;
};

export const signin = async (data: SUGNIN_DATA_TYPE) => {
  const res: any = await AXIOS.post("/auth/signin", { ...data });
  if (res.data.error) {
    return Promise.reject(res.data.error);
  }
  return res.data;
};

export const signout = async () => {
  const res: any = await AXIOS.get("/auth/signout");
  if (res.data.error) {
    return Promise.reject(res.data.error);
  }
  return res.data;
};
