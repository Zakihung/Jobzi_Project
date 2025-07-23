require("dotenv").config();
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Candidate = require("../models/candidate.model");
const Employer = require("../models/employer.model");
const Company = require("../models/company.model");
const OnlineResume = require("../models/online_resume.model"); // Thêm import
const AppError = require("../utils/AppError");
const ResetToken = require("../models/user.resetpassword");
const sendResetPasswordEmail = require("../utils/sendResetPasswordEmail");
const cloudinary = require("../configs/cloudinary");
const { createCompanyService } = require("../services/company.service"); // Thêm import

const signupService = async ({
  email,
  password,
  full_name,
  role,
  gender,
  date_of_birth,
  phone_number,
}) => {
  // Kiểm tra dữ liệu đầu vào
  if (
    !email ||
    !password ||
    !full_name ||
    !role ||
    !gender ||
    !date_of_birth ||
    !phone_number
  ) {
    throw new AppError("Dữ liệu trống", 400);
  }

  // Kiểm tra role hợp lệ
  if (!["candidate", "admin"].includes(role)) {
    throw new AppError(
      "Vai trò không hợp lệ: chỉ chấp nhận 'candidate' hoặc 'admin'",
      400
    );
  }

  // Kiểm tra định dạng email
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    throw new AppError("Email không hợp lệ", 400);
  }

  // Kiểm tra định dạng mật khẩu
  if (
    !/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$#!%*?&]{8,}$/.test(
      password
    )
  ) {
    throw new AppError(
      "Mật khẩu phải có chữ Hoa, chữ thường, số, ký tự đặc biệt và có độ dài lớn hơn 8 ký tự!",
      400
    );
  }

  // Kiểm tra định dạng họ tên
  if (!/^[a-zA-ZÀ-ỹ\s.-]{1,100}$/.test(full_name)) {
    throw new AppError(
      "Họ tên không hợp lệ! Chỉ được chứa chữ cái, khoảng trắng, dấu chấm hoặc dấu gạch nối, tối đa 100 ký tự.",
      400
    );
  }

  // Kiểm tra giới tính
  if (!["male", "female"].includes(gender)) {
    throw new AppError(
      "Giới tính không hợp lệ: chỉ chấp nhận 'male', 'female'",
      400
    );
  }

  // Kiểm tra ngày tháng năm sinh
  const dob = new Date(date_of_birth);
  const today = new Date();
  const minAge = 15;
  const maxAge = 60;
  const minDate = new Date(
    today.getFullYear() - maxAge,
    today.getMonth(),
    today.getDate()
  );
  const maxDate = new Date(
    today.getFullYear() - minAge,
    today.getMonth(),
    today.getDate()
  );

  if (isNaN(dob.getTime()) || dob < minDate || dob > maxDate) {
    throw new AppError(
      `Ngày sinh không hợp lệ! Phải từ ${minAge} đến ${maxAge} tuổi.`,
      400
    );
  }

  // Kiểm tra định dạng số điện thoại
  if (!/^\+?[0-9]{10}$/.test(phone_number)) {
    throw new AppError(
      "Số điện thoại không hợp lệ! Phải chứa đúng 10 chữ số",
      400
    );
  }

  // Kiểm tra tồn tại email
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("Email đã tồn tại", 409);
  }

  // Băm mật khẩu
  const hashedPassword = await bcrypt.hash(password, 10);

  // Tạo user mới
  const user = new User({
    email,
    password: hashedPassword,
    role,
    full_name,
    gender,
    date_of_birth: dob,
    phone_number,
  });

  // Tạo accessToken và refreshToken
  const accessToken = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  const refreshToken = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  // Lưu refreshToken vào user
  user.refreshToken = refreshToken;
  await user.save();

  // Tạo bản ghi tương ứng dựa trên role
  if (role === "candidate") {
    const candidate = new Candidate({
      user_id: user._id,
      status: "ready",
    });
    await candidate.save();

    // Tạo OnlineResume cho candidate
    const onlineResume = new OnlineResume({
      candidate_id: candidate._id,
      personalInfo: {
        full_name: user.full_name,
        phone_number: user.phone_number,
        date_of_birth: user.date_of_birth,
        email: user.email,
        avatar:
          user.avatar ||
          "https://res.cloudinary.com/luanvancloudinary/image/upload/v1750090817/avaMacDinh_toiqej.jpg",
      },
      jobExpectations: [],
      education: [],
      highlights: [],
      workExperience: [],
      projects: [],
      skills: [],
    });
    await onlineResume.save();

    return {
      user: {
        ...user.toObject(),
        candidate_id: candidate._id,
      },
      candidate,
      onlineResume, // Thêm onlineResume vào kết quả trả về
      accessToken,
      refreshToken,
    };
  } else {
    // Nếu là admin, không tạo OnlineResume
    return {
      user: {
        ...user.toObject(),
        candidate_id: null,
      },
      accessToken,
      refreshToken,
    };
  }
};

