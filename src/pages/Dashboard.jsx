import { useMemo, useState } from 'react';
import ListItem from '../components/ListItem';
import RatingsDropdown from '../components/RatingsDropdown';
import ImdbSlider from '../components/ImdbSlider';
import BroadStat from '../components/BroadStat';
import PieChart from '../components/PieChart';
import BarGraph from '../components/BarGraph';
import '../styles/slider.css';

// The Dashboard component now accepts props
const Dashboard = ({ movies, isLoading }) => {
  // All fetching logic and movie state has been removed.
  const [minImdbFilter, setMinImdbFilter] = useState(0);
  const [maxImdbFilter, setMaxImdbFilter] = useState(10);
  const [ratingFilter, setRatingFilter] = useState("any");
  const [includeNA, setIncludeNA] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleRatingChange = (rating) => setRatingFilter(rating);
  const handleNAToggle = () => setIncludeNA(!includeNA);

  const filteredMovies = useMemo(() => {
    return movies.filter(movie => {
      const imdbMatches = (minImdbFilter === 0 && maxImdbFilter === 10) || (movie.imdb !== null && !isNaN(movie.imdb) && movie.imdb >= minImdbFilter && movie.imdb <= maxImdbFilter);
      const naCategoryMatches = includeNA || (movie.imdb !== null && !isNaN(movie.imdb) && movie.boxoffice !== null && !isNaN(movie.boxoffice));
      const searchMatches = searchQuery === "" || (movie.title && movie.title.toLowerCase().includes(searchQuery.toLowerCase()));
      const mpaaRatingMatches = ratingFilter === "any" || (movie.rated && movie.rated.toLowerCase() === ratingFilter.toLowerCase());
      return imdbMatches && naCategoryMatches && searchMatches && mpaaRatingMatches;
    });
  }, [movies, minImdbFilter, maxImdbFilter, searchQuery, ratingFilter, includeNA]);

  const averageImdbFiltered = useMemo(() => {
    const imdbMovies = filteredMovies.filter(m => m.imdb !== null && !isNaN(m.imdb));
    if (imdbMovies.length === 0) return "N/A";
    const imdbSum = imdbMovies.reduce((sum, movie) => sum + movie.imdb, 0);
    return (imdbSum / imdbMovies.length).toFixed(2);
  }, [filteredMovies]);

  const averageBoxOfficeFiltered = useMemo(() => {
    const boxOfficeMovies = filteredMovies.filter(m => m.boxoffice !== null && !isNaN(m.boxoffice));
    if (boxOfficeMovies.length === 0) return "N/A";
    const boxOfficeSum = boxOfficeMovies.reduce((sum, movie) => sum + movie.boxoffice, 0);
    return `$${(boxOfficeSum / boxOfficeMovies.length).toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
  }, [filteredMovies]);

  return (
    <div className='dashboard-content'>
      <div className="graphs-container">
        <PieChart movies={filteredMovies} />
        <BarGraph movies={filteredMovies} />
      </div>
      <div className='broad-stats-container'>
        <BroadStat
          stat={movies.length.toLocaleString()}
          title="Total Movies Fetched"
        />
        <BroadStat
          stat={averageBoxOfficeFiltered}
          title="Average Box Office (Filtered)"
        />
        <BroadStat
          stat={averageImdbFiltered}
          title="Average IMDb Score (Filtered)"
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
            &#128269;
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
            ratings={["Any", "G", "PG", "PG-13", "R", "Not Rated", "N/A"]}
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
        {isLoading ? (
          <p className="loading-message">Loading movies...</p>
        ) : filteredMovies.length === 0 ? (
          <p className="no-results-message">No movies match your current filters.</p>
        ) : (
          filteredMovies.map((movie) => (
            <ListItem key={movie.imdbID} {...movie} />
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;