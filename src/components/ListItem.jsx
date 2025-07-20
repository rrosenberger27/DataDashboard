import React from "react";
import "../styles/ListItem.css";

const ListItem = ({title, year, genre, imdb, boxoffice, imdbID}) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        if (imdbID) {
            navigate(`/movie/${imdbID}`);
        }
    };
    return (
      <div className="list-item-card">
            <div className="list-item-info">
                {title && <h3 className="list-item-title" onClick={handleNavigate} style={{ cursor: 'pointer' }}> {title} </h3>}
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
                {boxoffice !== null && !isNaN(boxoffice) ? (
                    <p className="list-item-boxoffice">Box Office: {`$${boxoffice.toLocaleString()}`} &#128176;</p>
                ) : (
                     <p className="list-item-boxoffice">Box Office: {`N/A`} &#128176;</p>
                )}
            </div>
        </div>
    );

}

export default ListItem;