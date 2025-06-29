import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/auth.context";
import { signupUser } from "../services/userApi";
import { useNavigate } from "react-router-dom";
import { App } from "antd";

export const useSignup = (form) => {
  const { notification } = App.useApp();
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data) => signupUser(data),
    onSuccess: (data) => {
      if (!data?.user || !data?.accessToken) {
        notification.error({
          message: "Lỗi",
          description: data.message || "Đăng ký tài khoản thất bại!",
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
        description: "Đăng ký tài khoản thành công! Vui lòng đăng nhập!",
        placement: "topRight",
        duration: 2,
      });

      setTimeout(() => {
        if (userData.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/signin");
        }
      }, 1000);
    },
    onError: (error) => {
      // Kiểm tra lỗi từ API response
      if (error?.message) {
        if (error.message === "Email đã tồn tại") {
          // Xử lý lỗi cho trường email
          if (form) {
            // Đặt lỗi cho trường email
            form.setFields([
              {
                name: "email",
                errors: ["Email này đã được sử dụng, vui lòng chọn email khác"],
              },
            ]);

            // Cuộn đến trường email
            form.scrollToField("email", {
              behavior: "smooth",
              block: "center",
            });
          }
        }
      }

      // Hiển thị thông báo lỗi
      notification.error({
        message: "Lỗi",
        description: "Không tạo được tài khoản",
        placement: "topRight",
        duration: 3,
      });
    },
  });
};
