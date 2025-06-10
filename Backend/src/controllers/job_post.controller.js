const {
  createJobPostService,
  getListJobPostService,
  getJobPostByIdService,
  getJobPostByEmployerIdService,
  getJobPostByJobPositionIdService,
  getJobPostBySalaryRangeIdService,
  getJobPostByWorkTypeIdService,
  updateJobPostService,
  updateJobPostStatusService,
  deleteJobPostService,
} = require("../services/job_post.service");

const createJobPost = async (req, res, next) => {
  try {
    const {
      employer_id,
      job_position_id,
      salary_range_id,
      work_type_id,
      title,
      description,
      requirement,
      work_address,
      income,
      working_time,
      benefit,
      expire_time,
      status,
    } = req.body;
    const data = await createJobPostService({
      employer_id,
      job_position_id,
      salary_range_id,
      work_type_id,
      title,
      description,
      requirement,
      work_address,
      income,
      working_time,
      benefit,
      expire_time,
      status,
    });
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

const getListJobPost = async (req, res, next) => {
  try {
    const data = await getListJobPostService();
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

const getJobPostByEmployerId = async (req, res, next) => {
  try {
    const { employer_id } = req.params;
    const data = await getJobPostByEmployerIdService(employer_id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getJobPostByJobPositionId = async (req, res, next) => {
  try {
    const { job_position_id } = req.params;
    const data = await getJobPostByJobPositionIdService(job_position_id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getJobPostBySalaryRangeId = async (req, res, next) => {
  try {
    const { salary_range_id } = req.params;
    const data = await getJobPostBySalaryRangeIdService(salary_range_id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getJobPostByWorkTypeId = async (req, res, next) => {
  try {
    const { work_type_id } = req.params;
    const data = await getJobPostByWorkTypeIdService(work_type_id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const updateJobPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      employer_id,
      job_position_id,
      salary_range_id,
      work_type_id,
      title,
      description,
      requirement,
      work_address,
      income,
      working_time,
      benefit,
      expire_time,
      status,
    } = req.body;
    const data = await updateJobPostService(id, {
      employer_id,
      job_position_id,
      salary_range_id,
      work_type_id,
      title,
      description,
      requirement,
      work_address,
      income,
      working_time,
      benefit,
      expire_time,
      status,
    });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const updateJobPostStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const data = await updateJobPostStatusService(id, status);
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

module.exports = {
  createJobPost,
  getListJobPost,
  getJobPostById,
  getJobPostByEmployerId,
  getJobPostByJobPositionId,
  getJobPostBySalaryRangeId,
  getJobPostByWorkTypeId,
  updateJobPost,
  updateJobPostStatus,
  deleteJobPost,
};
