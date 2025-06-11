const AppError = require("../utils/AppError");
const Candidate = require("../models/candidate.model");

const getListCandidateService = async () => {
  let result = await Candidate.find().populate("user_id");
  return result;
};

const getCandidateByIdService = async (candidate_id) => {
  let candidate = await Candidate.findById(candidate_id).populate("user_id");
  if (!candidate) {
    throw new AppError("Không tìm thấy ứng viên", 404);
  }
  return candidate;
};

const updateStatusService = async (candidate_id, status) => {
  let candidate = await Candidate.findById(candidate_id);
  if (!candidate) {
    throw new AppError("Không tìm thấy ứng viên", 404);
  }

  if (!["ready", "not_available", "available_this_month"].includes(status)) {
    throw new AppError(
      "Trạng thái không hợp lệ: chỉ chấp nhận 'ready', 'not_available', hoặc 'available_this_month'",
      400
    );
  }

  candidate.status = status;
  let result = await candidate.save();
  return result;
};

const deleteCandidateService = async (candidate_id) => {
  let candidate = await Candidate.findById(candidate_id);
  if (!candidate) {
    throw new AppError("Không tìm thấy ứng viên", 404);
  }
  let result = await candidate.delete(); // Xóa mềm sử dụng mongoose-delete
  return result;
};

module.exports = {
  getListCandidateService,
  getCandidateByIdService,
  updateStatusService,
  deleteCandidateService,
};