const signupEmployerService = async ({
  email,
  password,
  full_name,
  role,
  gender,
  date_of_birth,
  phone_number,
  company_name,
  address,
  province_id,
  company_industry_id,
  position,
  min_size,
  max_size,
  website_url,
  introduction,
  businessOperations,
  regulations,
  benefits,
}) => {
  // Kiểm tra dữ liệu đầu vào
  if (
    !email ||
    !password ||
    !full_name ||
    !role ||
    !gender ||
    !date_of_birth ||
    !phone_number ||
    !company_name ||
    !address ||
    !province_id ||
    !company_industry_id ||
    !position
  ) {
    throw new AppError("Dữ liệu trống", 400);
  }

  // Kiểm tra role hợp lệ
  if (role !== "employer") {
    throw new AppError("Vai trò không hợp lệ!", 400);
  }

  // Kiểm tra định dạng email
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    throw new AppError("Email không hợp lệ", 400);
  }

  // Kiểm tra định dạng mật khẩu
  if (
    !/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$#!%*?&]{8,}$/.test(
      password
    )
  ) {
    throw new AppError(
      "Mật khẩu phải có chữ Hoa, chữ thường, số, ký tự đặc biệt và có độ dài lớn hơn 8 ký tự!",
      400
    );
  }

  // Kiểm tra định dạng họ tên
  if (!/^[a-zA-ZÀ-ỹ\s.-]{1,100}$/.test(full_name)) {
    throw new AppError(
      "Họ tên không hợp lệ! Chỉ được chứa chữ cái, khoảng trắng, dấu chấm hoặc dấu gạch nối, tối đa 100 ký tự.",
      400
    );
  }

  // Kiểm tra giới tính
  if (!["male", "female"].includes(gender)) {
    throw new AppError(
      "Giới tính không hợp lệ: chỉ chấp nhận 'male', 'female'",
      400
    );
  }

  // Kiểm tra ngày tháng năm sinh
  const dob = new Date(date_of_birth);
  const today = new Date();
  const minAge = 15;
  const maxAge = 60;
  const minDate = new Date(
    today.getFullYear() - maxAge,
    today.getMonth(),
    today.getDate()
  );
  const maxDate = new Date(
    today.getFullYear() - minAge,
    today.getMonth(),
    today.getDate()
  );

  if (isNaN(dob.getTime()) || dob < minDate || dob > maxDate) {
    throw new AppError(
      `Ngày sinh không hợp lệ! Phải từ ${minAge} đến ${maxAge} tuổi.`,
      400
    );
  }

  // Kiểm tra định dạng số điện thoại
  if (!/^\+?[0-9]{10}$/.test(phone_number)) {
    throw new AppError(
      "Số điện thoại không hợp lệ! Phải chứa đúng 10 chữ số",
      400
    );
  }

  // Kiểm tra tên công ty
  if (!/^[\p{L}0-9\s.,&@/()+\-'"!%*#]{1,100}$/u.test(company_name)) {
    throw new AppError(
      "Tên công ty không hợp lệ! Chỉ được chứa chữ cái, số, khoảng trắng và một số ký tự đặc biệt như . , & / + - ( ) ' \" v.v., tối đa 100 ký tự.",
      400
    );
  }

  // Kiểm tra định dạng vị trí
  if (!/^[a-zA-ZÀ-ỹ\s.-]{1,100}$/.test(position)) {
    throw new AppError(
      "Vị trí không hợp lệ! Chỉ được chứa chữ cái, khoảng trắng, dấu chấm hoặc dấu gạch nối, tối đa 100 ký tự.",
      400
    );
  }

  // Kiểm tra tồn tại email
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("Email đã tồn tại", 409);
  }

  // Băm mật khẩu
  const hashedPassword = await bcrypt.hash(password, 10);

  // Tạo user mới
  const user = new User({
    email,
    password: hashedPassword,
    role,
    full_name,
    gender,
    date_of_birth: dob,
    phone_number,
  });

  // Tạo accessToken và refreshToken
  const accessToken = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  const refreshToken = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  // Lưu refreshToken vào user
  user.refreshToken = refreshToken;
  await user.save();

  // Tạo company bằng createCompanyService
  const company = await createCompanyService({
    company_industry_id,
    province_id,
    name: company_name,
    address,
    min_size: min_size || 0,
    max_size: max_size || 0,
    website_url: website_url || "",
    introduction: introduction || "",
    businessOperations: businessOperations || [],
    regulations: regulations || [],
    benefits: benefits || [],
  });

  // Tạo employer
  const employer = new Employer({
    user_id: user._id,
    company_id: company._id,
    position,
  });
  await employer.save();

  return {
    user: {
      ...user.toObject(),
      employer_id: employer._id,
    },
    company,
    employer,
    accessToken,
    refreshToken,
  };
};

