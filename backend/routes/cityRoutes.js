import express from "express";
import cityController from "../controller/cityController.js";

const cityRoutes = express.Router()

cityRoutes.get("/", cityController.search)

export default cityRoutes