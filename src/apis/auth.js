import axiosClients from "../axiosClients";

export const apiLogin = {
  post: (data) => {
    const url = "/api/v1/auth/login";
    return axiosClients.post(url, data);
  },
};

export const apiRegister = {
  post: (data) => {
    const url = "/api/v1/auth/register";
    return axiosClients.post(url, data);
  },
};
