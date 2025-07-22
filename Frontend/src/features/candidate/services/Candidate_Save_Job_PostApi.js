import axios from "../../../services/axios.customize";

// API để lưu bài đăng công việc
const saveJobPostApi = (data) => {
  const URL_API = "/api/candidate-save-job-post/save";
  return axios.post(URL_API, data);
};

// API để hủy lưu bài đăng công việc
const unSaveJobPostApi = (data) => {
  const URL_API = "/api/candidate-save-job-post/unsave";
  return axios.delete(URL_API, { data });
};

// API để lấy thông tin bài đăng công việc đã lưu theo ID
const getCandidateSaveJobPostApi = (id) => {
  const URL_API = `/api/candidate-save-job-post/${id}`;
  return axios.get(URL_API);
};

// API để lấy danh sách bài đăng công việc đã lưu theo candidate_id
const getJobPostSaveByCandidateApi = (candidate_id) => {
  const URL_API = `/api/candidate-save-job-post/candidate/${candidate_id}`;
  return axios.get(URL_API);
};

export {
  saveJobPostApi,
  unSaveJobPostApi,
  getCandidateSaveJobPostApi,
  getJobPostSaveByCandidateApi,
};
