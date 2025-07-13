import React from "react";
import "../styles/ListItem.css";

const ListItem = ({poster, title, year, genre, imdb, boxoffice}) => {
    return (
      <div className="list-item-card">
            {poster ? (
                <img src={poster} alt={title || "Movie Poster"} className="list-item-poster"
                     onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/300x450?text=No+Poster"; }} />
            ) : (
                <div className="list-item-no-poster">No Poster Available</div>
            )}
            <div className="list-item-info">
                {title && <h3 className="list-item-title"> {title} </h3>}
                {(year || genre) && (
                    <p className="list-item-subtitle">
                        {year && <span>{year}</span>}
                        {year && genre && <span className="separator"> | </span>}
                        {genre && <span>{genre}</span>}
                    </p>
                )}
                {imdb !== null && !isNaN(imdb) && (
                    <p className="list-item-imdb">IMDb: {parseFloat(imdb).toFixed(1)} &#11088;</p>
                )}
                {boxoffice !== null && !isNaN(boxoffice) && (
                    <p className="list-item-boxoffice">Box Office: {`$${boxoffice.toLocaleString()}`} &#128176;</p>
                )}
            </div>
        </div>
    );

}

export default ListItem;