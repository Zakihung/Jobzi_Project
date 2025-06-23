const {
  createJobPostWorkAddressService,
  getAllJobPostWorkAddressService,
  getJobPostByWorkAddressIdService,
  getWorkAddressByJobPostIdService,
  deleteJobPostWorkAddressService,
} = require("../services/job_post_work_address.service");

const createJobPostWorkAddress = async (req, res, next) => {
  try {
    const { job_post_id, work_address_id } = req.body;
    const data = await createJobPostWorkAddressService({
      job_post_id,
      work_address_id,
    });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getAllJobPostWorkAddress = async (req, res, next) => {
  try {
    const data = await getAllJobPostWorkAddressService();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getJobPostByWorkAddressId = async (req, res, next) => {
  try {
    const { work_address_id } = req.params;
    const data = await getJobPostByWorkAddressIdService(work_address_id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getWorkAddressByJobPostId = async (req, res, next) => {
  try {
    const { job_post_id } = req.params;
    const data = await getWorkAddressByJobPostIdService(job_post_id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const deleteJobPostWorkAddress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await deleteJobPostWorkAddressService(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createJobPostWorkAddress,
  getAllJobPostWorkAddress,
  getJobPostByWorkAddressId,
  getWorkAddressByJobPostId,
  deleteJobPostWorkAddress,
};
