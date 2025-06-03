const {
  createCandidateService,
  getListCandidateService,
  getCandidateByIdService,
  updateCandidateService,
  deleteCandidateService,
  uploadAvatarCandidateService,
} = require("../services/candidate.service");
const uploadAvatarCandidate = require("../middleware/uploadAvaCandidate");

const createCandidate = async (req, res, next) => {
  try {
    const { user_id, full_name, gender, date_of_birth, phone_number } =
      req.body;
    const file = req.file;
    const data = await createCandidateService(
      { user_id, full_name, gender, date_of_birth, phone_number },
      file
    );
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getListCandidate = async (req, res, next) => {
  try {
    const data = await getListCandidateService();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getCandidateById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await getCandidateByIdService(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const updateCandidate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { full_name, gender, date_of_birth, phone_number } = req.body;
    const file = req.file;
    const data = await updateCandidateService(
      id,
      { full_name, gender, date_of_birth, phone_number },
      file
    );
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const deleteCandidate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await deleteCandidateService(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const uploadAvatarCandidate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const file = req.file;
    const data = await uploadAvatarCandidateService(id, file);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCandidate,
  getListCandidate,
  getCandidateById,
  updateCandidate,
  deleteCandidate,
  uploadAvatarCandidate,
};
