import axios from "axios";
import axiosClients from "../axiosClients";

const ApiBill = {
  getAll: (params) => {
    const url = "/api/v1/bill2";
    return axiosClients.get(url, { params });
  },
  getAllForUser: () => {
    const url = "/api/v1/bill/current_user";
    return axiosClients.get(url);
  },
  create: (data) => {
    const url = "/api/v1/bill/create";
    return axiosClients.post(url, data);
  },
  update: (data) => {
    const url = "/api/v1/bill/update";
    return axiosClients.put(url, data);
  },
  getUserbyAdmin: async (token) => {
    const url = "http://localhost:8888/api/v1/bill/current_user";
    return axios({
      method: "get",
      url,
      headers: { Authorization: token },
    });
  },
};

export default ApiBill;
