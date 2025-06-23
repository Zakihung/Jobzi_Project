const {
  createWorkAddressService,
  getAllWorkAddressService,
  getWorkAddressByIdService,
  updateWorkAddressService,
  deleteWorkAddressService,
} = require("../services/work_address.service");

const createWorkAddress = async (req, res, next) => {
  try {
    const { province_id, address } = req.body;
    const data = await createWorkAddressService({ province_id, address });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getAllWorkAddress = async (req, res, next) => {
  try {
    const data = await getAllWorkAddressService();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getWorkAddressById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await getWorkAddressByIdService(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const updateWorkAddress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { province_id, address } = req.body;
    const data = await updateWorkAddressService(id, { province_id, address });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const deleteWorkAddress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await deleteWorkAddressService(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createWorkAddress,
  getAllWorkAddress,
  getWorkAddressById,
  updateWorkAddress,
  deleteWorkAddress,
};
