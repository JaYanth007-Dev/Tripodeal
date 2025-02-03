import React, { useState } from 'react';
import { Range } from 'react-range';

const TimeFilter = ({ flightData, onFilterChange }) => {
  const convertToTime = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes}`;
  };

  const startTime = new Date(flightData.startTime).getTime();
  const endTime = new Date(flightData.endTime).getTime();

  const [values, setValues] = useState([startTime, endTime]);

  const onChange = (newValues) => {
    setValues(newValues);
    onFilterChange(newValues);
  };

  return (
    <Range
      values={values}
      min={startTime}
      max={endTime}
      step={1000 * 60} // 1 minute step
      onChange={onChange}
      renderTrack={({ props, children }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: '36px',
            width: '100%',
            backgroundColor: '#ccc',
          }}
        >
          {children}
        </div>
      )}
      renderThumb={({ props }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: '30px',
            width: '30px',
            borderRadius: '50%',
            backgroundColor: '#f00',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {values.map((val, index) => (
            <span key={index}>
              {convertToTime(val)}
            </span>
          ))}
        </div>
      )}
    />
  );
};

export default TimeFilter;