const signinService = async ({ email, password }) => {
  // Kiểm tra tồn tại
  if (!email || !password) {
    throw new AppError("Thông tin đăng nhập trống", 400);
  }
  const user = await User.findOne({ email });
  // Kiểm tra tồn tại email trong csdl
  if (!user) {
    throw new AppError("Email không tồn tại", 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  // Kiểm tra mật khẩu
  if (!isMatch) {
    throw new AppError("Mật khẩu không hợp lệ", 401);
  }

  const accessToken = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  const refreshToken = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "3d" }
  );

  user.refreshToken = refreshToken;
  await user.save();

  let candidate_id = null;
  let employer_id = null;

  if (user.role === "candidate") {
    const candidate = await Candidate.findOne({ user_id: user._id });
    candidate_id = candidate ? candidate._id : null;
  } else if (user.role === "employer") {
    const employer = await Employer.findOne({ user_id: user._id });
    employer_id = employer ? employer._id : null;
  }

  return {
    user: {
      ...user.toObject(),
      candidate_id,
      employer_id,
    },
    accessToken,
    refreshToken,
  };
};

const refreshAccessTokenService = async (refreshToken) => {
  if (!refreshToken) {
    throw new AppError("Refresh token không được cung cấp", 400);
  }

  const user = await User.findOne({ refreshToken });
  if (!user) {
    throw new AppError("Refresh token không hợp lệ", 403);
  }

  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

  const accessToken = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return accessToken;
};

