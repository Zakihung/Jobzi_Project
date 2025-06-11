import { createContext, useEffect, useState } from "react";

// Tạo Context với giá trị mặc định
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext({
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
  },
  setAuth: () => {},
  loading: true,
  setLoading: () => {},
});

// Provider quản lý trạng thái xác thực
export const AuthWrapper = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    try {
      const storedUser = localStorage.getItem("authUser");
      const storedToken = localStorage.getItem("access_token");
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      return storedToken && parsedUser
        ? { isAuthenticated: true, user: parsedUser }
        : { isAuthenticated: false, user: {} };
    } catch (error) {
      console.error("Lỗi khi parse localStorage:", error);
      localStorage.removeItem("authUser");
      localStorage.removeItem("access_token");
      return { isAuthenticated: false, user: {} };
    }
  });

  const [loading, setLoading] = useState(false);

  // Khi user đăng nhập, lưu vào localStorage
  useEffect(() => {
    if (auth.isAuthenticated) {
      localStorage.setItem("authUser", JSON.stringify(auth.user));
      localStorage.setItem("access_token", auth.user.token); // Sử dụng key "access_token"
    } else {
      localStorage.removeItem("authUser");
      localStorage.removeItem("access_token");
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
