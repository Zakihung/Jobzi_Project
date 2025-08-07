const {
  createApplicationService,
  getListApplicationService,
  getApplicationByIdService,
  getApplicationsByJobPostIdService,
  getNumberOfApplicationByJobPostIdService,
  updateApplicationStatusService,
  deleteApplicationService,
  deleteAllApplicationsService,
  getApplicationsByCandidateIdService,
} = require("../services/application.service");

const createApplication = async (req, res, next) => {
  try {
    const { job_post_id, candidate_id, resume_file_id, online_resume_id } =
      req.body;
    const data = await createApplicationService({
      job_post_id,
      candidate_id,
      resume_file_id,
      online_resume_id,
    });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getListApplication = async (req, res, next) => {
  try {
    const data = await getListApplicationService();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getApplicationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await getApplicationByIdService(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getNumberOfApplicationByJobPostId = async (req, res, next) => {
  try {
    const { job_post_id } = req.params;
    const data = await getNumberOfApplicationByJobPostIdService(job_post_id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getApplicationsByJobPostId = async (req, res, next) => {
  try {
    const { job_post_id } = req.params;
    const data = await getApplicationsByJobPostIdService(job_post_id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const updateApplicationStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const data = await updateApplicationStatusService(id, status);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const deleteApplication = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await deleteApplicationService(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const deleteAllApplications = async (req, res, next) => {
  try {
    const data = await deleteAllApplicationsService();
    res.status(200).json({ message: "Đã xóa toàn bộ ứng tuyển", data });
  } catch (error) {
    next(error);
  }
};

const getApplicationsByCandidateId = async (req, res, next) => {
  try {
    const { candidate_id } = req.params;
    const data = await getApplicationsByCandidateIdService(candidate_id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createApplication,
  getListApplication,
  getApplicationById,
  getApplicationsByJobPostId,
  getNumberOfApplicationByJobPostId,
  updateApplicationStatus,
  deleteApplication,
  deleteAllApplications,
  getApplicationsByCandidateId,
};
