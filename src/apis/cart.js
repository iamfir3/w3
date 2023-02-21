import axiosClients from "../axiosClients";

const ApiCart = {
  delete: (params) => {
    const url = "/api/v1/cart";
    return axiosClients.delete(url,  {params });
  },
  get: () => {
    const url = "/api/v1/cart";
    return axiosClients.get(url);
  },
  create: (data) => {
    const url = "/api/v1/cart";
    return axiosClients.post(url, data);
  },
};

export default ApiCart;
