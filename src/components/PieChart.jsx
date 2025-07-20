import React, { useState } from 'react';
import '../styles/pieChart.css';

// Helper component for a single slice
const Slice = ({ color, startAngle, endAngle, isHovered, onHover, data }) => {
  const radius = 80;
  const cx = 100;
  const cy = 100;

  // Function to convert degrees to radians
  const degToRad = (deg) => deg * (Math.PI / 180);

  // Function to get x, y coordinates for a point on a circle
  const getCoords = (angle) => [
    cx + radius * Math.cos(degToRad(angle)),
    cy + radius * Math.sin(degToRad(angle)),
  ];

  const [startX, startY] = getCoords(startAngle);
  const [endX, endY] = getCoords(endAngle);

  // Determine if the arc should be "> 180deg" (1) or "< 180deg" (0)
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

  // A single SVG path element for the slice
  const pathData = `
    M ${cx},${cy}
    L ${startX},${startY}
    A ${radius},${radius} 0 ${largeArcFlag} 1 ${endX},${endY}
    Z
  `;

  return (
    <path
      d={pathData}
      fill={color}
      onMouseOver={() => onHover(data)}
      onMouseOut={() => onHover(null)}
      className={isHovered ? 'pie-slice hovered' : 'pie-slice'}
    />
  );
};

const PieChart = ({ movies }) => {
  const [hoveredSlice, setHoveredSlice] = useState(null);

  const getRatingData = () => {
    const ratings = {};
    if (movies) {
      movies.forEach(movie => {
        const rating = movie.rated && !["N/A", "Not Rated", "Unrated", "Approved", "Passed"].includes(movie.rated) ? movie.rated : 'N/A';
        ratings[rating] = (ratings[rating] || 0) + 1;
      });
    }
    return Object.entries(ratings)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  };

  const ratingData = getRatingData();
  const colors = ['#6A0DAD', '#0077B6', '#00BFFF', '#FFD700', '#FF8C00', '#D3D3D3', '#C71585', '#2E8B57', '#FF4500'];

  let cumulativeAngle = -90; // Start at the top

  return (
    <div className="pie-chart-container">
      <h3 className="chart-title">Movies by MPAA Rating</h3>
      <div className="chart-and-legend">
        <div className="pie-chart-wrapper">
          <svg viewBox="0 0 200 200" className="pie-chart">
            {ratingData.map((data, index) => {
              const total = ratingData.reduce((sum, { value }) => sum + value, 0);
              const sliceAngle = (data.value / total) * 360;
              const startAngle = cumulativeAngle;
              cumulativeAngle += sliceAngle;
              const endAngle = cumulativeAngle;

              return (
                <Slice
                  key={data.name}
                  color={colors[index % colors.length]}
                  startAngle={startAngle}
                  endAngle={endAngle}
                  data={data}
                  isHovered={hoveredSlice?.name === data.name}
                  onHover={setHoveredSlice}
                />
              );
            })}
          </svg>
          {hoveredSlice && (
            <div className="pie-tooltip">
              {hoveredSlice.name}: {hoveredSlice.value}
            </div>
          )}
        </div>
        <div className="legend">
          {ratingData.map(({ name, value }, index) => (
            <div key={name} className="legend-item">
              <span className="legend-color" style={{ backgroundColor: colors[index % colors.length] }}></span>
              {name}: ({value})
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PieChart;