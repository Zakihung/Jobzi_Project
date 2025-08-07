import axios from "../../../services/axios.customize";

// API để tạo ứng tuyển
const createApplicationApi = (data) => {
  const URL_API = "/api/application/create";
  return axios.post(URL_API, data);
};

// API để lấy danh sách ứng tuyển
const getListApplicationApi = () => {
  const URL_API = "/api/application";
  return axios.get(URL_API);
};

// API để lấy ứng tuyển theo ID
const getApplicationByIdApi = (id) => {
  const URL_API = `/api/application/${id}`;
  return axios.get(URL_API);
};

// API để cập nhật trạng thái ứng tuyển
const updateApplicationStatusApi = ({ id, status }) => {
  const URL_API = `/api/application/status/${id}`;
  return axios.put(URL_API, { status });
};

// API để xóa ứng tuyển
const deleteApplicationApi = (id) => {
  const URL_API = `/api/application/${id}`;
  return axios.delete(URL_API);
};

// API để xóa toàn bộ ứng tuyển
const deleteAllApplicationsApi = () => {
  const URL_API = `/api/application/all`;
  return axios.delete(URL_API);
};

// API để lấy danh sách ứng tuyển theo candidate_id
const getApplicationsByCandidateIdApi = (candidate_id) => {
  const URL_API = `/api/application/candidate/${candidate_id}`;
  return axios.get(URL_API);
};

// Lấy danh sách ứng tuyển theo job_post_id
const getApplicationsByJobPostIdApi = (job_post_id) => {
  const URL_API = `/api/application/job-post/${job_post_id}`;
  return axios.get(URL_API);
};

// Lấy số lượng ứng tuyển theo job_post_id
const getNumberOfApplicationByJobPostIdApi = (job_post_id) => {
  const URL_API = `/api/application/job-post/${job_post_id}/count`;
  return axios.get(URL_API);
};

export {
  createApplicationApi,
  getListApplicationApi,
  getApplicationByIdApi,
  getApplicationsByJobPostIdApi,
  getNumberOfApplicationByJobPostIdApi,
  updateApplicationStatusApi,
  deleteApplicationApi,
  deleteAllApplicationsApi,
  getApplicationsByCandidateIdApi,
};
