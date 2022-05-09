import React from "react";
import axiosClient from "./ApiConfig";

const productApi = {
  getAll: () => {
    const url = "/SanPham";
    return axiosClient.get(url);
  },
  getProductsByCategory: (idCategory) => {
    const url = `/SanPham/GetSanPhamByMaDanhMuc/${idCategory}`;
    return axiosClient.get(url);
  },
  getProductsById: (idProduct) => {
    const url = `/SanPham/${idProduct}`;
    return axiosClient.get(url);
  },
};

export default productApi;
