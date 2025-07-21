import axios from "../../../services/axios.customize";

// API để lấy danh sách employer
const getListEmployerApi = () => {
  const URL_API = "/api/employer";
  return axios.get(URL_API);
};

// API để lấy employer theo ID
const getEmployerByIdApi = (id) => {
  const URL_API = `/api/employer/${id}`;
  return axios.get(URL_API);
};

// API để lấy employer theo user ID
const getEmployerByUserIdApi = (userId) => {
  const URL_API = `/api/employer/user/${userId}`;
  return axios.get(URL_API);
};

// API để lấy employer theo user ID
const getEmployerByCompanyIdApi = (companyId) => {
  const URL_API = `/api/employer/company/${companyId}`;
  return axios.get(URL_API);
};

// API để cập nhật vị trí employer
const updatePositionEmployerApi = (id, data) => {
  const URL_API = `/api/employer/${id}`;
  return axios.put(URL_API, data);
};

// API để xóa employer
const deleteEmployerApi = (id) => {
  const URL_API = `/api/employer/${id}`;
  return axios.delete(URL_API);
};

export {
  getListEmployerApi,
  getEmployerByIdApi,
  getEmployerByUserIdApi,
  getEmployerByCompanyIdApi,
  updatePositionEmployerApi,
  deleteEmployerApi,
};
