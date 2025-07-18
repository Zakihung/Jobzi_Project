import axios from "../../../services/axios.customize";

// API để tạo online resume
const createOnlineResumeApi = (candidate_id, data) => {
  const URL_API = `/api/online-resume/${candidate_id}/create`;
  return axios.post(URL_API, data);
};

// API để lấy online resume của người dùng
const getOnlineResumeApi = (candidate_id) => {
  const URL_API = `/api/online-resume/${candidate_id}`;
  return axios.get(URL_API);
};

// API để lấy danh sách tất cả online resumes
const getListOnlineResumeApi = () => {
  const URL_API = "/api/online-resume/list";
  return axios.get(URL_API);
};

// API để cập nhật online resume
const updateOnlineResumeApi = (candidate_id, data) => {
  const URL_API = `/api/online-resume/${candidate_id}/update`;
  return axios.put(URL_API, data);
};

// API để thêm mục vào mảng (jobExpectations, education, v.v.)
const addItemToArrayApi = (candidate_id, data) => {
  const URL_API = `/api/online-resume/${candidate_id}/add-item`;
  return axios.post(URL_API, data);
};

// API để cập nhật mục trong mảng
const updateItemInArrayApi = (candidate_id, data) => {
  const URL_API = `/api/online-resume/${candidate_id}/update-item`;
  return axios.put(URL_API, data);
};

// API để xóa mục trong mảng
const deleteItemInArrayApi = (candidate_id, data) => {
  const URL_API = `/api/online-resume/${candidate_id}/delete-item`;
  return axios.delete(URL_API, { data });
};

// API để xóa online resume
const deleteOnlineResumeApi = (candidate_id) => {
  const URL_API = `/api/online-resume/${candidate_id}`;
  return axios.delete(URL_API);
};

// API để xóa tất cả online resumes
const deleteAllOnlineResumesApi = () => {
  const URL_API = "/api/online-resume/all";
  return axios.delete(URL_API);
};

export {
  createOnlineResumeApi,
  getOnlineResumeApi,
  getListOnlineResumeApi,
  updateOnlineResumeApi,
  addItemToArrayApi,
  updateItemInArrayApi,
  deleteItemInArrayApi,
  deleteOnlineResumeApi,
  deleteAllOnlineResumesApi,
};
