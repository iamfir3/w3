import axiosClients from "../axiosClients";
import axios from "axios";

export const apiGetBills = (params) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosClients({
            method: 'get',
            url: '/api/v1/bill2/',
            params
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const apiGetProductsOfBill2 = (bid) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosClients({
            method: 'get',
            url: '/api/v1/bill2/products',
            params: { bid }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
const ApiCheckout = {
  get: () => {
    const url = "/api/v1/bill2/cached-products";
    try {
      return axiosClients.get(url);
    } catch (error) {
      console.log(error);
    }
  },
  create: (data) => {
    const url = "/api/v1/bill2";
    try {
      return axiosClients.post(url,data);
    } catch (error) {
      console.log(error);
    }
  },
  getService: (data) => {
    try {
      return axios({
        method: "post",
        url: "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services",
        headers: { token: "47678ca2-68a7-11ed-b190-ea4934f9883e" },
        data: { shop_id: 3470323,
                from_district:1484,
                to_district: data}
      });
    } catch (error) {
      console.log(error);
    }
  },
  getFeeShip: async (data) => {
    try {
      const res = await ApiCheckout.getService(data.to_district_id)
      let service = {
        service_id: res.data.data[1]?.service_id,
        service_type_id: res.data.data[1]?.service_type_id
      }
      return axios({
        method: "post",
        url: "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
        headers: { token: "47678ca2-68a7-11ed-b190-ea4934f9883e" },
        data: { from_district_id:1484,
                from_ward_code:"1A0112",
                from_province_id:3450,
                height:5,
                length:30,
                weight:100,
                width:20,
                insurance_value:10000,
                coupon: null,
                ...service,
                ...data
              }
      });
    } catch (error) {
      console.log(error);
    }
  },
};

export default ApiCheckout;

export const apiCreateBill2 = (payload) => {
  const url = "/api/v1/bill2";
  return axiosClients.post(url, payload);
};

export const deleteCache=()=>{
  const url = "/api/v1/bill2/cached-products";
  return axiosClients.delete(url);
}