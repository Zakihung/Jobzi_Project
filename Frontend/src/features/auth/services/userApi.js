import axios from "../../../services/axios.customize";

// API để đăng nhập
const signinUser = (data) => {
  const URL_API = "/api/user/signin";
  return axios.post(URL_API, data);
};
//api đăng kí
const signupUser = (data) => {
  const URL_API = "/api/user/signup";
  return axios.post(URL_API, data);
};

//api đăng kí employer
const signupEmployerUser = (data) => {
  const URL_API = "/api/user/signupEmployer";
  return axios.post(URL_API, data);
};

// API đổi mật khẩu
const changePasswordUser = (data) => {
  const URL_API = "/api/user/change-password";
  return axios.post(URL_API, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
};

// API cập nhật thông tin người dùng
const updateUser = (user_id, data) => {
  const URL_API = `/api/user/${user_id}`;
  return axios.put(URL_API, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
};

// API đăng tải avatar
const uploadAvatarUser = (user_id, file) => {
  const URL_API = `/api/user/${user_id}/upload-avatar`;
  const formData = new FormData();
  formData.append("avatar", file);

  return axios.post(URL_API, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

// Lấy danh sách người dùng
const getListUser = () => {
  const URL_API = "/api/user";
  return axios.get(URL_API, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
};

// Lấy thông tin người dùng theo ID
const getUserById = (user_id) => {
  const URL_API = `/api/user/${user_id}`;
  return axios.get(URL_API, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
};

// Xóa người dùng theo ID
const deleteUserById = (user_id) => {
  const URL_API = `/api/user/${user_id}`;
  return axios.delete(URL_API, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
};

// API tạo tài khoản do admin thực hiện
const createUserByAdmin = (data) => {
  const URL_API = "/api/user/admin-create";
  return axios.post(URL_API, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
};

// API chỉnh sửa tài khoản do admin thực hiện
const updateUserByAdmin = (user_id, data) => {
  const URL_API = `/api/user/admin-update/${user_id}`;
  return axios.put(URL_API, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
};

export {
  signinUser,
  signupUser,
  signupEmployerUser,
  changePasswordUser,
  updateUser,
  uploadAvatarUser,
  getListUser,
  getUserById,
  deleteUserById,
  createUserByAdmin,
  updateUserByAdmin,
};
