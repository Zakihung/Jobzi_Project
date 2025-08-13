import axios from "../../../services/axios.customize";

// API để tạo industry group
const createIndustryGroupApi = (data) => {
  const URL_API = "/api/industry-group/create";
  return axios.post(URL_API, data);
};

// API để lấy danh sách industry group
const getListIndustryGroupApi = () => {
  const URL_API = "/api/industry-group";
  return axios.get(URL_API);
};

// API để lấy industry group theo ID
const getIndustryGroupByIdApi = (id) => {
  const URL_API = `/api/industry-group/${id}`;
  return axios.get(URL_API);
};

// API để cập nhật trạng thái industry group
const updateIndustryGroupStatusApi = (id, data) => {
  const URL_API = `/api/industry-group/status/${id}`;
  return axios.put(URL_API, data);
};

// API để xóa industry group
const deleteIndustryGroupApi = (id) => {
  const URL_API = `/api/industry-group/${id}`;
  return axios.delete(URL_API);
};

// API để xóa tất cả industry groups
const deleteAllIndustryGroupsApi = () => {
  const URL_API = "/api/industry-group/all";
  return axios.delete(URL_API);
};

// API để cập nhật industry group (cả name và status)
const updateIndustryGroupApi = (id, data) => {
  const URL_API = `/api/industry-group/${id}`;
  return axios.put(URL_API, data);
};

export {
  createIndustryGroupApi,
  getListIndustryGroupApi,
  getIndustryGroupByIdApi,
  updateIndustryGroupStatusApi,
  deleteIndustryGroupApi,
  updateIndustryGroupApi,
  deleteAllIndustryGroupsApi,
};
