const express = require('express')
const router = express.Router()



router.get('/', (req,res) => {
    res.render('movies', {movieList:movies})
})


router.post('/add', (req, res) => {
    let movieTitle = req.body.movieTitle
    let movieGenre = req.body.movieGenre
    let movieDesc = req.body.movieDesc
    let movieURL = req.body.movieURL
    console.dir(req.body.moviePicture)
    let addedMovie = {
        title: movieTitle,
        description: movieGenre,
        genre: movieDesc,
        postURL: movieURL
    }
    movies.push(addedMovie)
    res.render('movies', {movieList: movies})
})

router.post('/delete', (req,res) => {
    let deleteTitle = req.body.deleteTitle
    let tempList = movies.filter(x => x.title != deleteTitle)
    movies = tempList
    res.render('movies', {movieList: movies})
})

router.get('/movie/:movie', (req, res) => {
    let movieTitle = req.params.movie
    let tempList = movies.filter(x => x.title.toLowerCase().replace(" ", '') == movieTitle.toLowerCase().replace('-', ''))
    res.render('movies', {movieList: tempList})
})

router.get('/genre/:genre', (req, res) => {
    let genreType = req.params.genre
    let tempList = movies.filter(x => x.genre.toLowerCase() == genreType.toLowerCase().replace('-',''))
    res.render('movies', {movieList: tempList})
})


module.exports = router
