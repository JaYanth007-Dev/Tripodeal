import React from "react";
import Accordion from "react-bootstrap/Accordion";
import { useState,useContext } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { BiRupee } from "react-icons/bi";
import { RiBellFill, RiFlightLandFill, RiFlightTakeoffFill } from "react-icons/ri";
import UserContext from "../Context/Context";
import { IoEllipsisHorizontalOutline } from "react-icons/io5";
 
const BookingPageFlightCard = ({props}) => {
    console.log("Booking Page Flight Card...",props)
  const airlinesName=props.flights.airlines.airlinename;
  const [ startdate, starttime]=props.startTime.split("T");
  const [ enddate, endtime]=props.endTime.split("T");
  const t1=starttime.substring(0,5);
  const t2=endtime.substring(0,5);


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
    SelectedFlightData,
    setSelectedFlightData
  ] = useContext(UserContext);


  function formatTime(hours, minutes) {
    // Add leading zeros and concatenate the result
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
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
    const travelMinutes = Math.floor((travelTimeMs % (1000 * 60 * 60)) / (1000 * 60));

    return formatTime(travelHours, travelMinutes);
}

const startTimeStr = t1;  
const endTimeStr = t2;   

const travelTime = calculateTravelTime(startTimeStr, endTimeStr);

console.log(`Travel time: ${travelTime}`);


  return (
   
      <div className="w-80 detailsCard">
        <div className="py-2 ">
          <p className="detailsCardRegularDeal"
          >
            Regular Deal
          </p>
        </div>

        <div className="d-flex justify-content-between">
          <div className="d-flex flex-column gap-2">
            <p>Depart</p>
            <div className="d-flex gap-2 ">
              <RiFlightTakeoffFill size={20}/>
              <div className="d-flex flex-column gap-2  "> <h6>{airlinesName}</h6>
              <p>6E -{props.flights.flightNumber}</p></div>
             
            </div>
          </div>
            
            <div className="">
              <h5> {t1}</h5>
              <h5>{fromcityname}</h5>
              <p>{TravelDate}</p>
              <p>Terminal 1</p>
              </div>

              <div className="d-flex align-items-center gap-3">
              <IoEllipsisHorizontalOutline size={25}/>
              <div className="d-flex flex-column justify-content-center"> 
              <h6 className="text-danger">{travelTime}</h6 >
              <h6 className="text-danger" >Non Stop</h6 >
              </div>
              <IoEllipsisHorizontalOutline size={25}/>
            </div>
            <div className="box">
            <h5>{t2} </h5>
            <h5>{tocityname}</h5>
            <p>{TravelDate}</p>
            <p>Terminal 2</p>
            </div>
          </div>
        </div>

      
   
    

  );
};

export default BookingPageFlightCard;
