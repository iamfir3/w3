import axiosClients from "../axiosClients";

const ApiComment = {
  getComment: (params) => {
    const url = "/api/v1/comment/";
    return axiosClients.get(url, {params});
  },
  createComment: (data) => {
    const url = "/api/v1/comment/";
    return axiosClients.post(url, { ...data });
  },
  editComment: (data) => {
    const url = "/api/v1/comment/";
    return axiosClients.put(url, { ...data });
  },
  deleteComment: (data) => {
    const url = "/api/v1/comment/";
    return axiosClients.delete(url, { ...data });
  },
};

export default ApiComment;
