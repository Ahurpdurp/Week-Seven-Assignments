const express = require("express")
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const multer = require('multer')
const app = express()
const movieRoute = require('./routes/movies')
const apiRoute = require('./routes/api')
app.use(bodyParser.urlencoded({ extended: false }))
app.engine('mustache',mustacheExpress())
app.set('views','./views')
app.set('view engine','mustache')
app.use(express.static('styles'))
app.use('/movies',movieRoute)
app.use('/api',apiRoute)
app.use(multer({dest:'./imageUploads/'}).any())

movies = [
    {
        title: "The Matrix",
        description: "This is awesome!",
        genre: "Action",
        postURL: "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg"
    },
    {
        title: "Lord of the Rings",
        description: "Not really a movie but ok",
        genre: "Fantasy",
        postURL: "https://upload.wikimedia.org/wikipedia/en/c/c3/The_Lord_of_the_Rings_trilogy_poster.jpg"
    
    },
    {
        title: "Shazam",
        description: "Wait there are two captain marvels?!",
        genre: "Superhero",
        postURL: "https://upload.wikimedia.org/wikipedia/en/6/60/Shazam%21_theatrical_poster.jpg"
    
    }
    ]

app.listen(3000, () => {
    console.log("Running server...")
})

