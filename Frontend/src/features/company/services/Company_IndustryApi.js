import axios from "../../../services/axios.customize";

// API để tạo company industry
const createCompanyIndustryApi = (data) => {
  const URL_API = "/api/company-industry/create";
  return axios.post(URL_API, data);
};

// API để lấy danh sách company industry
const getListCompanyIndustryApi = () => {
  const URL_API = "/api/company-industry";
  return axios.get(URL_API);
};

// API để lấy company industry theo ID
const getCompanyIndustryByIdApi = (id) => {
  const URL_API = `/api/company-industry/${id}`;
  return axios.get(URL_API);
};

// API để cập nhật company industry
const updateCompanyIndustryApi = (id, data) => {
  const URL_API = `/api/company-industry/${id}`;
  return axios.put(URL_API, data);
};

// API để xóa company industry
const deleteCompanyIndustryApi = (id) => {
  const URL_API = `/api/company-industry/${id}`;
  return axios.delete(URL_API);
};

// API để xóa tất cả company industries
const deleteAllCompanyIndustriesApi = () => {
  const URL_API = "/api/company-industry/all";
  return axios.delete(URL_API);
};

export {
  createCompanyIndustryApi,
  getListCompanyIndustryApi,
  getCompanyIndustryByIdApi,
  updateCompanyIndustryApi,
  deleteCompanyIndustryApi,
  deleteAllCompanyIndustriesApi,
};
