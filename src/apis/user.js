import axiosClients from "../axiosClients";

const apiUSer = {
  getCurrent: (data) => {
    const url = "/api/v1/user/current";
    return axiosClients.get(url, data);
  },
  getAll: () => {
    const url = "/api/v1/user/";
    return axiosClients.get(url);
  },
  delete: (params) => {
    const url = "/api/v1/user/";
    return axiosClients.delete(url, { params });
  },
  update: (data) => {
    const url = "/api/v1/user/";
    return axiosClients.put(url, data);
  },
};
export default apiUSer;
