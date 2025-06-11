const {
  getListCandidateService,
  getCandidateByIdService,
  updateStatusService,
  deleteCandidateService,
} = require("../services/candidate.service");

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

const updateStatusCandidate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const data = await updateStatusService(id, status);
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

module.exports = {
  getListCandidate,
  getCandidateById,
  updateStatusCandidate,
  deleteCandidate,
};
