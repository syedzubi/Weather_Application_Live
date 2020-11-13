const request = require('request')

const weathercode = (latitude,longitude, callback)=>{
  const url = 'http://api.weatherstack.com/current?access_key=56f426fd2818c9162498c96e6812c97a&query='+latitude+','+longitude+'&limit=1'

  request({url,json:true}, (error,{body})=>{
    if(error){
      callback('Network Error', undefined)
    }
    else if(body.error){
      callback('Data Not available , Try another city', undefined)
    }else{
      callback(undefined,
       "Current Weather is "+body.current.weather_descriptions[0]+" the temperature is "+body.current.temperature+" degrees and it feels like "+body.current.feelslike+" degrees out there. The current time is "+body.current.observation_time
      )
      
    }
  })
}
module.exports = weathercode