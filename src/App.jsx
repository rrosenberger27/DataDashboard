import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import MovieDetailView from './pages/MovieDetailView';
import './App.css';

const apiKey = import.meta.env.VITE_APP_API_KEY;

const searchTerms = [
  "action", "adventure", "comedy", "drama", "horror", "sci-fi", "thriller",
  "romance", "family", "animation", "fantasy", "mystery", "crime", "biography",
  "history", "war", "western", "musical", "sport", "documentary", "short",
  "true", "life", "world", "city", "love", "hero", "journey", "dream", "future"
];

const shuffleArray = (array) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
};

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchMovies = async () => {
      if (!apiKey) {
        console.error("OMDB API Key is missing.");
        setIsLoading(false);
        return;
      }
      try {
        const allMovieDetailPromises = [];
        for (let i = 0; i < searchTerms.length; i++) {
          const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerms[i]}&type=movie&page=1`;
          const res = await fetch(url);
          const data = await res.json();
          if (data.Response === "True" && data.Search) {
            for (const movie of data.Search) {
              const movieDetailUrl = `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`;
              allMovieDetailPromises.push(
                fetch(movieDetailUrl)
                  .then(response => response.json())
                  .then(movieJson => ({
                    imdbID: movieJson.imdbID,
                    title: movieJson.Title || null,
                    year: movieJson.Year || null,
                    genre: movieJson.Genre || null,
                    imdb: parseFloat(movieJson.imdbRating) || null,
                    rated: movieJson.Rated || null,
                    boxoffice: movieJson.BoxOffice && movieJson.BoxOffice !== 'N/A' ? parseFloat(movieJson.BoxOffice.replace(/[^0-9.-]+/g, "")) : null,
                  }))
                  .catch(error => {
                    console.error("Error fetching movie details:", error);
                    return null;
                  })
              );
            }
          }
        }
        const detailedMovies = (await Promise.all(allMovieDetailPromises)).filter(Boolean);
        const uniqueMoviesMap = new Map(detailedMovies.map(movie => [movie.imdbID, movie]));
        setMovies(shuffleArray(Array.from(uniqueMoviesMap.values())));
      } catch (error) {
        console.error("Error fetching movies: ", error);
      } finally {
        setIsLoading(false); 
      }
    };
    fetchMovies();
  }, []); 

  return (
    <div className="app-main-container">
      <NavBar />
      <Routes>
        <Route path="/" element={<Dashboard movies={movies} isLoading={isLoading} />} />
        <Route path="/about" element={<About />} />
        <Route path="/movie/:imdbID" element={<MovieDetailView />} />
      </Routes>
    </div>
  );
}

export default App;