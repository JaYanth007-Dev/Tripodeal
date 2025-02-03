import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { BiRupee } from 'react-icons/bi';

const SlickSlider = () => {
 const [dates, setDates] = useState([]);
 const [amounts, setAmounts] = useState([]);
  const date=localStorage.getItem('date');
 useEffect(() => {
    const dates = generateDates(20);
    const amounts = generateRandomAmount(20);
    setDates(dates);
    setAmounts(amounts);
 }, []);



 function convertDateFormat(inputDateStr) {
  // Parse input date
  const [day, month, year] = inputDateStr.split('-');
  const inputDate = new Date(`${year}-${month}-${day}`);

  const options = { weekday: 'long',month: 'long', day: 'numeric'};

  // Format the date
  const formattedDate = inputDate.toLocaleDateString('en-US', options);

  return formattedDate;
}

// Example usage:








 function generateDates(count) {
    let dates = [];
    for (let i = 0; i < count; i++) {
      let date = new Date();
      date.setDate(date.getDate() + i);
      console.log("Date...",date.toISOString())
      dates.push(date.toISOString().slice(0, 10));
    }
    return dates;
 }

 function generateRandomAmount(count) {
    let amounts = [];
    for (let i = 0; i < count; i++) {
      let amount = Math.floor(Math.random() * 10000) + 1;
      amounts.push(amount);
    }
    return amounts;
 }

 const settings = {
    className: "center",
    infinite: false,
    centerPadding: "60px",
    slidesToShow: 5,
    swipeToSlide: true,
    afterChange: function (index) {
      console.log(
        `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
      );
    }
 };

 return (
    <div className="CalenderSlider">
      <Slider {...settings}>
        {dates.map((date, index) => (
          <div className="calenderCard" key={index}>
            <h6 className="heading">{date}</h6>
            <p className="price">
              <BiRupee />
              {amounts[index]}
            </p>
          </div>
        ))}
      </Slider>
    </div>
 );
};

export default SlickSlider; 