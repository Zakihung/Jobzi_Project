import axios from "../../../services/axios.customize";

// API để tạo resume file
const createResumeFileApi = (candidateId, data, file) => {
  const URL_API = `/api/resume-file/${candidateId}/create`;
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("resume", file);
  return axios.post(URL_API, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// API để lấy danh sách resume file
const getAllResumeFilesApi = () => {
  const URL_API = "/api/resume-file";
  return axios.get(URL_API);
};

// API để lấy resume file theo ID
const getResumeFileByIdApi = (id) => {
  const URL_API = `/api/resume-file/${id}`;
  return axios.get(URL_API);
};

// API để lấy resume files theo candidate ID
const getResumeFilesByCandidateIdApi = (candidateId) => {
  const URL_API = `/api/resume-file/candidate/${candidateId}`;
  return axios.get(URL_API);
};

// API để cập nhật resume file
const updateResumeFileApi = (id, data, file) => {
  const URL_API = `/api/resume-file/${id}`;
  const formData = new FormData();
  if (data.name) formData.append("name", data.name);
  if (file) formData.append("resume", file);
  return axios.put(URL_API, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// API để xóa resume file
const deleteResumeFileApi = (id) => {
  const URL_API = `/api/resume-file/${id}`;
  return axios.delete(URL_API);
};

export {
  createResumeFileApi,
  getAllResumeFilesApi,
  getResumeFileByIdApi,
  getResumeFilesByCandidateIdApi,
  updateResumeFileApi,
  deleteResumeFileApi,
};
