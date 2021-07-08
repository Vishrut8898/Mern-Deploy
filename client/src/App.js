import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [movies, setMovies] = useState([
    {
      title: '',
      genre: '',
      year: ''
    }
  ])

  useEffect(() => {
    fetch('/movies').then(res => {
      if (res.ok) {
        return res.json()
      }
    }).then(jsonRes => setMovies(jsonRes))
      .catch(err => console.log(err))
  })

  const [movie, setMovie] = useState({
    title: '',
    genre: '',
    year: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setMovie(prevInput => {
      return ({
        ...prevInput,
        [name]: value
      })
    })
  }

  const addMovie = (e) => {
    e.preventDefault()
    const newMovie = {
      title: movie.title,
      genre: movie.genre,
      year: movie.year
    }

    axios.post('/addmovie', newMovie)
    alert('Movie Added')
    setMovies([{
      title: '',
      genre: '',
      year: ''
    }])
  }

  const deleteMovie = (myId) => {
    axios.delete('/delete/' + myId)
    alert('Movie Deleted')
  }

  return (
    <div className="App">
      <h1>FrontEnd</h1>
      <form>
        <input onChange={handleChange} type="text" name="title" value={movie.title} />
        <input onChange={handleChange} type="text" name="genre" value={movie.genre} />
        <input onChange={handleChange} type="text" name="year" value={movie.year} />
        <button onClick={addMovie}>ADD MOVIE</button>
      </form>
      {movies.map((movie, index) => {
        return (
          <div key={index}>
            <h4>{ movie.title }</h4>
            <p>{ movie.genre }</p>
            <p>{ movie.year }</p>
            <button onClick={() => deleteMovie(movie._id)}>Delete</button>
          </div>
        )
      })}
    </div>
  );
}

export default App;
