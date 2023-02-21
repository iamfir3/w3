import axiosClients from "../axiosClients";


const wishlist = {
  createWishlist: (data) => {
    const url = "/api/v1/wishlist/";
    return axiosClients.post(url, data);
  },
  getAllWish: () => {
    const url ="/api/v1/wishlist/";
    return axiosClients.get(url);
  },
  delete: (data) => {
    const url = "/api/v1/wishlist/";
    return axiosClients.delete(url, {data});
  }
};
export default wishlist;
