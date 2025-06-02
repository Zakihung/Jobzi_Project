const {
  createIndustryService,
  getListIndustryService,
  getIndustryByIdService,
  updateIndustryStatusService,
  deleteIndustryService,
  deleteAllIndustriesService,
} = require("../services/industry.service");

const createIndustry = async (req, res, next) => {
  try {
    const { industry_group_id, name } = req.body;
    const data = await createIndustryService({ industry_group_id, name });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getListIndustry = async (req, res, next) => {
  try {
    const data = await getListIndustryService();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getIndustryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await getIndustryByIdService(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const updateIndustryStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const data = await updateIndustryStatusService(id, status);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const deleteIndustry = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await deleteIndustryService(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const deleteAllIndustries = async (req, res, next) => {
  try {
    const data = await deleteAllIndustriesService();
    res.status(200).json({ message: "Đã xóa toàn bộ ngành", data });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createIndustry,
  getListIndustry,
  getIndustryById,
  updateIndustryStatus,
  deleteIndustry,
  deleteAllIndustries,
};
