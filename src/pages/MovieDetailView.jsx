import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/MovieDetailView.css';

const apiKey = import.meta.env.VITE_APP_API_KEY;

const MovieDetailView = () => {
    const { imdbID } = useParams(); 
    const [movie, setMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/');
    };

    useEffect(() => {
        const fetchMovie = async () => {
            setIsLoading(true);
            const url = `http://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}&plot=full`;
            try {
                const res = await fetch(url);
                const data = await res.json();
                if (data.Response === "True") {
                    setMovie(data);
                } else {
                    setMovie(null);
                }
            } catch (error) {
                console.error("Failed to fetch movie details:", error);
                setMovie(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovie();
    }, [imdbID]); 

    if (isLoading) {
        return <div className="detail-loading">Loading...</div>;
    }

    if (!movie) {
        return <div className="detail-error">Movie not found.</div>;
    }

    const OrNA = ({ value, children }) => value && value !== "N/A" ? children : "N/A";

    return (
        <div className="detail-view-container">
            <div className="movie-detail-card">
                <div className="poster-container">
                    <div className='back-btn-container'>
                        <button className='back-bttn' onClick={handleNavigate}>
                            &larr;
                        </button>
                    </div>
                    <img 
                        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/400x600.png?text=No+Image"} 
                        alt={`Poster for ${movie.Title}`} 
                        className="movie-poster"
                    />
                </div>
                
                <div className="movie-info">
                    <h1 className="movie-title">
                        <OrNA value={movie.Title}>{movie.Title}</OrNA>
                    </h1>
                    <p className="movie-subtitle">
                        <span><OrNA value={movie.Rated}>{movie.Rated}</OrNA></span>
                        <span><OrNA value={movie.Year}>{movie.Year}</OrNA></span>
                        <span><OrNA value={movie.Genre}>{movie.Genre}</OrNA></span>
                    </p>
                    <p className="movie-stats">
                        <strong>IMDb Score:</strong> <OrNA value={movie.imdbRating}>{movie.imdbRating} &#11088;</OrNA>
                    </p>
                    <p className="movie-stats">
                        <strong>Box Office:</strong> <OrNA value={movie.BoxOffice}>{movie.BoxOffice} &#128176;</OrNA>
                    </p>
                    <p className="movie-plot">
                        <OrNA value={movie.Plot}>{movie.Plot}</OrNA>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailView;