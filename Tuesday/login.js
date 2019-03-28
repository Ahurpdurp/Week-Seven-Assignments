const express = require('express')
const router = express.Router()

users = [
    {
        username:'Paul',
        password:'Wu'
}
]

router.get('/', (req,res) => {
    res.render('login')
})

router.post('/', (req,res) => {
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

router.post('/newAcc', (req, res) => {
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


module.exports = router