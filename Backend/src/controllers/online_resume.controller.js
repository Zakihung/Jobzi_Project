const {
  createOnlineResumeService,
  getListOnlineResumeService,
  getOnlineResumeByIdService,
  updateOnlineResumeService,
  deleteOnlineResumeService,
} = require("../services/online_resume.service");

const createOnlineResume = async (req, res, next) => {
  try {
    const {
      candidate_id,
      strengths,
      work_exp,
      project_exp,
      pro_skills,
      edu_exp,
      achievement,
    } = req.body;
    const data = await createOnlineResumeService({
      candidate_id,
      strengths,
      work_exp,
      project_exp,
      pro_skills,
      edu_exp,
      achievement,
    });
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

const getListOnlineResume = async (req, res, next) => {
  try {
    const data = await getListOnlineResumeService();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getOnlineResumeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await getOnlineResumeByIdService(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const updateOnlineResume = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      email,
      full_name,
      gender,
      date_of_birth,
      phone_number,
      strengths,
      work_exp,
      project_exp,
      pro_skills,
      edu_exp,
      achievement,
    } = req.body;
    const data = await updateOnlineResumeService(id, {
      email,
      full_name,
      gender,
      date_of_birth,
      phone_number,
      strengths,
      work_exp,
      project_exp,
      pro_skills,
      edu_exp,
      achievement,
    });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const deleteOnlineResume = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await deleteOnlineResumeService(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOnlineResume,
  getListOnlineResume,
  getOnlineResumeById,
  updateOnlineResume,
  deleteOnlineResume,
};
