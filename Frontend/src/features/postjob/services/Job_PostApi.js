import axios from "../../../services/axios.customize";

// API để tạo job post
const createJobPostApi = (data) => {
  const URL_API = "/api/job-post/create";
  return axios.post(URL_API, data);
};

// API để lấy danh sách job post
const getAllJobPostsApi = () => {
  const URL_API = "/api/job-post";
  return axios.get(URL_API);
};

// API để lấy job post theo ID
const getJobPostByIdApi = (id) => {
  const URL_API = `/api/job-post/${id}`;
  return axios.get(URL_API);
};

// API để lấy job posts theo employer ID
const getJobPostsByEmployerIdApi = (employerId) => {
  const URL_API = `/api/job-post/employer/${employerId}`;
  return axios.get(URL_API);
};

// API để lấy job posts theo job position ID
const getJobPostsByJobPositionIdApi = (jobPositionId) => {
  const URL_API = `/api/job-post/job-position/${jobPositionId}`;
  return axios.get(URL_API);
};

// API để cập nhật job post
const updateJobPostApi = (id, data) => {
  const URL_API = `/api/job-post/${id}`;
  return axios.put(URL_API, data);
};

// API để xóa job post
const deleteJobPostApi = (id) => {
  const URL_API = `/api/job-post/${id}`;
  return axios.delete(URL_API);
};

// API để xóa tất cả job posts
const deleteAllJobPostsApi = () => {
  const URL_API = "/api/job-post";
  return axios.delete(URL_API);
};

export {
  createJobPostApi,
  getAllJobPostsApi,
  getJobPostByIdApi,
  getJobPostsByEmployerIdApi,
  getJobPostsByJobPositionIdApi,
  updateJobPostApi,
  deleteJobPostApi,
  deleteAllJobPostsApi,
};
