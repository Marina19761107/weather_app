import express from "express";
import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { weatherTopController } from "./controllers/weather-top-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { stationlistController } from "./controllers/stationlist-controller.js";

export const router = express.Router();

router.get("/", accountsController.index);

router.get("/login", accountsController.login);
router.get("/signup", accountsController.signup);
router.post("/register", accountsController.register);
router.post("/authenticate", accountsController.authenticate);


router.get("/dashboard", dashboardController.index);
router.post("/dashboard/addstation", dashboardController.addStation); 
router.get("/dashboard/deletestation/:id", dashboardController.deleteStation);
router.get("/station/:id", stationlistController.index);
router.post("/station/:id/addreport", stationlistController.addReport);
router.get("/station/:stationid/deletereport/:reportid", stationlistController.deleteReport);

router.get("/about", aboutController.index);
router.get("/logout", accountsController.logout);

router.get("/weatherTop", weatherTopController.index);

