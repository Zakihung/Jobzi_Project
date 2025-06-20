import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/auth.context";
import { signupUser } from "../services/userApi";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";

export const useSignup = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data) => signupUser(data),
    onSuccess: (data) => {
      // Kiểm tra phản hồi API
      if (!data.message.includes("Đăng ký") || !data.user) {
        notification.error({
          message: "Lỗi",
          description: data.message || "Đăng ký thất bại!",
          placement: "topRight",
        });
        return;
      }

      // Lưu thông tin người dùng và token
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
        token: data.accessToken,
        refreshToken: data.refreshToken, // Lưu refreshToken
      };

      // Lưu vào localStorage
      localStorage.setItem("access_token", data.accessToken);
      localStorage.setItem("refresh_token", data.refreshToken); // Thêm refreshToken
      localStorage.setItem("authUser", JSON.stringify(userData));

      // Cập nhật trạng thái xác thực
      setAuth({ isAuthenticated: true, user: userData });

      // Hiển thị thông báo thành công ở góc trên bên phải
      notification.success({
        message: "Thành công",
        description: "Đăng ký thành công!",
        placement: "topRight",
      });

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
      // Xử lý lỗi từ API hoặc lỗi mạng
      const errorMessage = error.response?.data?.message || "Đăng ký thất bại!";
      notification.error({
        message: "Lỗi",
        description: errorMessage,
        placement: "topRight",
      });
    },
  });
};
