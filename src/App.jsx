import { useState } from 'react'
import './App.css';
import NavBar from './components/NavBar';
import Dashboard from './components/DashBoard';


function App() {
  
//   http://www.omdb.api.com/?apikey=YOUR_API_KEY&s=star&type=movie&page=1
// http://www.omdb.api.com/?apikey=YOUR_API_KEY&s=star&type=movie&page=2
// ...
// http://www.omdb.api.com/?apikey=YOUR_API_KEY&s=star&type=movie&page=20
// then have to request initial movie like this:
// https://www.omdbapi.com/?t=whiplash&apikey=apikey 

//filter method - takes in genre, Imdb score, rating, year released --> each one can also be null 

// OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=<api key>
// Poster API: http://img.omdbapi.com/?i=tt3896198&h=600&apikey=<api key>



  return (
    <div>
      <NavBar/>
      <Dashboard/>
      {/* NAV BAR
      TITLE (SERIES DASHBOARD)
      SIDEBAR - 3 broad categories - number of results, range of the movies (Movies 1920 - 2023)
      THE DASHBOARD ITSELF
      search bar, filters (genre, rating, decade released, Imdb score-slider on both ends)   */}

    </div>
  )
}

export default App
