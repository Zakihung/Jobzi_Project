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

export { signinUser, signupUser, signupEmployerUser };
