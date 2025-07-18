import { useMutation } from "@tanstack/react-query";
import { signupEmployerUser } from "../services/userApi";
import { useNavigate } from "react-router-dom";
import { App } from "antd";

export const useSignupEmployer = (form) => {
  const { notification } = App.useApp();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data) => signupEmployerUser(data),
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

      // Hiển thị thông báo thành công ở góc trên bên phải
      notification.success({
        message: "Thành công",
        description: "Đăng ký tài khoản thành công! Vui lòng đăng nhập!",
        placement: "topRight",
        duration: 2,
      });

      setTimeout(() => {
        navigate("/employer-signin");
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
