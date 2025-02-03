import Accordion from "react-bootstrap/Accordion";
import { BiRupee } from "react-icons/bi";
import { RiFlightTakeoffFill } from "react-icons/ri";
import { RiFlightLandLine } from "react-icons/ri";
import { useContext, useEffect, useState } from "react";
import UserContext from "./Context/Context";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import axios from "axios";

import Box from "@mui/material/Box";
const FilterAccordion = ({ bool, setBool }) => {
  const [
    showLogin,
    setShowLogin,
    showSignUp,
    setShowSignUp,
    fromcityname,
    setFromCityname,
    tocityname,
    setToCityname,
    SignIndata,
    setSignInData,
    Logindata,
    setLoginData,
    username,
    setusername,
    userLogin,
    setUserLogin,
    TravelDate,
    setTravelDate,
    flightData,
    setFlightData,
    SelectedflightData,
    setSelectedFlightData,
    passengers,
    setPassengers,
    userData,
    setUserData,
    flightDupliData,
    setFlightDupliData,
  ] = useContext(UserContext);

  function formatTime(startTime) {
    const date = new Date(startTime);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  //FOR ARRIVAL TIME
  const departedTime = [];
  flightData.map((obj) => {
    let time = formatTime(obj.startTime);
    departedTime.push(time);
  });

  // FOR DEPARTED TIME
  const arrivalTime = [];
  flightData.map((obj) => {
    let time = formatTime(obj.endTime);
    arrivalTime.push(time);
  });

  const sortedArrivalTime = arrivalTime.sort();
  const sortedDepartedTime = departedTime.sort();
  const set1 = new Set(sortedDepartedTime);
  const set2 = new Set(sortedArrivalTime);
  const sortedDepartedTimes = [...set1];
  const sortedArrivalTimes = [...set2];
  console.log("ARRIVAL TIME>>>>", sortedArrivalTimes);
  console.log("DEPARTED TIME>>>>", sortedDepartedTimes);

 

  // FOR PRICES

  const [minMax, setMinMax] = useState({
    min: 0,
    max: 1,
  });
  const [val, setVal] = useState([minMax.min, minMax.max]);

  const handleChange = (_, newValue) => {
    setVal(newValue);
  };
 
  useEffect(() => {
    setVal([minMax.min, minMax.max])
  }, [minMax])

  useEffect(() => {
    const prices = [];
    flightData.map((obj) => prices.push(obj.ticketPriceEconomyClass));

    const sortedPrices = prices.sort((a, b) => a - b);
    console.log("SOrtedPRices", sortedPrices[sortedPrices.length - 1]);

    const MIN = sortedPrices[0];
    const MAX = sortedPrices[sortedPrices.length - 1];
    setMinMax({min: MIN, max: MAX});
  }, [flightData]);

  useEffect(() => {
    setFlightDupliData(
      flightData.filter(
        (flight) =>
          flight.ticketPriceEconomyClass >= val[0] &&
          flight.ticketPriceEconomyClass <= val[1]
      )
    );
  }, [val]);

  // FOR CHECKBOXES
  const [airlines, setAirlnes] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [id, setId] = useState("");

  const handleCheckboxChange = (checkbox) => {
    const newCheckedItems = { ...checkedItems };
    Object.keys(newCheckedItems).forEach((key) => {
      newCheckedItems[key] = false;
    });
    // Toggle the selected checkbox
    newCheckedItems[checkbox] = true;
    setCheckedItems(newCheckedItems);
  };

  useEffect(() => {
    if (bool) {
      const arr = Array.from(
        new Set(
          flightData.map((e) => ({
            name: e.flights.airlines.airlinename,
            price: e.ticketPriceEconomyClass,
            id: e.flights.airlines.airlinesId,
          }))
        )
      );

      const sortedArrayOfObjects = arr
        .slice()
        .sort((b, a) => a.price - b.price);
      const uniqueObjects = new Map();
      sortedArrayOfObjects.forEach((obj) => {
        uniqueObjects.set(obj.name, [obj.price, obj.id]);
      });
      setAirlnes([...uniqueObjects.entries()]);
      setBool(false);
    }
  }, [bool, flightData]);

  useEffect(() => {
    setCheckedItems(
      airlines.reduce((items, [, [, id]]) => {
        items[id] = true;
        return items;
      }, {})
    );
  }, [airlines]);

  useEffect(() => {
    if (id !== "") {
      console.log("id...........", id);
      axios
        .get(
          `http://localhost:8080/searchByAirline/${fromcityname}/${tocityname}/${TravelDate}/${id}`
        )
        .then((response) => {
          setFlightData(response.data);
        });
    }
  }, [id]);

  

  console.log("Airlines..........", airlines);
  return (
    <Accordion data-aos="fade-right" data-aos-duration="1100">
      <Accordion.Item alwaysOpen>
        <Accordion.Header>Airlines</Accordion.Header>
        <Accordion.Body>
          {airlines.map(([name, [price, id]]) => (
            <div className="airlines">
              <div className=" d-flex gap-2">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id={id}
                  checked={checkedItems[id]}
                  onChange={() => {
                    handleCheckboxChange(id);
                    setId(id);
                  }}
                />
                <label class="form-check-label" for="flexCheckDefault">
                  {name}
                </label>
              </div>
              <div className="">
                <p>
                  <BiRupee size={15} />
                  {price}
                </p>
              </div>
            </div>
          ))}
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item alwaysOpen>
        <Accordion.Header>Price</Accordion.Header>
        <Accordion.Body>
          <div className="py-4">
            <Box sx={{ width: 250 }}>
              <Slider
                step={100}
                value={val}
                valueLabelDisplay="auto"
                min={minMax.min}
                max={minMax.max}
                onChange={handleChange}
              />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  variant="body2"
                  onClick={() => setVal([minMax.min, val[1]])}
                  sx={{ cursor: "pointer" }}
                >
                  <BiRupee /> {minMax.min}
                </Typography>
                <Typography
                  variant="body2"
                  onClick={() => setVal([val[0], minMax.max])}
                  sx={{ cursor: "pointer" }}
                >
                  <BiRupee /> {minMax.max}
                </Typography>
              </Box>
            </Box>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default FilterAccordion;
