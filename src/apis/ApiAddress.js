import axios from "axios";
import axiosClients from "../axiosClients"

const ApiAddress = {
  Province: () => {
    return axios({
      method: "get",
      url: "https://online-gateway.ghn.vn/shiip/public-api/master-data/province",
      headers: { token: "47678ca2-68a7-11ed-b190-ea4934f9883e" },
    });
  },
  District: (province) => {
    return axios({
      method: "get",
      url: "https://online-gateway.ghn.vn/shiip/public-api/master-data/district",
      headers: { token: "47678ca2-68a7-11ed-b190-ea4934f9883e" },
      params: { province_id: province.ProvinceID },
    });
  },
  Ward: (district) => {
    return axios({
      method: "get",
      url: "https://online-gateway.ghn.vn/shiip/public-api/master-data/ward",
      headers: { token: "47678ca2-68a7-11ed-b190-ea4934f9883e" },
      params: { district_id: district.DistrictID },
    });
  },
  GetFee: (data) => {
    return axios({
      method: "get",
      url: "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
      headers: { token: "6dca80a5-3584-11ed-ad26-3a4226f77ff0" },
      params: { data },
    });
  },
  Add: (address) => {
    const url = "/api/v1/address/";
    return axiosClients.post(url, address);
  },
  Get: () => {
    const url = "/api/v1/address/";
    return axiosClients.get(url);
  },
  Update:(data)=>{
    const url='/api/v1/address/';
    return axiosClients.put(url,data);
  },
  delete:(params)=>{
    const url='/api/v1/address/';
    return axiosClients.delete(url,{params});
  }
};

export default ApiAddress;