import axios from "../../../services/axios.customize";

// API để lấy danh sách candidate
const getListCandidateApi = () => {
  const URL_API = "/api/candidate";
  return axios.get(URL_API);
};

// API để lấy candidate theo ID
const getCandidateByIdApi = (id) => {
  const URL_API = `/api/candidate/${id}`;
  return axios.get(URL_API);
};

// API để lấy candidate theo user ID
const getCandidateByUserIdApi = (user_id) => {
  const URL_API = `/api/candidate/user/${user_id}`;
  return axios.get(URL_API);
};

// API để cập nhật trạng thái candidate
const updateCandidateStatusApi = (id, data) => {
  const URL_API = `/api/candidate/${id}/status`;
  return axios.put(URL_API, data);
};

// API để xóa candidate
const deleteCandidateApi = (id) => {
  const URL_API = `/api/candidate/${id}`;
  return axios.delete(URL_API);
};

export {
  getListCandidateApi,
  getCandidateByIdApi,
  getCandidateByUserIdApi,
  updateCandidateStatusApi,
  deleteCandidateApi,
};
