import axiosClient from "./ApiConfig";

const accountApi = {
  getAll: () => {
    const url = "/TaiKhoan";
    return axiosClient.get(url);
  },
  getAccount: (token) => {
    const url = `/TaiKhoan/${token}`;
    return axiosClient.get(url);
  },
  getLogin: (username, password) => {
    const url = `/TaiKhoan/GetTaiKhoanByLogin/${username}/${password}`;
    return axiosClient.get(url);
  },
};

export default accountApi;
