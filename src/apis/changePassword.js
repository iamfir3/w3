import axiosClients from "../axiosClients";

const ApiChangePassword = {
  verifyAccount: (data) => {
    const url = "/api/v1/auth/verify-account";
    return axiosClients.post(url,{...data});  
  },
  verifyEmail: (data) => {
    const url ="/api/v1/auth/verify-email";
    return axiosClients.post(url,{...data});
  },
  updatePassword: (data) => {
    const url="/api/v1/user/update-password";
    return axiosClients.put(url,{...data});
  }
};

export default ApiChangePassword;