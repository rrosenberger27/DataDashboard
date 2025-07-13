import React, { useState } from "react";

const RatingsDropdown = ({ selectedRating, onRatingChange, ratings }) => {
 const [isOpen, setIsOpen] = useState(false);
 
 const handleSelect = (rating) => {
    onRatingChange(rating);
    setIsOpen(false);
 };

 return (
    <div className="ratings-dropdown">
            <button className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
                Rating: {selectedRating === "any" ? "Any" : selectedRating}
                <span className="dropdown-arrow">&#9662;</span> {/* down arrow */}
            </button>
            {isOpen && (
                <div className="dropdown-menu">
                    {ratings.map(rating => (
                        <button
                            key={rating}
                            className={`dropdown-item ${selectedRating === rating ? 'active' : ''}`}
                            onClick={() => handleSelect(rating.toLowerCase())}
                        >
                            {rating}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default RatingsDropdown;