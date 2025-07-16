import { createContext, useContext, useEffect, useState } from "react";

// Tạo Context với giá trị mặc định
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext({
  auth: {
    isAuthenticated: false,
    user: {
      id: "",
      email: "",
      role: "",
      full_name: "",
      gender: "",
      avatar: "",
      date_of_birth: "",
      phone_number: "",
      token: "",
      candidate_id: "",
      employer_id: "",
    },
  },
  setAuth: () => {},
  loading: true,
  setLoading: () => {},
  logout: () => {},
  isLoggedIn: false,
});

// Provider quản lý trạng thái xác thực
export const AuthWrapper = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    try {
      const storedUser = localStorage.getItem("authUser");
      const storedToken = localStorage.getItem("access_token");

      if (storedToken && storedUser) {
        const parsedUser = JSON.parse(storedUser);
        return {
          isAuthenticated: true,
          user: {
            ...parsedUser,
            token: storedToken,
          },
        };
      }

      return {
        isAuthenticated: false,
        user: {
          id: "",
          email: "",
          role: "",
          full_name: "",
          gender: "",
          avatar: "",
          date_of_birth: "",
          phone_number: "",
          token: "",
          candidate_id: "",
          employer_id: "",
        },
      };
    } catch (error) {
      console.error("Lỗi khi parse localStorage:", error);
      localStorage.removeItem("authUser");
      localStorage.removeItem("access_token");
      return {
        isAuthenticated: false,
        user: {
          id: "",
          email: "",
          role: "",
          full_name: "",
          gender: "",
          avatar: "",
          date_of_birth: "",
          phone_number: "",
          token: "",
          candidate_id: "",
          employer_id: "",
        },
      };
    }
  });

  const [loading, setLoading] = useState(false);

  // Hàm đăng xuất
  const logout = () => {
    try {
      // Xóa dữ liệu localStorage
      localStorage.removeItem("authUser");
      localStorage.removeItem("access_token");

      // Reset auth state
      setAuth({
        isAuthenticated: false,
        user: {
          id: "",
          email: "",
          role: "",
          full_name: "",
          gender: "",
          avatar: "",
          date_of_birth: "",
          phone_number: "",
          token: "",
          candidate_id: "",
          employer_id: "",
        },
      });

      console.log("Đăng xuất thành công");
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
    }
  };

  // Custom hook để kiểm tra trạng thái đăng nhập
  const isLoggedIn = auth.isAuthenticated && auth.user.token;

  // Khi auth thay đổi, cập nhật localStorage
  useEffect(() => {
    if (auth.isAuthenticated && auth.user.token) {
      try {
        localStorage.setItem("authUser", JSON.stringify(auth.user));
        localStorage.setItem("access_token", auth.user.token);
      } catch (error) {
        console.error("Lỗi khi lưu localStorage:", error);
      }
    } else {
      localStorage.removeItem("authUser");
      localStorage.removeItem("access_token");
    }
  }, [auth]);

  // Kiểm tra token còn hợp lệ không (có thể mở rộng sau)
  useEffect(() => {
    const checkTokenValidity = () => {
      const token = localStorage.getItem("access_token");
      if (token && !auth.isAuthenticated) {
        // Có thể gọi API để verify token
        console.log("Checking token validity...");
      }
    };

    checkTokenValidity();
  }, [auth.isAuthenticated]);

  const contextValue = {
    auth,
    setAuth,
    loading,
    setLoading,
    logout,
    isLoggedIn,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Custom hook để sử dụng AuthContext dễ dàng hơn
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthWrapper");
  }
  return context;
};
