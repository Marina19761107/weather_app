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
import { dashboardController } from "./controllers/dashboard-controller.js";
import { weatherTopController } from "./controllers/weather-top-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { stationlistController } from "./controllers/stationlist-controller.js";

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
router.get("/dashboard", dashboardController.index); //Dashboard page
router.post("/dashboard/addstation", dashboardController.addStation); //Add new station
router.get("/dashboard/deletestation/:id", dashboardController.deleteStation); //Delete station

//Station details page
router.get("/station/:id", stationlistController.index); //View specific station
router.post("/station/:id/addreport", stationlistController.addReport); //Add weather report
router.post("/station/:id/update", dashboardController.updateStationDetails); //Update station title/location
router.post("/station/:id/auto-report", dashboardController.autoGenerateReport); //Add live weather data from openWeather

//Report management
router.get(
  "/station/:stationid/deletereport/:reportid",
  stationlistController.deleteReport
); //Delete report
router.get(
  "/station/:stationid/editreport/:reportid",
  stationlistController.editReport
); //Load edit report form
router.post(
  "/station/:stationid/updatereport/:reportid",
  stationlistController.updateReport
); //Submit edit report

// Controller to render the Weather Top view
router.get("/weatherTop", weatherTopController.index);
