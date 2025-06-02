const mongoose = require("mongoose");
const AppError = require("../utils/AppError");
const CandidateSaveJobPost = require("../models/cadidate_save_job_post.model");

const candidateSaveJobPostService = async (saveData) => {
  const { candidate_id, job_post_id } = saveData;
  if (!candidate_id || !job_post_id) {
    throw new AppError(
      "Thiếu các trường bắt buộc: candidate_id và job_post_id là bắt buộc",
      400
    );
  }

  const existingSave = await CandidateSaveJobPost.findOne({
    candidate_id,
    job_post_id,
  });
  if (existingSave) {
    throw new AppError("Ứng viên đã lưu bài đăng công việc này", 400);
  }

  let result = await CandidateSaveJobPost.create({
    candidate_id,
    job_post_id,
  });

  return result;
};

const candidateUnSaveJobPostService = async (saveData) => {
  const { candidate_id, job_post_id } = saveData;
  if (!candidate_id || !job_post_id) {
    throw new AppError(
      "Thiếu các trường bắt buộc: candidate_id và job_post_id là bắt buộc",
      400
    );
  }

  let result = await CandidateSaveJobPost.deleteOne({
    candidate_id,
    job_post_id,
  });
  if (result.deletedCount === 0) {
    throw new AppError("Không tìm thấy bài đăng công việc đã lưu", 404);
  }

  return result;
};

const getCandidateSaveJobPostService = async (candidate_save_job_post_id) => {
  let candidateSaveJobPost = await CandidateSaveJobPost.findById(
    candidate_save_job_post_id
  )
    .populate("candidate_id")
    .populate("job_post_id");
  if (!candidateSaveJobPost) {
    throw new AppError("Không tìm thấy bài đăng công việc đã lưu", 404);
  }
  return candidateSaveJobPost;
};

const getJobPostSaveByCandidateService = async (candidate_id) => {
  if (!mongoose.Types.ObjectId.isValid(candidate_id)) {
    throw new AppError("ID ứng viên không hợp lệ", 400);
  }
  let result = await CandidateSaveJobPost.find({ candidate_id })
    .populate("candidate_id")
    .populate("job_post_id");
  return result;
};

module.exports = {
  candidateSaveJobPostService,
  candidateUnSaveJobPostService,
  getCandidateSaveJobPostService,
  getJobPostSaveByCandidateService,
};
