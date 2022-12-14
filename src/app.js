const express = require("express");
const chalk = require("chalk");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 5555

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to server
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Home page",
    name: "Nala the cat",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Nala the cat",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpMessage: "In case something happens contact support",
    title: "Help",
    name: "Nala the cat",
  });
});

app.get("/help", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/help.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/about.html"));
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }
  geocode(req.query.address, (error, { latitude, longitude, label } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastData,
        location: label,
        address: req.query.address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "please enter search keyword",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    error: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    error: "Sorry page not found",
  });
});

app.listen(port, () => {
  console.log(chalk.cyan(`Server is up on port ${port}`));
});

// launch with nodemon app.js -e js,hbs
