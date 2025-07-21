const {
  createCompanyService,
  getListCompanyService,
  getCompanyByIdService,
  getCompanyByIndustryIdService,
  getCompanyByProvinceIdService,
  updateCompanyService,
  deleteCompanyService,
  uploadLogoCompanyService,
} = require("../services/company.service");

const createCompany = async (req, res, next) => {
  try {
    const {
      company_industry_id,
      province_id,
      name,
      address,
      min_size,
      max_size,
      website_url,
      introduction,
      businessOperations,
      regulations,
      benefits,
    } = req.body;
    const data = await createCompanyService({
      company_industry_id,
      province_id,
      name,
      address,
      min_size,
      max_size,
      website_url,
      introduction,
      businessOperations,
      regulations,
      benefits,
    });
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

const getListCompany = async (req, res, next) => {
  try {
    const data = await getListCompanyService();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getCompanyById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await getCompanyByIdService(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getCompanyByIndustryId = async (req, res, next) => {
  try {
    const { company_industry_id } = req.params;
    const data = await getCompanyByIndustryIdService(company_industry_id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getCompanyByProvinceId = async (req, res, next) => {
  try {
    const { province_id } = req.params;
    const data = await getCompanyByProvinceIdService(province_id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const updateCompany = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      company_industry_id,
      province_id,
      name,
      description,
      min_size,
      max_size,
      website_url,
      address,
      introduction,
      businessOperations,
      regulations,
      benefits,
    } = req.body;
    const data = await updateCompanyService(id, {
      company_industry_id,
      province_id,
      name,
      description,
      min_size,
      max_size,
      website_url,
      address,
      introduction,
      businessOperations,
      regulations,
      benefits,
    });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const deleteCompany = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await deleteCompanyService(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const uploadLogoCompany = async (req, res, next) => {
  try {
    const { id } = req.params;
    const file = req.file;
    const data = await uploadLogoCompanyService(id, file);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCompany,
  getListCompany,
  getCompanyById,
  getCompanyByIndustryId,
  getCompanyByProvinceId,
  updateCompany,
  deleteCompany,
  uploadLogoCompany,
};
