const {
  createSalaryRangeService,
  getListSalaryRangeService,
  getSalaryRangeByIdService,
  updateSalaryRangeService,
  deleteSalaryRangeService,
} = require("../services/salary_range.service");

const createSalaryRange = async (req, res, next) => {
  try {
    const { type, min, max } = req.body;
    const data = await createSalaryRangeService({ type, min, max });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getListSalaryRange = async (req, res, next) => {
  try {
    const data = await getListSalaryRangeService();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getSalaryRangeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await getSalaryRangeByIdService(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const updateSalaryRange = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { type, min, max } = req.body;
    const data = await updateSalaryRangeService(id, { type, min, max });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const deleteSalaryRange = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await deleteSalaryRangeService(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSalaryRange,
  getListSalaryRange,
  getSalaryRangeById,
  updateSalaryRange,
  deleteSalaryRange,
};
