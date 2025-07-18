const {
  createOnlineResumeService,
  getOnlineResumeByCandidateIdService,
  getListOnlineResumeService,
  updateOnlineResumeService,
  addItemToArrayService,
  updateItemInArrayService,
  deleteItemInArrayService,
  deleteOnlineResumeService,
  deleteAllOnlineResumesService,
} = require("../services/online_resume.service");

const createOnlineResume = async (req, res, next) => {
  try {
    const { candidate_id } = req.params;
    if (!candidate_id) {
      throw new AppError("Thiếu candidate_id trong params", 400);
    }
    const resumeData = { ...req.body, candidate_id };
    const data = await createOnlineResumeService(resumeData);
    res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

const getOnlineResume = async (req, res, next) => {
  try {
    const { candidate_id } = req.params;
    if (!candidate_id) {
      throw new AppError("Thiếu candidate_id trong params", 400);
    }
    const data = await getOnlineResumeByCandidateIdService(candidate_id);
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

const getListOnlineResume = async (req, res, next) => {
  try {
    const data = await getListOnlineResumeService();
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

const updateOnlineResume = async (req, res, next) => {
  try {
    const { candidate_id } = req.params;
    if (!candidate_id) {
      throw new AppError("Thiếu candidate_id trong params", 400);
    }
    const updateData = req.body;
    const data = await updateOnlineResumeService(candidate_id, updateData);
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

const addItemToArray = async (req, res, next) => {
  try {
    const { candidate_id } = req.params;
    if (!candidate_id) {
      throw new AppError("Thiếu candidate_id trong params", 400);
    }
    const { field, item } = req.body;
    const data = await addItemToArrayService(candidate_id, field, item);
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

const updateItemInArray = async (req, res, next) => {
  try {
    const { candidate_id } = req.params;
    if (!candidate_id) {
      throw new AppError("Thiếu candidate_id trong params", 400);
    }
    const { field, index, item } = req.body;
    const data = await updateItemInArrayService(
      candidate_id,
      field,
      index,
      item
    );
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

const deleteItemInArray = async (req, res, next) => {
  try {
    const { candidate_id } = req.params;
    if (!candidate_id) {
      throw new AppError("Thiếu candidate_id trong params", 400);
    }
    const { field, index } = req.body;
    const data = await deleteItemInArrayService(candidate_id, field, index);
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

const deleteOnlineResume = async (req, res, next) => {
  try {
    const { candidate_id } = req.params;
    if (!candidate_id) {
      throw new AppError("Thiếu candidate_id trong params", 400);
    }
    const data = await deleteOnlineResumeService(candidate_id);
    res.status(200).json({ success: true, message: "Đã xóa hồ sơ", data });
  } catch (error) {
    next(error);
  }
};

const deleteAllOnlineResumes = async (req, res, next) => {
  try {
    const data = await deleteAllOnlineResumesService();
    res
      .status(200)
      .json({ success: true, message: "Đã xóa toàn bộ hồ sơ", data });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOnlineResume,
  getOnlineResume,
  getListOnlineResume,
  updateOnlineResume,
  addItemToArray,
  updateItemInArray,
  deleteItemInArray,
  deleteOnlineResume,
  deleteAllOnlineResumes,
};
