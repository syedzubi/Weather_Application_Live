const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const weathercode = require('./utils/weathercode')
const geocode = require('./utils/geocode')

//Heroku Port Number
const port = process.env.PORT || 3000
// Define path for Express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engines and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirPath))

app.get('',(req,res)=>{
  res.render('index', {
    name : 'Syed Zubair',
    title : 'Weather'
  })
})

app.get('/about',(req,res)=>{
  res.render('about',{
    name : "Syed Zubair",
    title : "My Profile Picture"
  })
})

app.get('/help',(req,res)=>{
  res.render('help',{
    name : 'Help',
    title : 'Help Page',
    help_message : 'This is a message being called from backend help '
  })
})

//static means that the resources will not change and they are placed under the public folder


app.get('/weather',(req,res)=>{
  if(!req.query.address){
    return res.send({
      Error: 'You must provide an address'
    })
  }
  geocode(req.query.address, (error,{latitude,longitude,location}={})=>{
    if(error){
      return res.send({
        Error: error
      })
    }
    weathercode(latitude , longitude, (error, forecastData) => {
      if(error){
        return res.send({
          Error: error
        })
      }
      res.send({
        Forecast : forecastData,
        Location : location,
        Address : req.query.address
      })
      })
    })
})

app.get('/products',(req,res)=>{
  if (!req.query.search){
    return res.send({
      error: 'You must provide search term'
    })
  }
  console.log(req.query.search)
  res.send({
    products : []
  })
})

app.get('/help/*',(req,res)=>{
  res.render('404',{
    name : 'Syed Zubair',
    title : 'help 404 page',
    ErrorMessage : 'Help article not found'
  })
})

app.get('*',(req,res)=>{
  res.render('404',{
    name : 'Syed Zubair',
    title : '404',
    ErrorMessage : 'Page not found'
  })
})
//common development code we listen on 3000 
app.listen(port, ()=>{
    console.log('Server started successfully on port '+port)
})