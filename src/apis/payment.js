import axiosClients from "../axiosClients";

const ApiPayment = {
  createBill: (data) => {
    const url = "/api/v1/admin/bill/create";
    return axiosClients.post(url,{...data});  
  },
};

export default ApiPayment;