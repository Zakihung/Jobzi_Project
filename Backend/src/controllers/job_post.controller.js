const {
  createJobPostService,
  getAllJobPostsService,
  getJobPostByIdService,
  getFilteredJobPostsService,
  getJobPostsByEmployerIdService,
  getJobPostsByJobPositionIdService,
  updateJobPostService,
  updateStatusJobPostService,
  deleteJobPostService,
  deleteAllJobPostsService,
} = require("../services/job_post.service");

const createJobPost = async (req, res, next) => {
  try {
    const {
      employer_id,
      job_position_id,
      title,
      skills,
      locations,
      ...otherData
    } = req.body;
    const data = await createJobPostService({
      employer_id,
      job_position_id,
      title,
      skills,
      locations,
      ...otherData,
    });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getAllJobPosts = async (req, res, next) => {
  try {
    const data = await getAllJobPostsService();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getFilteredJobPosts = async (req, res, next) => {
  try {
    const data = await getFilteredJobPostsService();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getJobPostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await getJobPostByIdService(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getJobPostsByEmployerId = async (req, res, next) => {
  try {
    const { employerId } = req.params;
    const data = await getJobPostsByEmployerIdService(employerId);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getJobPostsByJobPositionId = async (req, res, next) => {
  try {
    const { jobPositionId } = req.params;
    const data = await getJobPostsByJobPositionIdService(jobPositionId);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const updateJobPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await updateJobPostService(id, req.body);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const updateStatusJobPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const data = await updateStatusJobPostService(id, status);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const deleteJobPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await deleteJobPostService(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const deleteAllJobPosts = async (req, res, next) => {
  try {
    const data = await deleteAllJobPostsService();
    res
      .status(200)
      .json({ message: "Đã xóa toàn bộ bài đăng tuyển dụng", data });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createJobPost,
  getAllJobPosts,
  getJobPostById,
  getFilteredJobPosts,
  getJobPostsByEmployerId,
  getJobPostsByJobPositionId,
  updateJobPost,
  updateStatusJobPost,
  deleteJobPost,
  deleteAllJobPosts,
};
