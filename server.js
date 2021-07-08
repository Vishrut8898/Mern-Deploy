const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')
const PORT = process.env.PORT || 5000

const app = express()

app.use(bodyParser.json())
app.use(cors())

// mongoose
mongoose.connect('mongodb+srv://mern:mern@cluster0.1wha3.mongodb.net/moviesDB?retryWrites=true&w=majority', { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true })
.then(() => console.log('Database Connected'))

// database schema
const movieSchema = mongoose.Schema({
    title: String,
    genre: String,
    year: String
})

const Movie = mongoose.model("Movie", movieSchema)

// API Routes
app.get('/movies', async (req, res) => {
    await Movie.find().then((movies) => res.json(movies))
})

app.post('/addmovie', async (req, res) => {
    const newMovie = new Movie({
        title: req.body.title,
        genre: req.body.genre,
        year: req.body.year,
    })

    try {
        await newMovie.save()
        .then(() => console.log('Movie Added'))
    } catch (err) {
        console.log(err)
    }
})

app.delete('/delete/:id', async (req, res) => {
    await Movie.findByIdAndDelete({ _id: req.params.id })
    .then(() => console.log('Item Deleted'))
    .catch(err => console.log(err))
})

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`)
})