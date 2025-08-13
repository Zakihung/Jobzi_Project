const {
  createIndustryGroupService,
  getListIndustryGroupService,
  getIndustryGroupByIdService,
  updateIndustryGroupStatusService,
  deleteIndustryGroupService,
  deleteAllIndustryGroupsService,
  updateIndustryGroupService,
} = require("../services/industry_group.service");

const createIndustryGroup = async (req, res, next) => {
  try {
    const { name } = req.body;
    const data = await createIndustryGroupService({ name });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getListIndustryGroup = async (req, res, next) => {
  try {
    const data = await getListIndustryGroupService();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getIndustryGroupById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await getIndustryGroupByIdService(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const updateIndustryGroupStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const data = await updateIndustryGroupStatusService(id, status);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const deleteIndustryGroup = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await deleteIndustryGroupService(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const deleteAllIndustryGroups = async (req, res, next) => {
  try {
    const data = await deleteAllIndustryGroupsService();
    res.status(200).json({ message: "Đã xóa toàn bộ nhóm ngành", data });
  } catch (error) {
    next(error);
  }
};

const updateIndustryGroup = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await updateIndustryGroupService(id, req.body);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createIndustryGroup,
  getListIndustryGroup,
  getIndustryGroupById,
  updateIndustryGroupStatus,
  deleteIndustryGroup,
  deleteAllIndustryGroups,
  updateIndustryGroup,
};
