const {
  createResumeFileService,
  getListResumeFileService,
  getResumeFileByCandidateIdService,
  getResumeFileByIdService,
  updateResumeFileService,
  deleteResumeFileService,
} = require("../services/resume_file.service");

const createResumeFile = async (req, res, next) => {
  try {
    const { name } = req.body;
    const { id: candidate_id } = req.params;
    const file = req.file;
    const data = await createResumeFileService(candidate_id, name, file);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

const getListResumeFile = async (req, res, next) => {
  try {
    const data = await getListResumeFileService();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getResumeFileByCandidateId = async (req, res, next) => {
  try {
    const { candidate_id } = req.params;
    const data = await getResumeFileByCandidateIdService(candidate_id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getResumeFileById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await getResumeFileByIdService(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const updateResumeFile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const file = req.file;
    const data = await updateResumeFileService(id, { name }, file);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const deleteResumeFile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await deleteResumeFileService(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createResumeFile,
  getListResumeFile,
  getResumeFileByCandidateId,
  getResumeFileById,
  updateResumeFile,
  deleteResumeFile,
};