const uploadAvatarUserService = async (user_id, file) => {
  if (!file) {
    throw new AppError("Không có file ảnh được cung cấp", 400);
  }

  let user = await User.findById(user_id);
  if (!user) {
    throw new AppError("Không tìm thấy người dùng", 404);
  }

  // Xóa avatar cũ trên Cloudinary nếu tồn tại
  if (user.avatar) {
    const publicId = user.avatar.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(`user_avatars/${publicId}`, {
      resource_type: "image",
    });
  }

  // Upload avatar mới lên Cloudinary
  const cloudinaryResult = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "image",
          folder: "user_avatars",
          public_id: `avatar_${Date.now()}.${file.mimetype.split("/")[1]}`,
          transformation: [
            { width: 500, height: 500, crop: "limit" },
            { quality: "auto:best" },
          ],
        },
        (error, result) => {
          if (error) reject(new AppError("Cloudinary upload failed", 500));
          resolve(result);
        }
      )
      .end(file.buffer);
  });

  // Lưu URL của ảnh mới
  user.avatar = cloudinaryResult.secure_url;
  await user.save();

  // Đồng bộ avatar với OnlineResume nếu người dùng là candidate
  if (user.role === "candidate") {
    const candidate = await Candidate.findOne({ user_id: user._id });
    if (candidate) {
      await OnlineResume.findOneAndUpdate(
        { candidate_id: candidate._id },
        { $set: { "personalInfo.avatar": user.avatar } }
      );
    }
  }

  return user;
};

const requestPasswordResetService = async (email) => {
  if (!email) throw new AppError("Email không được để trống!", 400);

  const user = await User.findOne({ email });
  if (!user) throw new AppError("Email không tồn tại", 400);

  const resetToken = crypto.randomBytes(32).toString("hex");
  const expiresAt = Date.now() + 15 * 60 * 1000;

  await ResetToken.create({ userId: user._id, token: resetToken, expiresAt });
  await sendResetPasswordEmail(user.email, resetToken);
};

const resetPasswordService = async (token, newPassword) => {
  if (!newPassword) throw new AppError("Mật khẩu không được để trống!", 400);

  const resetToken = await ResetToken.findOne({ token });

  if (!resetToken || !resetToken.userId || resetToken.expiresAt < Date.now()) {
    throw new AppError("Token không hợp lệ hoặc đã hết hạn!", 400);
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const updatedUser = await User.findByIdAndUpdate(
    resetToken.userId,
    { password: hashedPassword },
    { new: true }
  );

  if (!updatedUser) {
    throw new AppError(
      "Không tìm thấy người dùng, đặt lại mật khẩu thất bại!",
      400
    );
  }

  await ResetToken.findOneAndDelete({ token });
};

const getEmailFromTokenService = async (token) => {
  const resetRequest = await ResetToken.findOne({ token });
  if (!resetRequest)
    throw new AppError("Token không hợp lệ hoặc đã hết hạn", 404);

  const user = await User.findById(resetRequest.userId);
  if (!user) throw new AppError("Không tìm thấy người dùng", 404);

  return user.email;
};

const getListUserService = async () => {
  const result = await User.find();
  return result;
};

const getUserByIdService = async (user_id) => {
  const user = await User.findById(user_id);
  if (!user) {
    throw new AppError("Không tìm thấy người dùng", 404);
  }
  return user;
};

const changePasswordService = async (user_id, oldPassword, newPassword) => {
  // Kiểm tra dữ liệu đầu vào
  if (!user_id || !oldPassword || !newPassword) {
    throw new AppError("Dữ liệu không được để trống!", 400);
  }

  // Kiểm tra định dạng mật khẩu mới
  if (
    !/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$#!%*?&]{8,}$/.test(
      newPassword
    )
  ) {
    throw new AppError(
      "Mật khẩu mới phải có chữ hoa, chữ thường, số, ký tự đặc biệt và dài hơn 8 ký tự!",
      400
    );
  }

  // Tìm người dùng
  const user = await User.findById(user_id);
  if (!user) {
    throw new AppError("Không tìm thấy người dùng", 404);
  }

  // Kiểm tra mật khẩu cũ
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    throw new AppError("Mật khẩu cũ không đúng", 401);
  }

  // Băm mật khẩu mới
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  // Cập nhật mật khẩu
  user.password = hashedNewPassword;
  await user.save();

  return { message: "Đổi mật khẩu thành công" };
};

