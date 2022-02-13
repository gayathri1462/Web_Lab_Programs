request = require('request');
//const url="http://api.weatherstack.com/current?access_key=1b0972b2d4eba857657bd66af59e9e81&query=New%20York&units=f";
const url = "http://api.weatherstack.com/current?access_key=1b0972b2d4eba857657bd66af59e9e81&query=India&units=f";
request({ url: url }, (err, response) => {
    const data = JSON.parse(response.body);
    console.log("The current temperature is " + data.current.temperature);
    console.log("country is", data.location.country);
});