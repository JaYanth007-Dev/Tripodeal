import React from "react";
import { useState, useContext } from "react";
import { BiRupee } from "react-icons/bi";
import {
  RiBellFill,
  RiFlightLandFill,
  RiFlightTakeoffFill,
} from "react-icons/ri";
import UserContext from "../Context/Context";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import CustomizedTabs from "../FlightBookingTabItems/CustomizedTabs";

const FlightCard = ({ props, handleNext }) => {
  const airlinesName = props.flights.airlines.airlinename;
  const [startdate, starttime] = props.startTime.split("T");
  const [enddate, endtime] = props.endTime.split("T");
  const t1 = starttime.substring(0, 5);
  const t2 = endtime.substring(0, 5);

  const [key, setKey] = useState("home");

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

  function formatTime(hours, minutes) {
    // Add leading zeros and concatenate the result
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    return `${formattedHours}h${formattedMinutes}m`;
  }

  function calculateTravelTime(startTimeStr, endTimeStr) {
    // Convert string representations of time to Date objects
    const startTime = new Date(`1970-01-01T${startTimeStr}Z`);
    const endTime = new Date(`1970-01-01T${endTimeStr}Z`);

    // Calculate the time difference in milliseconds
    const travelTimeMs = endTime - startTime;

    // Convert milliseconds to hours and minutes
    const travelHours = Math.floor(travelTimeMs / (1000 * 60 * 60));
    const travelMinutes = Math.floor(
      (travelTimeMs % (1000 * 60 * 60)) / (1000 * 60)
    );

    return formatTime(travelHours, travelMinutes);
  }

  const startTimeStr = t1;
  const endTimeStr = t2;

  const travelTime = calculateTravelTime(startTimeStr, endTimeStr);

  console.log(`Travel time: ${travelTime}`);

  const storeData = () => {
    const prop = { ...props, travelTime: travelTime };
    setSelectedFlightData(prop);
    handleNext();
  };
  localStorage.setItem("travelTime", travelTime);
  return (
    <div className="flightDetailsCard" >
      <div className="FlightDetailsCardLeftPart ">
        <div className="py-2 px-2">
          <p
            style={{
              backgroundColor: "blue",
              width: "100px",
              color: "white",
              padding: "3px 8px",
              borderRadius: "4px",
            }}
          >
            Regular Deal
          </p>
        </div>

        <div className="flightTimings">
          <div className="box">
            <p>Depart</p>
            <div className="d-flex gap-2">
              <RiFlightTakeoffFill size={20} />
              <h6>{airlinesName}</h6>
            </div>
          </div>
          <div className="d-flex gap-4">
            <div className="box">
              <h5> {t1}</h5>
              <h5>{fromcityname}</h5>
            </div>
            <div className="">
              <p>{travelTime}</p>
              <p>Non Stop</p>
            </div>
            <div className="box">
              <h5>{t2} </h5>
              <h5>{tocityname}</h5>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 20px",
          }}
        >
          <a href="#">
             Coupon Applied <BiRupee />
            100
          </a>
        </div>
      </div>
      <div className="FlightDetailsCardRightPart">
        <div className="FlightDetailsCardRightPart-Row1">
          <h4>
            <BiRupee />
            {props.ticketPriceEconomyClass}
          </h4>
          <p>per adult</p>
          <p>
            <RiBellFill />
            instant <BiRupee />
            151 off
          </p>
        </div>
        <div>
          <button className="btn-grad" onClick={storeData}>
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
