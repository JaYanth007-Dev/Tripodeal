import React, { useState } from 'react';
import Slider from 'rc-slider';

const generateFlightData = () => {
  const numberOfFlights = 10;
  const flights = [];

  for (let i = 1; i <= numberOfFlights; i++) {
    const startTime = Math.floor(Math.random() * 24); // Random start time between 0 and 23
    const flight = {
      id: i,
      startTime: startTime,
    };
    flights.push(flight);
  }

  return flights;
};

const FlightSliderFilter = () => {
  const [timeRange, setTimeRange] = useState([0, 24]);
  const flights = generateFlightData();

  const filteredFlights = flights.filter(
    (flight) =>
      flight.startTime >= timeRange[0] &&
      flight.startTime <= timeRange[1]
  );

  return (
    <div>
      <h2>Flight Slider Filter</h2>
      <Slider
        range
        min={0}
        max={24}
        step={1}
        defaultValue={[0, 24]}
        value={timeRange}
        onChange={(value) => setTimeRange(value)}
      />
      <div>
        {filteredFlights.map((flight) => (
          <div key={flight.id}>
            <p>{`Flight ID: ${flight.id}`}</p>
            <p>{`Start Time: ${flight.startTime}`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightSliderFilter;
