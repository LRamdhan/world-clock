import express from "express";
import timezoneController from "../controller/timezoneController.js";

const timezoneRoutes = express.Router()

timezoneRoutes.get("/timezone", timezoneController.searchTimezone)
timezoneRoutes.get("/time", timezoneController.searchTime)

export default timezoneRoutes