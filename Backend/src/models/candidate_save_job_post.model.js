const mongoose = require("mongoose");

const candidate_save_job_postSchema = new mongoose.Schema(
  {
    candidate_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate",
      required: true,
    },
    job_post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobPost",
      required: true,
    },
  },
  { timestamps: true }
);

candidate_save_job_postSchema.index({ candidate_id: 1, job_post_id: 1 });

const Candidate_Save_Job_Post = mongoose.model(
  "Candidate_Save_Job_Post",
  candidate_save_job_postSchema,
  "CandidateSaveJobPost"
);

module.exports = Candidate_Save_Job_Post;
