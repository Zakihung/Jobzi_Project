import axios from "../../../services/axios.customize";

// API để tạo resume analysis
const createResumeAnalysisApi = (data) => {
  const URL_API = "/api/resume-analysis/create";
  return axios.post(URL_API, data);
};

// API để xử lý resume analysis từ resume file
const processResumeAnalysisByFileApi = (resume_file_id, data) => {
  const URL_API = `/api/resume-analysis/process/resume-file/${resume_file_id}`;
  return axios.post(URL_API, data);
};

// API để xử lý resume analysis từ online resume
const processResumeAnalysisByOnlineApi = (online_resume_id, data) => {
  const URL_API = `/api/resume-analysis/process/online-resume/${online_resume_id}`;
  return axios.post(URL_API, data);
};

// API để lấy danh sách resume analysis
const getListResumeAnalysisApi = () => {
  const URL_API = "/api/resume-analysis";
  return axios.get(URL_API);
};

// API để lấy resume analysis theo ID
const getResumeAnalysisByIdApi = (id) => {
  const URL_API = `/api/resume-analysis/${id}`;
  return axios.get(URL_API);
};

// API để lấy resume analysis theo online_resume_id
const getResumeAnalysisByOnlineResumeIdApi = (online_resume_id) => {
  const URL_API = `/api/resume-analysis/online-resume/${online_resume_id}`;
  return axios.get(URL_API);
};

// API để lấy resume analysis theo resume_file_id
const getResumeAnalysisByResumeFileIdApi = (resume_file_id) => {
  const URL_API = `/api/resume-analysis/resume-file/${resume_file_id}`;
  return axios.get(URL_API);
};

// API để lấy resume analysis gần nhất theo job_post_id và resume_file_id hoặc online_resume_id
const getLatestResumeAnalysisApi = (
  job_post_id,
  resume_file_id,
  online_resume_id
) => {
  const queryParams = [];
  if (job_post_id) queryParams.push(`job_post_id=${job_post_id}`);
  if (resume_file_id && resume_file_id !== "null")
    queryParams.push(`resume_file_id=${resume_file_id}`);
  if (online_resume_id && online_resume_id !== "null")
    queryParams.push(`online_resume_id=${online_resume_id}`);

  const URL_API = `/api/resume-analysis/latest?${queryParams.join("&")}`;
  return axios.get(URL_API);
};

// API để xóa resume analysis theo ID
const deleteResumeAnalysisApi = (id) => {
  const URL_API = `/api/resume-analysis/${id}`;
  return axios.delete(URL_API);
};

// API để xóa tất cả resume analysis
const deleteAllResumeAnalysisApi = () => {
  const URL_API = "/api/resume-analysis";
  return axios.delete(URL_API);
};

export {
  createResumeAnalysisApi,
  processResumeAnalysisByFileApi,
  processResumeAnalysisByOnlineApi,
  getListResumeAnalysisApi,
  getResumeAnalysisByIdApi,
  getResumeAnalysisByOnlineResumeIdApi,
  getResumeAnalysisByResumeFileIdApi,
  getLatestResumeAnalysisApi,
  deleteResumeAnalysisApi,
  deleteAllResumeAnalysisApi,
};
