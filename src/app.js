const path = require("path");

const express = require("express");
const app = express();

const hbs = require("hbs")
//Weather
const request = require("request");
const geoCode = require("./utils/geoCode");
const forecast = require("./utils/forecast");

//Define paths
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials")

//setup handlebars engine and views
app.set("view engine","hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath)

//setup static directory to load
app.use(express.static(publicDirectory ));


app.get("",(req,res)=>{
    res.render("index",{
        title:"Weather app",
        name :"ABHISHEK"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: "ABHISHEK"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        helpText: "This is some help text",
        name:"ABHISHEK"
    })
})

app.get("/weather", (req, res) => {
    if(!req.query.address){
        return res.send({
            error:"You must provide address"
        })
    }
    geoCode(req.query.address, (error, { latitude, longitude, location } = {} ) => {
        if (error) {
            return res.send({error});
        } else {
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({error});
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                });
            });
        }

    });
    
});

app.get("/product",(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"you must provide a search term"
        })
    }
    console.log(req.query.search);
    res.send({
        products:[]
    })
})

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "ABHISHEK",
        errorMessage: "Help article not Found"
    })
});
app.get("*",(req,res)=>{
    res.render("404",{
        title:"404",
        name:"ABHISHEK",
        errorMessage:"Page not found"
    })
});

 app.listen(3000,()=>{
     console.log("Server is up on port 3000.");
 });