const updateUserService = async (user_id, updateData) => {
  const { full_name, gender, date_of_birth, phone_number } = updateData;
  let user = await User.findById(user_id);
  if (!user) {
    throw new AppError("Không tìm thấy người dùng", 404);
  }

  if (full_name !== undefined && !full_name) {
    throw new AppError("Tên đầy đủ không được để trống", 400);
  }
  if (full_name !== undefined && !/^[a-zA-ZÀ-ỹ\s.-]{1,100}$/.test(full_name)) {
    throw new AppError(
      "Họ tên không hợp lệ! Chỉ được chứa chữ cái, khoảng trắng, dấu chấm hoặc dấu gạch nối, tối đa 100 ký tự.",
      400
    );
  }
  if (gender !== undefined && gender && !["male", "female"].includes(gender)) {
    throw new AppError(
      "Giới tính không hợp lệ: chỉ chấp nhận 'male' hoặc 'female'",
      400
    );
  }
  if (
    phone_number !== undefined &&
    phone_number &&
    !/^(?:\+84|0)(?:3[2-9]|5[2689]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7}$/.test(
      phone_number
    )
  ) {
    throw new AppError(
      "Số điện thoại không hợp lệ! Phải bắt đầu bằng +84 hoặc 0, theo sau là 9-10 chữ số.",
      400
    );
  }
  if (date_of_birth !== undefined) {
    const dob = new Date(date_of_birth);
    const today = new Date();
    const minAge = 15;
    const maxAge = 60;
    const minDate = new Date(
      today.getFullYear() - maxAge,
      today.getMonth(),
      today.getDate()
    );
    const maxDate = new Date(
      today.getFullYear() - minAge,
      today.getMonth(),
      today.getDate()
    );
    if (isNaN(dob.getTime()) || dob < minDate || dob > maxDate) {
      throw new AppError(
        `Ngày sinh không hợp lệ! Phải từ ${minAge} đến ${maxAge} tuổi.`,
        400
      );
    }
  }

  user.full_name = full_name !== undefined ? full_name : user.full_name;
  user.gender = gender !== undefined ? gender : user.gender;
  user.date_of_birth =
    date_of_birth !== undefined ? date_of_birth : user.date_of_birth;
  user.phone_number =
    phone_number !== undefined ? phone_number : user.phone_number;

  await user.save();

  // Đồng bộ với OnlineResume nếu người dùng là candidate
  if (user.role === "candidate") {
    const candidate = await Candidate.findOne({ user_id: user._id });
    if (candidate) {
      await OnlineResume.findOneAndUpdate(
        { candidate_id: candidate._id },
        {
          $set: {
            "personalInfo.full_name": user.full_name,
            "personalInfo.date_of_birth": user.date_of_birth,
            "personalInfo.phone_number": user.phone_number,
            "personalInfo.email": user.email,
          },
        }
      );
    }
  }

  return user;
};

const deleteUserByIdService = async (user_id) => {
  const user = await User.findById(user_id);
  if (!user) {
    throw new AppError("Không tìm thấy người dùng", 404);
  }

  if (user.role === "candidate") {
    // Xóa Candidate và OnlineResume
    const candidate = await Candidate.findOne({ user_id });
    if (candidate) {
      await OnlineResume.deleteMany({ candidate_id: candidate._id });
      await Candidate.deleteOne({ _id: candidate._id });
    }
  }

  if (user.role === "employer") {
    // Xóa Employer và công ty liên quan nếu cần
    const employer = await Employer.findOne({ user_id });
    if (employer) {
      await Employer.deleteOne({ _id: employer._id });
      await Company.deleteOne({ _id: employer.company_id });
    }
  }

  // Xóa tài khoản user
  await User.deleteOne({ _id: user_id });

  return { message: "Đã xóa người dùng và dữ liệu liên quan" };
};

module.exports = {
  signupService,
  signupEmployerService,
  signinService,
  uploadAvatarUserService,
  refreshAccessTokenService,
  requestPasswordResetService,
  resetPasswordService,
  getEmailFromTokenService,
  getListUserService,
  getUserByIdService,
  changePasswordService,
  updateUserService,
  deleteUserByIdService,
};
