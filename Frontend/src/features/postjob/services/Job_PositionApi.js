import axios from "../../../services/axios.customize";

// API để tạo job position
const createJobPositionApi = (data) => {
  const URL_API = "/api/job-position/create";
  return axios.post(URL_API, data);
};

// API để lấy danh sách job position
const getListJobPositionApi = () => {
  const URL_API = "/api/job-position";
  return axios.get(URL_API);
};

// API để cập nhật job position
const updateJobPositionApi = (id, data) => {
  const URL_API = `/api/job-position/${id}`;
  return axios.put(URL_API, data);
};

// API để lấy job position theo ID
const getJobPositionByIdApi = (id) => {
  const URL_API = `/api/job-position/${id}`;
  return axios.get(URL_API);
};

// API để cập nhật trạng thái job position
const updateJobPositionStatusApi = (id, data) => {
  const URL_API = `/api/job-position/status/${id}`;
  return axios.put(URL_API, data);
};

// API để xóa job position
const deleteJobPositionApi = (id) => {
  const URL_API = `/api/job-position/${id}`;
  return axios.delete(URL_API);
};

// API để xóa tất cả job positions
const deleteAllJobPositionsApi = () => {
  const URL_API = "/api/job-position/all";
  return axios.delete(URL_API);
};

export {
  createJobPositionApi,
  getListJobPositionApi,
  getJobPositionByIdApi,
  updateJobPositionStatusApi,
  deleteJobPositionApi,
  deleteAllJobPositionsApi,
  updateJobPositionApi,
};
