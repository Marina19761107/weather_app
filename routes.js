/* Import controllers objects.
   Each controller handles the logic for a specific part of the application:
   - accountsController: login, signup, authentication
   - dashboardController: managing stations
   - stationlistController: handling individual station pages and reports
   - weatherTopController: auto weather updates
   - aboutController: about page content
*/
import express from "express";
import { accountsController } from "./controllers/accounts-controller.js";
import { stationController } from "./controllers/station-controller.js";
import { weatherTopController } from "./controllers/weather-top-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { reportController } from "./controllers/report-controller.js";

// Create a modular router object
export const router = express.Router();

//Router - find matching controller object
//Router behavior
//Landing pages
router.get("/", accountsController.index); //Start
router.get("/about", aboutController.index); //About page

//Authentication routes
router.get("/login", accountsController.login); //Login form
router.get("/signup", accountsController.signup); //Signup form
router.post("/register", accountsController.register); //Handle signup
router.post("/authenticate", accountsController.authenticate); //Handle login
router.get("/logout", accountsController.logout); //Logout user

//Dasboard routes
router.get("/dashboard", stationController.index); //Dashboard page
router.post("/dashboard/addstation", stationController.addStation); //Add new station
router.get("/dashboard/deletestation/:id", stationController.deleteStation); //Delete station

//Station details page
router.get("/station/:id", reportController.index); //View specific station
router.post("/station/:id/addreport", reportController.addReport); //Add weather report
router.post("/station/:id/update", stationController.updateStationDetails); //Update station title/location
router.post("/station/:id/auto-report", stationController.autoGenerateReport); //Add live weather data from openWeather

//Report management
router.get(
  "/station/:stationid/deletereport/:reportid",
  reportController.deleteReport
); //Delete report
router.get(
  "/station/:stationid/editreport/:reportid",
  reportController.editReport
); //Load edit report form
router.post(
  "/station/:stationid/updatereport/:reportid",
  reportController.updateReport
); //Submit edit report

// Controller to render the Weather Top view
router.get("/weatherTop", weatherTopController.index);
