import { useState } from 'react'
import './App.css'

function App() {
  //first filtered list here will be just to ensure each item has the category
//   http://www.omdb.api.com/?apikey=YOUR_API_KEY&s=star&type=movie&page=1
// http://www.omdb.api.com/?apikey=YOUR_API_KEY&s=star&type=movie&page=2
// ...
// http://www.omdb.api.com/?apikey=YOUR_API_KEY&s=star&type=movie&page=30
// then have to request initial movie like this:
// https://www.omdbapi.com/?t=whiplash&apikey=apikey --- make sure don't run a lot otherwise will burn all requests (only have 3 a day if do this way) --- or just go simple and don't request the individual movies (would only use 20 requests per as opposed to 220)


//filter method - takes in genre, Imdb score, rating, year released

  return (
    <div>
      {/* NAV BAR
      TITLE (SERIES DASHBOARD)
      SIDEBAR - 3 broad categories - number of results
      THE DASHBOARD ITSELF
      search bar, filters (genre, rating, decade released, Imdb score-slider on both ends)   */}

    </div>
  )
}

export default App
