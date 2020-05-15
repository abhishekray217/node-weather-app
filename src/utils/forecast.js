const request = require("request");
var os = require("os");


const forecast = (latitude, longitude, callback) => { 

    const url = "http://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid=7a820c84d8723b5d35c0355f6e4ce02d"

    request({url,json:true},(error,{body})=>{

        if (error){
            callback("Unable to cnnect to weather service",undefined)
        }else if(body.message){
            callback("Unable to find location",undefined);
        }else{
            const stringToReturn = `It is currently ${(body.main.temp)} degree celcius.
                                    The maximum temprature will be  ${body.main.temp_max}. 
                                    The minimum temprature will be ${body.main.temp_min}. 
                                    The wind speed will be ${body.wind.speed}.`;
            callback(undefined, stringToReturn);
        }
    });


};




module.exports = forecast;