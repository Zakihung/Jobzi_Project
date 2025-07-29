const {
  createResumeAnalysisService,
  processResumeAnalysisService,
  updateResumeAnalysisService,
  getListResumeAnalysisService,
  getResumeAnalysisByIdService,
  getLatestResumeAnalysisService,
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
      extraction,
      classification,
      analysis,
    } = req.body;
    const data = await createResumeAnalysisService({
      job_post_id,
      online_resume_id,
      resume_file_id,
      extraction,
      classification,
      analysis,
    });
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

const processResumeAnalysis = async (req, res, next) => {
  try {
    const { resume_file_id, online_resume_id } = req.params;
    const { job_post_id } = req.body;
    if (!job_post_id) {
      return res.status(400).json({ error: "job_post_id là bắt buộc" });
    }
    const data = await processResumeAnalysisService(
      resume_file_id,
      online_resume_id,
      job_post_id
    );
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const updateResumeAnalysis = async (req, res, next) => {
  try {
    const analysis_id = req.params.analysis_id;
    const data = req.body;
    const updated = await updateResumeAnalysisService(analysis_id, data);
    res.status(200).json(updated);
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

const getLatestResumeAnalysis = async (req, res, next) => {
  try {
    const { job_post_id, resume_file_id, online_resume_id } = req.query;
    const data = await getLatestResumeAnalysisService(
      job_post_id,
      resume_file_id,
      online_resume_id
    );
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
  processResumeAnalysis,
  updateResumeAnalysis,
  getListResumeAnalysis,
  getResumeAnalysisById,
  getLatestResumeAnalysis,
  getResumeAnalysisByOnlineResumeId,
  getResumeAnalysisByResumeFileId,
  deleteResumeAnalysis,
  deleteAllResumeAnalysis,
};
