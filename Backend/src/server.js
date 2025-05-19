require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connection = require("./configs/database");
const errorHandler = require("./middleware/errorHandler");

const userRoutes = require("./routes/user.route");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/user", userRoutes);

// Middleware xử lý lỗi
app.use(errorHandler);

// Kết nối database và khởi động server
(async () => {
  try {
    await connection(); // Đợi kết nối database thành công
    console.log("Database connected successfully");

    // Khởi động server HTTP
    const server = app.listen(port, () => {
      console.log(`Backend Nodejs App listening on port ${port}`);
    });
  } catch (error) {
    console.log(">>> Error connecting to DB: ", error);
    process.exit(1);
  }
})();
