const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { title } = require('process')

const app = express()

//define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res) => {
    res.render('index',{
        title: 'Weather app',
        name: 'Abdullah'
    })
})

app.get('/about',(req, res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Abdullah',
        partner: 'Muda'
    })
})

app.get('/help',(req, res) => {
    res.render('help',{
        helpText: 'This is a help message',
        title: 'Help' ,
        name: 'Abdullah ' 
    })
})

app.get('/weather',(req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide an address!'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location} = {})=>{
    
        if(error){
            return res.send({error})
        }
            forecast(latitude,longitude, (error, forecastData) => {
                 if(error){
                  return res.send({error})
                }
                res.send({
                   forecast: forecastData,
                   location,
                   address: req.query.address
                })   
            })
    
    })

    
})

app.get('/help/*', (req,res) =>{
    res.render('404',{
        title: '404',
        errorMessage: 'Help article not Found!',
        name : 'Noureen'
    })
})

app.get('*', (req,res) =>{
    res.render('404',{
        title: '404',
        errorMessage: 'Page not Found!',
        name : 'Noureen'
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000.')
})