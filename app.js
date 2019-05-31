const yargs = require("yargs");
const axios = require("axios");

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: "address",
            describe: "address to fetch weather for",
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCEblkdFRMzOgVUkA0ciIsW-jR5vrnxUUc&address=${encodedAddress}`;

axios.get(geocodeURL).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find the address')
    }

    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherURL = `https://api.darksky.net/forecast/786e5c72220139da7e0e3f87cd8f4c32/${lat},${lng}`;

    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherURL)
}).then((response) => {
    var summary = "";
    var temperature = response.data.currently.temperature;
    var humidity = response.data.currently.humidity;

    console.log(`Its currently: ${temperature}F degrees. The humidity is: ${humidity}%`)
}).catch((error) => {
    if (error.code === 'ENOTFOUND') {
        console.log(error)
    }
});

