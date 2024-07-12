const express = require("express");
require("dotenv").config(); //load any key-value pairs from any .env files into process.env
const cors = require("cors");
// const { getEnvVarOrFail } = require("./envVarHelp");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));

//auto-include CORS headers to allow consumption of our content by in-browser js loaded from elsewhere
app.use(cors());
app.use(express.json());

module.exports = { app };
