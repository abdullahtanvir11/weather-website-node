const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ae90ba769ae0fec1fbe6632575c37b50&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)
  request({url, json:true},(error,{ body} = {}) => {
    if(error){
        callback('There is no internet connection!',undefined)
    }else if(body.error){
        callback('Unable to find match',undefined)
    }else{
        callback(undefined,body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out.It feels like ' + body.current.feelslike + ' degrees out')    
    }
})
}

module.exports = forecast