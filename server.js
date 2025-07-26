//creating web server using Node.js and express
import express from "express"; //Import the express library
import bodyParser from "body-parser"; //Middleware to parse incoming reguest bodies (form data or JSON)
import cookieParser from "cookie-parser"; //Middleware to parse cookies sent by clieants
import fileUpload from "express-fileupload"; //Middleware to handle file uploads
import { engine } from "express-handlebars"; //Templating engine to render dynamic HTML pages
import { router } from "./routes.js"; //import custom  router that define route handlers

//Create an Express app instance, to define a routes and start the server
const app = express();

//middLeware setup
app.use(cookieParser()); // Enable cookie handle
app.use(bodyParser.urlencoded({ extended: false })); //Parse URL-encoded form data
app.use(bodyParser.json()); //Parse JSON request bodies
app.use(express.static("public")); // Serve static files from the 'public' folder
app.use(fileUpload()); // Enable file upload support in forms

//view engine setup
app.engine(
  ".hbs",
  engine({
    extname: ".hbs", //File extension for Handlebars templates
    helpers: {
      eq: (a, b) => a === b, // Custom helper for comparison in templates (cheks equality)
    },
  })
);
app.set("view engine", ".hbs"); // Set Handlebars as the template engine
app.set("views", "./views"); // Set the folder for view templates

//Route handling
app.use("/", router); // Use the imported router for all routes starting from "/"

// Start the server on the specified port (default: 4000)
const listener = app.listen(process.env.PORT || 4000, function () {
  console.log(
    `Todolist started on http://localhost:${listener.address().port}`
  );
});
