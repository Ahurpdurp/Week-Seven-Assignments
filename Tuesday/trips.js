const express = require("express")
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.engine('mustache',mustacheExpress())
app.set('views','./views')
app.set('view engine','mustache')



let trips = []

app.get('/add-trip', (req,res) => {
    res.render('add-trip')
})

app.post('/add-trip', (req, res) => {
    let tripName = req.body.tripName
    let tripImage = req.body.tripImage
    let tripStart = req.body.tripStart
    let tripEnd = req.body.tripEnd

    let tripAdd = {
        tripName: tripName,
        tripImage: tripImage,
        tripStart: tripStart,
        tripEnd: tripEnd
    }

    trips.push(tripAdd)
    res.render('trip-added-page', {tripList: tripAdd})
})

app.get('/trip-added-page', (req,res) => {
    res.render('trip-added-page')
})

app.get('/view-trips', (req, res) => {
    res.render('view-trips',{tripList: trips})
})

app.post('/view-trips', (req, res) => {
    let tripName = req.body.tripNameInput
    let updateTrip = trips.filter(place => place.tripName == tripName)
    res.render(`update-trip`, {updateTrip: updateTrip})
})

app.post('/delete', (req,res) => {
    let tripName = req.body.tripNameInput
    let deleteTrip = trips.filter(place => place.tripName != tripName)
    trips = deleteTrip
    res.redirect('/view-trips')
})

app.post('/update-trip', (req, res) => {
    let tripName = req.body.tripName
    let tripImage = req.body.tripImage
    let tripStart = req.body.tripStart
    let tripEnd = req.body.tripEnd
    for(i = 0; i < trips.length; i ++){
        if(trips[i].tripName = tripName){
            trips[i].tripImage = tripImage
            trips[i].tripStart = tripStart
            trips[i].tripEnd = tripEnd
        }
    }
    res.redirect('view-trips')
})

app.post('/sort', (req,res) => {
    trips.sort(function(a,b){
        return new Date(b.tripStart) - new Date(a.tripEnd);
      });
    res.redirect('view-trips')
})

app.post('/search', (req,res) => {
    let searchName = req.body.searchName
    let tempItems = trips.filter(place => place.tripName == searchName)
    res.render('view-trips', {tripList:tempItems})
})

app.post('/viewAll', (req, res) => {
    res.render('view-trips', {tripList:trips})
})

app.listen(3000, () => {
    console.log('server running')
})