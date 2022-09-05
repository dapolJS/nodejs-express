const request = require("request");

const geocode = (address, callback) => {
  const urlPlaceName = `http://api.positionstack.com/v1/forward?access_key=6b5a217d0e57c24b10c0ca38ff5713c6&query=
    ${encodeURIComponent(address)}`;

  request({ url: urlPlaceName, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!");
    } else if (body.data.length === 0) {
      callback("Unable to find location, try another search.");
    } else {
      callback(undefined, {
        latitude: body.data[0].latitude,
        longitude: body.data[0].longitude,
        label: `${body.data[0].label}`,
      });
    }
  });
};

module.exports = geocode;
