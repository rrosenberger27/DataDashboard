import { useEffect, useMemo, useReducer, useState } from 'react'
import './App.css';
import NavBar from './components/NavBar';
import ListItem from './components/ListItem';
import RatingsDropdown from './components/RatingsDropdown';
import ImdbSlider from './components/ImdbSlider';
import BroadStat from './components/BroadStat';
import './styles/slider.css';
import.meta.env.VITE_APP_API_KEY

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

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  };


function App() {

  const [movies, setMovies] = useState([]);
  const [totalMovies, setTotalMovies] = useState(0);

  const [minImdbFilter, setMinImdbFilter] = useState(0);
  const [maxImdbFilter, setMaxImdbFilter] = useState(10);

  const [ratingFilter, SetRatingFilter] = useState("any");
  const [includeNA, setIncludeNA] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");

useEffect(() => {
  const fetchMovies = async () => {
    if (!apiKey) {
      console.log(apiKey);
      console.error("OMDB API Key is missing or not set.");
      return;
    }
    try {
      let currMovies = [];
      const allMovieDetailPromises = []; // Array to hold promises for movie details

      for (let i = 1; i <= 30; i++) {
        const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerms[i]}&type=movie&page=1`;
        const res = await fetch(url);

        if (!res.ok) {
          console.log("Search API error, trying another search...");
          continue;
        }

        const data = await res.json();
        if (data.Response === "False" || !data.Search) {
          console.log(`No results found for page ${i} or API error: ${data.Error}`);
          continue;
        }

        for (const movie of data.Search) {
          const movieDetailUrl = `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`;
          allMovieDetailPromises.push(
            fetch(movieDetailUrl)
              .then(response => {
                if (!response.ok) {
                  throw new Error(`Failed to get movie details for: ${movie.Title}`);
                }
                return response.json();
              })
              .then(movieJson => {
                // Process movieJson into your movieObject here
                return {
                  poster: movieJson.Poster === 'N/A' ? null : movieJson.Poster,
                  title : movieJson.Title || null,
                  year: movieJson.Year || null,
                  genre : movieJson.Genre || null,
                  imdb : parseFloat(movieJson.imdbRating) || null,
                  rated: movieJson.Rated || null,
                  boxoffice: movieJson.BoxOffice && movieJson.BoxOffice !== 'N/A' ? parseFloat(movieJson.BoxOffice.replace(/[^0-9.-]+/g, "")) : null,
                };
              })
              .catch(error => {
                console.error("Error fetching movie details:", error);
                return null; // Return null or some placeholder for failed fetches
              })
          );
        }
      }

      // Wait for all movie detail fetches to complete
      const detailedMovies = await Promise.all(allMovieDetailPromises);
      // Filter out any nulls from failed fetches
      currMovies = detailedMovies.filter(movie => movie !== null);
      const shuffledMovies = shuffleArray(currMovies);
      setMovies(shuffledMovies);
      setTotalMovies(currMovies.length);

    } catch (error) {
      console.error("error in fetching movies: ", error);
    }
  };
  fetchMovies();

}, []);


 const handleSearchSubmit = (e) => {
    e.preventDefault(); 
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  }

const handleRatingChange = rating => SetRatingFilter(rating);

const handleNAToggle = () => setIncludeNA(!includeNA);

const filteredMovies = useMemo(() => {
    return movies.filter(movie => {
      const imdbMatches =(minImdbFilter === 0 && maxImdbFilter === 10) || (movie.imdb !== null && !isNaN(movie.imdb) && movie.imdb >= minImdbFilter && movie.imdb <= maxImdbFilter);

      const naCategoryMatches = includeNA || (movie.imdb !== null && !isNaN(movie.imdb) && movie.boxoffice !== null && !isNaN(movie.boxoffice));

      const searchMatches = searchQuery === "" || (movie.title && movie.title.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const mpaaRatingMatches = ratingFilter === "any" || (movie.rated && movie.rated.toLowerCase() === ratingFilter.toLowerCase());

      return imdbMatches && naCategoryMatches && searchMatches && mpaaRatingMatches;
    });
}, [movies, minImdbFilter, maxImdbFilter, searchQuery, ratingFilter, includeNA]);

const averageImdbFiltered = useMemo(() => {
    let imdbSum = 0;
    let imdbCount = 0;
    filteredMovies.forEach(movie => {
      if (movie.imdb !== null && !isNaN(movie.imdb)) {
        imdbCount++;
        imdbSum += movie.imdb;
      }
    });
    return imdbCount ? imdbSum / imdbCount : "N/A";
  }, [filteredMovies]); 

  const averageBoxOfficeFiltered = useMemo(() => {
    let boxOfficeSum = 0;
    let boxOfficeCount = 0;
    filteredMovies.forEach(movie => {
      if (movie.boxoffice !== null && !isNaN(movie.boxoffice)) {
        boxOfficeCount++;
        boxOfficeSum += movie.boxoffice;
      }
    });
    return boxOfficeCount > 0 ? boxOfficeSum / boxOfficeCount : "N/A";
  }, [filteredMovies]);

  return (
    <div className="app-main-container">
      <NavBar />
      <div className='dashboard-content'>
        <div className='broad-stats-container'>
          <BroadStat
            stat={totalMovies.toLocaleString()} 
            title="Total Movies Fetched" 
          />
          <BroadStat
            stat={averageBoxOfficeFiltered !== "N/A" ? `$${averageBoxOfficeFiltered.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}` : "N/A"}
            title="Average Box Office Earning (Filtered)" 
          />
          <BroadStat
            stat={averageImdbFiltered !== "N/A" ? averageImdbFiltered.toFixed(2) : "N/A"}
            title="Average Imdb Score (Filtered)" 
          />
        </div>
        <div className='search-features-container'>
          <form onSubmit={handleSearchSubmit} className='search-form'>
            <input
              type='text'
              placeholder='Search titles...'
              value={searchQuery}
              onChange={handleSearchChange}
              className='search-input'
            />
            <button type='submit' className='search-button'>
              &#128269; {/* Magnifying Glass Icon */}
            </button>
          </form>

          <div className='filter-controls'>
            <label className='na-checkbox-label'>
              <input
                type='checkbox'
                checked={includeNA}
                onChange={handleNAToggle}
                className='na-checkbox'
              />
              Include Titles with N/A categories
            </label>

            <RatingsDropdown
              selectedRating={ratingFilter}
              onRatingChange={handleRatingChange}
              ratings={["Any", "G", "PG", "PG-13", "R"]}
            />

            <div className='imdb-slider-section'>
              <label className='slider-label'>IMDb Rating Range:</label>
              <div className='slider-values'>
                <span>Min: {minImdbFilter.toFixed(1)}</span>
                <span>Max: {maxImdbFilter.toFixed(1)}</span>
              </div>
              <ImdbSlider
                min={0}
                max={10}
                step={0.1}
                minValue={minImdbFilter}
                maxValue={maxImdbFilter}
                onMinChange={setMinImdbFilter}
                onMaxChange={setMaxImdbFilter}
              />
            </div>
          </div>
        </div>

        <div className='movie-list-container'>
          <h2 className="movie-list-heading">Filtered Movies ({filteredMovies.length})</h2>

          {filteredMovies.length === 0 && movies.length > 0 && (
            <p className="no-results-message">No movies match your current filters.</p>
          )}
          {movies.length === 0 && (
            <p className="loading-message">Loading movies...</p>
          )}
          {filteredMovies.map((movie, index) => (
            <ListItem key={movie.imdbID || index} {...movie} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
