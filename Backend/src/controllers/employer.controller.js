const {
  createEmployerService,
  getListEmployerService,
  getEmployerByIdService,
  updateEmployerService,
  deleteEmployerService,
  uploadAvatarEmployerService,
} = require("../services/employer.service");
const uploadAvatarEmployer = require("../middleware/uploadAvaEmployer");

const createEmployer = async (req, res, next) => {
  try {
    const {
      user_id,
      company_id,
      full_name,
      gender,
      date_of_birth,
      position,
      phone_number,
    } = req.body;
    const file = req.file;
    const data = await createEmployerService(
      {
        user_id,
        company_id,
        full_name,
        gender,
        date_of_birth,
        position,
        phone_number,
      },
      file
    );
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

const getListEmployer = async (req, res, next) => {
  try {
    const data = await getListEmployerService();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getEmployerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await getEmployerByIdService(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const updateEmployer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      user_id,
      company_id,
      full_name,
      gender,
      date_of_birth,
      position,
      phone_number,
    } = req.body;
    const file = req.file;
    const data = await updateEmployerService(
      id,
      {
        user_id,
        company_id,
        full_name,
        gender,
        date_of_birth,
        position,
        phone_number,
      },
      file
    );
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const deleteEmployer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await deleteEmployerService(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const uploadAvatarEmployer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const file = req.file;
    const data = await uploadAvatarEmployerService(id, file);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEmployer,
  getListEmployer,
  getEmployerById,
  updateEmployer,
  deleteEmployer,
  uploadAvatarEmployer,
};
