import express from "express";
import ip from "ip";
import dotenv from "dotenv";
import cors from "cors";
import Response from "./src/domain/response.js";
import logger from "./src/util/logger.js";
import HttpStatus from "./src/controller/patient.controller.js";
import patientRoutes from "./src/route/patient.route.js";

dotenv.config();
const PORT = process.env.SERVER_PORT || 3001;
const app = express();
app.use(cors({ origin: "*" })); //bu iyi bir şey değil array konulması gerekir
app.use(express.json());

app.use("/patients", patientRoutes);
app.get("/", (req, res) =>
  res.send(
    new Response(
      HttpStatus.OK.code,
      HttpStatus.OK.status,
      "Patient API, v1.0.0 - All Systems Go"
    )
  )
);
app.all("*", (req, res) =>
  res
    .status(HttpStatus.NOT_FOUND.code)
    .send(
      new Response(
        HttpStatus.NOT_FOUND.code,
        HttpStatus.NOT_FOUND.status,
        "Route does not exist on the server"
      )
    )
);
app.listen(PORT, () =>
  logger.info(`Server running on: ${ip.address()}:${PORT}`)
);
