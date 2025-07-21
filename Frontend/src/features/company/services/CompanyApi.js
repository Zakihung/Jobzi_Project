import axios from "../../../services/axios.customize";

// API để tạo công ty
const createCompanyApi = (data) => {
  const URL_API = "/api/company/create";
  return axios.post(URL_API, data);
};

// API để lấy danh sách công ty
const getListCompanyApi = () => {
  const URL_API = "/api/company";
  return axios.get(URL_API);
};

// API để lấy công ty theo ID
const getCompanyByIdApi = (id) => {
  const URL_API = `/api/company/${id}`;
  return axios.get(URL_API);
};

// API để lấy công ty theo ngành nghề
const getCompanyByIndustryIdApi = (company_industry_id) => {
  const URL_API = `/api/company/industry/${company_industry_id}`;
  return axios.get(URL_API);
};

// API để lấy công ty theo tỉnh/thành phố
const getCompanyByProvinceIdApi = (province_id) => {
  const URL_API = `/api/company/province/${province_id}`;
  return axios.get(URL_API);
};

// API để cập nhật công ty
const updateCompanyApi = ({ id, data }) => {
  const URL_API = `/api/company/${id}`;
  return axios.put(URL_API, data);
};

// API để xóa công ty
const deleteCompanyApi = (id) => {
  const URL_API = `/api/company/${id}`;
  return axios.delete(URL_API);
};

// API để tải lên logo công ty
const uploadLogoCompanyApi = ({ company_id, logo }) => {
  const URL_API = `/api/company/${company_id}/upload-logo`;
  const formData = new FormData();
  formData.append("logo", logo);
  return axios.post(URL_API, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export {
  createCompanyApi,
  getListCompanyApi,
  getCompanyByIdApi,
  getCompanyByProvinceIdApi,
  getCompanyByIndustryIdApi,
  updateCompanyApi,
  deleteCompanyApi,
  uploadLogoCompanyApi,
};
