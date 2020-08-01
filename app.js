const express = require('express')
const https =require('https')
const app = express()
const bodyparser = require('body-parser')

app.use(bodyparser.urlencoded({extended: true}))

app.get("/",(req,res) => {
res.sendFile(__dirname + "/index.html")
})

app.post("/",(req,res)=>{
var query = req.body.cityName;
var apikey = "f5be3506d04c13731bed8b1ad466a045";
var unit = "metric";
const url="https://api.openweathermap.org/data/2.5/weather?q=" +query+ "&appid="+apikey+"&units="+unit+"";
https.get(url, (response) => {

    console.log(response.statusCode)

    response.on("data",(data) => {
        const wheatherdata = JSON.parse(data)
        console.log(wheatherdata)
        const desc = wheatherdata.name
        console.log(desc)
        const temp = wheatherdata.main.temp
        console.log(temp)
        const description=wheatherdata.weather[0].description
        console.log(description)
        const icon = wheatherdata.weather[0].icon
        const imageUrl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
        console.log(icon)
    res.write("<h1>The temp in " + desc + " is " + temp + " degree celcius</h1>")
    res.write("<p>The Weather is curently " +description+ "</p>")
    res.write("<img src="+imageUrl+">")   
    res.send() 
    })
    
})
})


app.listen(3000,() => {
    console.log("server is running on port 3000.")
})