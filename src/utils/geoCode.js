const request = require("request");

const geoCode = (address, callback) => {

    const geoCodeUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoidGl0YW5yeXVnYSIsImEiOiJjazl6cXBqcjcwOWI1M2VwbWFyY3M0MGJxIn0.zbHtWpQib1TMQNTIXgqRAg&limit=1";

    request({ url: geoCodeUrl, json: true }, (error,{body}) => {

        if (error) {
            callback("Unable to connect to location services!", undefined);
        } else if (body.features.length === 0) {
            callback("Place not Found. Try another search.");

        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
};


module.exports = geoCode;