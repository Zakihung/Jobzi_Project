import axios from "../../../services/axios.customize";

// API để tạo tỉnh/thành phố
const createProvinceApi = (data) => {
  const URL_API = "/api/province";
  return axios.post(URL_API, data);
};

// API để lấy danh sách tất cả tỉnh/thành phố
const getAllProvinceApi = () => {
  const URL_API = "/api/province";
  return axios.get(URL_API);
};

// API để lấy danh sách tỉnh/thành phố theo thứ tự bảng chữ cái
const getAllProvinceAlphabetApi = () => {
  const URL_API = "/api/province/alphabet";
  return axios.get(URL_API);
};

// API để lấy tỉnh/thành phố theo ID
const getProvinceByIdApi = (id) => {
  const URL_API = `/api/province/${id}`;
  return axios.get(URL_API);
};

// API để cập nhật tỉnh/thành phố
const updateProvinceApi = ({ id, data }) => {
  const URL_API = `/api/province/${id}`;
  return axios.put(URL_API, data);
};

// API để xóa tỉnh/thành phố
const deleteProvinceApi = (id) => {
  const URL_API = `/api/province/${id}`;
  return axios.delete(URL_API);
};

export {
  createProvinceApi,
  getAllProvinceApi,
  getAllProvinceAlphabetApi,
  getProvinceByIdApi,
  updateProvinceApi,
  deleteProvinceApi,
};
