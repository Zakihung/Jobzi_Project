const {
  createCompanyService,
  getListCompanyService,
  getCompanyByIdService,
  getCompanyByIndustryIdService,
  updateCompanyService,
  deleteCompanyService,
  uploadLogoCompanyService,
} = require("../services/company.service");

const createCompany = async (req, res, next) => {
  try {
    const {
      company_industry_id,
      name,
      description,
      size,
      website_url,
      address,
    } = req.body;
    const file = req.file;
    const data = await createCompanyService(
      { company_industry_id, name, description, size, website_url, address },
      file
    );
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

const updateCompany = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      company_industry_id,
      name,
      description,
      size,
      website_url,
      address,
    } = req.body;
    const data = await updateCompanyService(id, {
      company_industry_id,
      name,
      description,
      size,
      website_url,
      address,
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
  updateCompany,
  deleteCompany,
  uploadLogoCompany,
};
