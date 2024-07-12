import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
dotenv.config(); //load any key-value pairs from any .env files into process.env
// import { getEnvVarOrFail } from "./envVarHelp.js";

const app = express();

//allow morgan logger to get access to each request before and after our handlers
app.use(morgan("dev"));
//auto-include CORS headers to allow consumption of our content by in-browser js loaded from elsewhere
app.use(cors());
//parse body text of requests announcing application/json, and make the content available object(s) in `req.body`
app.use(express.json());

export { app };
