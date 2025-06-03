const {
  createResumeAnalysisService,
  getListResumeAnalysisService,
  getResumeAnalysisByIdService,
  getResumeAnalysisByOnlineResumeIdService,
  getResumeAnalysisByResumeFileIdService,
  deleteResumeAnalysisService,
  deleteAllResumeAnalysisService,
} = require("../services/resume_analysis.service");

const createResumeAnalysis = async (req, res, next) => {
  try {
    const {
      job_post_id,
      online_resume_id,
      resume_file_id,
      strengths,
      weaknesses,
      match_score,
      suggestions,
    } = req.body;
    const data = await createResumeAnalysisService({
      job_post_id,
      online_resume_id,
      resume_file_id,
      strengths,
      weaknesses,
      match_score,
      suggestions,
    });
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

const getListResumeAnalysis = async (req, res, next) => {
  try {
    const data = await getListResumeAnalysisService();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getResumeAnalysisById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await getResumeAnalysisByIdService(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getResumeAnalysisByOnlineResumeId = async (req, res, next) => {
  try {
    const { online_resume_id } = req.params;
    const data = await getResumeAnalysisByOnlineResumeIdService(
      online_resume_id
    );
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getResumeAnalysisByResumeFileId = async (req, res, next) => {
  try {
    const { resume_file_id } = req.params;
    const data = await getResumeAnalysisByResumeFileIdService(resume_file_id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const deleteResumeAnalysis = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await deleteResumeAnalysisService(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const deleteAllResumeAnalysis = async (req, res, next) => {
  try {
    const data = await deleteAllResumeAnalysisService();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createResumeAnalysis,
  getListResumeAnalysis,
  getResumeAnalysisById,
  getResumeAnalysisByOnlineResumeId,
  getResumeAnalysisByResumeFileId,
  deleteResumeAnalysis,
  deleteAllResumeAnalysis,
};
