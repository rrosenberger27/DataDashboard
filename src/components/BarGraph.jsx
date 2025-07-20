import React, {useState, useMemo} from "react";
import '../styles/barGraph.css'

const BarGraph = ({ movies }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const moviesPerPage = 8;

  const sortedMovies = useMemo(() => {
    return [...movies]
      .filter(movie => movie.imdb !== null && !isNaN(movie.imdb))
      .sort((a, b) => b.imdb - a.imdb);
  }, [movies]);

  const totalPages = Math.ceil(sortedMovies.length / moviesPerPage);

  const handleNext = () => {
    setCurrentPage(prev => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentPage(prev => (prev - 1 + totalPages) % totalPages);
  };

  const startIndex = currentPage * moviesPerPage;
  const currentMovies = sortedMovies.slice(startIndex, startIndex + moviesPerPage);

  return (
    <div className="bar-graph-container">
      <div className="bar-graph-header">
        <h3 className="chart-title">Top Movies by IMDb Rating</h3>
        <p> Page {currentPage+1} / {totalPages}</p>
        <div className="pagination-controls">
          <button onClick={handlePrev} disabled={totalPages <= 1}>&#8592;</button>
          <button onClick={handleNext} disabled={totalPages <= 1}>&#8594;</button>
        </div>
      </div>
      <div className="bar-graph">
        {currentMovies.map(movie => (
          <div key={movie.imdbID} className="bar-item">
            <span className="movie-title-graph">{movie.title}</span>
            <div className="bar-wrapper">
              <div
                className="bar"
                style={{ width: `${(movie.imdb / 10) * 100}%` }}
              >
                <span className="bar-label">{movie.imdb.toFixed(1)}</span>
              </div>
            </div>
          </div>
        ))}
        {currentMovies.length === 0 && <p className="no-data-message">No movie data to display.</p>}
      </div>
    </div>
  );
};

export default BarGraph;