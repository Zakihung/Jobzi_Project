const {
  candidateSaveJobPostService,
  candidateUnSaveJobPostService,
  getCandidateSaveJobPostService,
  getJobPostSaveByCandidateService,
} = require("../services/candidate_save_job_post.service");

const candidateSaveJobPost = async (req, res, next) => {
  try {
    const { candidate_id, job_post_id } = req.body;
    const data = await candidateSaveJobPostService({
      candidate_id,
      job_post_id,
    });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const candidateUnSaveJobPost = async (req, res, next) => {
  try {
    const { candidate_id, job_post_id } = req.body;
    const data = await candidateUnSaveJobPostService({
      candidate_id,
      job_post_id,
    });
    res.status(200).json({ message: "Đã hủy lưu bài đăng công việc", data });
  } catch (error) {
    next(error);
  }
};

const getCandidateSaveJobPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await getCandidateSaveJobPostService(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getJobPostSaveByCandidate = async (req, res, next) => {
  try {
    const { candidate_id } = req.params;
    const data = await getJobPostSaveByCandidateService(candidate_id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  candidateSaveJobPost,
  candidateUnSaveJobPost,
  getCandidateSaveJobPost,
  getJobPostSaveByCandidate,
};
