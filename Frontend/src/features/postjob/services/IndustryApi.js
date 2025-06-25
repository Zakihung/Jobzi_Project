import axios from "../../../services/axios.customize";

// API để tạo industry
const createIndustryApi = (data) => {
  const URL_API = "/api/industry/create";
  return axios.post(URL_API, data);
};

// API để lấy danh sách industry
const getListIndustryApi = () => {
  const URL_API = "/api/industry";
  return axios.get(URL_API);
};

// API để lấy industry theo ID
const getIndustryByIdApi = (id) => {
  const URL_API = `/api/industry/${id}`;
  return axios.get(URL_API);
};

// API để cập nhật trạng thái industry
const updateIndustryStatusApi = (id, data) => {
  const URL_API = `/api/industry/status/${id}`;
  return axios.put(URL_API, data);
};

// API để xóa industry
const deleteIndustryApi = (id) => {
  const URL_API = `/api/industry/${id}`;
  return axios.delete(URL_API);
};

// API để xóa tất cả industries
const deleteAllIndustriesApi = () => {
  const URL_API = "/api/industry/all";
  return axios.delete(URL_API);
};

export {
  createIndustryApi,
  getListIndustryApi,
  getIndustryByIdApi,
  updateIndustryStatusApi,
  deleteIndustryApi,
  deleteAllIndustriesApi,
};
