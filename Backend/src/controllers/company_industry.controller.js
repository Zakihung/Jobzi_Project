const {
  createCompanyIndustryService,
  getListCompanyIndustryService,
  getCompanyIndustryByIdService,
  updateCompanyIndustryService,
  deleteCompanyIndustryService,
  deleteAllCompanyIndustriesService,
} = require("../services/company_industry.service");

const createCompanyIndustry = async (req, res, next) => {
  try {
    const { name } = req.body;
    const data = await createCompanyIndustryService({ name });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getListCompanyIndustry = async (req, res, next) => {
  try {
    const data = await getListCompanyIndustryService();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getCompanyIndustryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await getCompanyIndustryByIdService(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const updateCompanyIndustry = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, status } = req.body;
    const data = await updateCompanyIndustryService(id, { name, status });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const deleteCompanyIndustry = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await deleteCompanyIndustryService(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const deleteAllCompanyIndustries = async (req, res, next) => {
  try {
    const data = await deleteAllCompanyIndustriesService();
    res.status(200).json({ message: "Đã xóa toàn bộ ngành công ty", data });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCompanyIndustry,
  getListCompanyIndustry,
  getCompanyIndustryById,
  updateCompanyIndustry,
  deleteCompanyIndustry,
  deleteAllCompanyIndustries,
};
