const express = require("express")
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const app = express()
const session = require('express-session')
app.use(bodyParser.urlencoded({ extended: false }))
app.engine('mustache',mustacheExpress())
app.set('views','./views')
app.set('view engine','mustache')
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }))

app.use(express.static('styles'))
const loginRouter = require('./login')
app.use('/login',loginRouter)

let trips = []  

users = [
    {
        username:'Paul',
        password:'Wu'
}
]
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
        tripEnd: tripEnd,
        tripUser: req.session.userID
    }

    trips.push(tripAdd)
    res.render('trip-added-page', {tripList: tripAdd})
})

app.get('/trip-added-page', (req,res) => {
    res.render('trip-added-page')
})

app.get('/view-trips', (req, res) => {
    let userList = trips.filter(user => user.tripUser == req.session.userID)
    res.render('view-trips',{tripList: userList})
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

app.post('/logout', (req, res) => {
    req.session.userID = null
    res.redirect('/login')
})

app.post('/search', (req,res) => {
    let searchName = req.body.searchName
    let tempItems = trips.filter(place => place.tripName == searchName)
    res.render('view-trips', {tripList:tempItems})
})

app.post('/viewAll', (req, res) => {
    res.render('view-trips', {tripList:trips})
})





app.get('/login', (req,res) => {
    res.render('login')
})

app.post('/login', (req,res) => {
    let username = req.body.username
    let password = req.body.password
    let userAuth = users.find(user => user.username == username && user.password == password)
    if(userAuth){
        if(req.session){
            req.session.userID = userAuth.username
            res.redirect('/view-trips')
        }
    }
    else{
        res.render('login',{message: "Wrong credentials. Try again!"})
    }
})

app.post('/login/newAcc', (req, res) => {
    let newUser = req.body.newUser
    let newPass = req.body.newPass
    if(!users.find(x => x.username == newUser)){
        let newUserEntry = {
            username:newUser,
            password:newPass
        }
        users.push(newUserEntry)
        var message = 'Welcome, ' + newUser + ". Sign in to add trips!"
    }
    else{
        var message = 'User already exists. Try another username :\')'
    }
    res.render('login', {message:message})
})

app.listen(3000, () => {
    console.log('server running')
})