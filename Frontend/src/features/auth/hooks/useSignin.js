import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/auth.context";
import { signinUser } from "../services/userApi";
import { useNavigate } from "react-router-dom";
import { App } from "antd";

export const useSignin = () => {
  const { notification } = App.useApp();
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data) => signinUser(data),
    onSuccess: (data) => {
      if (!data?.user || !data?.accessToken) {
        notification.error({
          message: "Lỗi",
          description: data.message || "Đăng nhập thất bại!",
          placement: "topRight",
          duration: 2,
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
        description: "Đăng nhập thành công!",
        placement: "topRight",
        duration: 2,
      });

      setTimeout(() => {
        if (userData.role === "admin") {
          navigate("/admin");
        } else if (userData.role === "employer") {
          navigate("/employer");
        } else {
          navigate("/");
        }
      }, 1000);
    },
    onError: () => {
      // Trả về object chứa thông báo lỗi để component có thể sử dụng
      const errorMessage = "Email hoặc mật khẩu không chính xác!";

      // Ném lỗi với thông báo cụ thể để component có thể bắt
      throw { errorMessage };
    },
  });
};
