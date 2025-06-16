import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/auth.context";
import { loginUser } from "../services/userApi";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

export const useLogin = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data) => loginUser(data),
    onSuccess: (data) => {
      if (data.message !== "Đăng nhập thành công") {
        message.error(data.message || "Đăng nhập thất bại!");
        return;
      }

      // Nếu đăng nhập thành công, lưu token và thông tin người dùng
      const userData = {
        id: data.user._id,
        email: data.user.email,
        role: data.user.role,
        full_name: data.user.full_name,
        gender: data.user.gender || null,
        phone_number: data.user.phone_number || "",
        avatar:
          data.user.avatar ||
          "https://res.cloudinary.com/luanvancloudinary/image/upload/v1750090817/avaMacDinh_toiqej.jpg",
        date_of_birth: data.user.date_of_birth || null,
        token: data.accessToken, // Lưu accessToken từ response
      };

      // Lưu accessToken vào localStorage
      localStorage.setItem("access_token", data.accessToken);
      localStorage.setItem("authUser", JSON.stringify(userData));

      // Cập nhật trạng thái xác thực
      setAuth({ isAuthenticated: true, user: userData });

      message.success("Đăng nhập thành công!");

      // Điều hướng dựa trên vai trò
      if (userData.role === "admin") {
        navigate("/admin");
      } else if (userData.role === "employer") {
        navigate("/employer");
      } else {
        navigate("/");
      }
    },
    onError: (error) => {
      message.error(error.message || "Đăng nhập thất bại!");
    },
  });
};
