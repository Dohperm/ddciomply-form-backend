require("dotenv").config();
const express = require("express");
const cors = require("cors");
const errorHandlerMiddleware = require("./src/middlewares/error-handler");
const connectDB = require("./src/models/db/connect");
const registrationRouter = require("./src/routes/registration");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  })
);
app.use(express.json());

app.use(bodyParser.json());

app.use("/api/v1/forms", registrationRouter);

app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    console.log("✅ Database connected");
    app.listen(PORT, () => {
      console.log(`✅ Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

start();
