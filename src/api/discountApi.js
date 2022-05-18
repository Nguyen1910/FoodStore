import axiosClient from "./ApiConfig";

const discountApi = {
  getAllDiscounts: () => {
    const url = `/PhieuGiamGia`;
    return axiosClient.get(url);
  },
  getDiscounts: (maGiamGia) => {
    const url = `/PhieuGiamGia/find/${maGiamGia}`;
    return axiosClient.get(url);
  },
};

export default discountApi;
