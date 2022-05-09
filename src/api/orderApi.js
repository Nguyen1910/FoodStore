import axiosClient from "./ApiConfig";

const accountApi = {
  getOrder: (maTK) => {
    const url = `/DonHang/${maTK}`;
    return axiosClient.get(url);
  },
  addOrder: (data) => {
    const url = `/DonHang`;
    return axiosClient.post(url, data);
  },
  deleteOrder: (maTK, maSP) => {
    const url = `/DonHang/${maTK}/${maSP}`;
    return axiosClient.delete(url);
  },
  deleteAllOrder: (maTK) => {
    const url = `/DonHang/${maTK}/${maSP}`;
    return axiosClient.delete(url);
  },
};

export default accountApi;
