import express from "express";
import cors from "cors";
import helmet from "helmet";
// load environment variables
import "dotenv/config";
import authRoutes from "./routes";
import { errorHandler } from "../../../shared/middleware";

const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(cors());
app.use(helmet());

//parse JSON body
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// setup routes
app.use("/auth", authRoutes);
app.use("/health", (_req, res) => {
  res.send({ message: "Welcome to authservice!" });
});

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Auth service is running on port ${PORT}`);
  console.log(`Environment : ${process.env.NODE_ENV}`);
  console.log(`Health check : http://localhost:${PORT}/health`);
});

export default app;
