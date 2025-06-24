const {
  createProvinceService,
  getAllProvinceService,
  getAllProvinceAlphabetService,
  getProvinceByIdService,
  updateProvinceService,
  deleteProvinceService,
} = require("../services/province.service");

const createProvince = async (req, res, next) => {
  try {
    const { name } = req.body;
    const data = await createProvinceService({ name });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getAllProvince = async (req, res, next) => {
  try {
    const data = await getAllProvinceService();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getAllProvinceAlphabet = async (req, res, next) => {
  try {
    const data = await getAllProvinceAlphabetService();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getProvinceById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await getProvinceByIdService(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const updateProvince = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const data = await updateProvinceService(id, name);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const deleteProvince = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await deleteProvinceService(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProvince,
  getAllProvince,
  getAllProvinceAlphabet,
  getProvinceById,
  updateProvince,
  deleteProvince,
};
