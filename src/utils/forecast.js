const request = require("request");
const chalk = require("chalk");

const forecast = (latitude, longitude, callback) => {
  const urlWeather =
    `http://api.weatherstack.com/current?access_key=0a4d0cd2c0185991c8ad45e1a5d260c8&query=` +
    latitude +
    "," +
    longitude;

  request({ url: urlWeather, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services!");
    } else if (body.error) {
      callback("Unable to find location");
    } else {
      callback(
        undefined,
        `It is currently ${body.location.localtime}, Sky seems - ${body.current.weather_descriptions[0]} - ${body.current.temperature} °C, and it feels like ${body.current.feelslike} °C outside.` +
          ` Wind speed is: ${body.current.wind_speed} `
      );
    }
  });
};

module.exports = forecast;
