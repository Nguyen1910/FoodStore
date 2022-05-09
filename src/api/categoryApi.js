import React from "react";
import axiosClient from "./ApiConfig";

const categoryApi = {
  getAll: () => {
    const url = "/DanhMuc";
    return axiosClient.get(url);
  },
};

export default categoryApi;
