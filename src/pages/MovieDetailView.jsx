import React from 'react';
import { useParams } from 'react-router-dom';

const MovieDetail = () => {
    const { imdbID } = useParams(); 

    return (
        <div className='movie-detail-container'>
            <h1>Movie Detail Page</h1>
            <p>Details for movie with IMDb ID: {imdbID}</p>
        </div>
    );
};

export default MovieDetail;