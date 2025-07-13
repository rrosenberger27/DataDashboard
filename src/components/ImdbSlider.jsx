import React, {useRef, useEffect} from "react";
import "../styles/slider.css";

const ImdbSlider = ({min, max, step, minValue, maxValue, onMinChange, onMaxChange}) => {
    const rangeMinRef = useRef(null);
    const rangeMaxRef = useRef(null);
    const rangeTrackRef = useRef(null);

    useEffect(() => {
        const updateSliderTrack = () => {
            if (rangeMinRef.current && rangeMaxRef.current && rangeTrackRef.current) {
                const minVal = parseFloat(rangeMinRef.current.value);
                const maxVal = parseFloat(rangeMaxRef.current.value);
                const sliderMin = parseFloat(rangeMinRef.current.min);
                const sliderMax = parseFloat(rangeMinRef.current.max);

                // Calculate percentage for background gradient
                const percentMin = ((minVal - sliderMin) / (sliderMax - sliderMin)) * 100;
                const percentMax = ((maxVal - sliderMin) / (sliderMax - sliderMin)) * 100;

                rangeTrackRef.current.style.background = `linear-gradient(to right, #d1d5db ${percentMin}%, #007bff ${percentMin}%, #007bff ${percentMax}%, #d1d5db ${percentMax}%)`;
            }
        };
        updateSliderTrack();
    }, [minValue, maxValue, min, max]);

    const handleMinImdbChange = (event) => {
        let value = parseFloat(event.target.value);
        if (value > maxValue) {
            value = maxValue;
        }
        onMinChange(value);
    };

    const handleMaxImdbChange = (event) => {
        let value = parseFloat(event.target.value);
        if (value < minValue) {
            value = minValue;
        }
        onMaxChange(value);
    };

    return (
        <div className='range-slider-container'>
            <div ref={rangeTrackRef} className='range-slider-track'></div>
            <input
                type='range'
                min={min}
                max={max}
                step={step}
                value={minValue}
                onChange={handleMinImdbChange}
                className='range-slider-input'
                ref={rangeMinRef}
            />
            <input
                type='range'
                min={min}
                max={max}
                step={step}
                value={maxValue}
                onChange={handleMaxImdbChange}
                className='range-slider-input'
                ref={rangeMaxRef}
            />
        </div>
    );
};

export default ImdbSlider;