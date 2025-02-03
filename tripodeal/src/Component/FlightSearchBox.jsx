import React, { useEffect, useRef } from "react";
import India from "../Assets/india.png";
import Form from "react-bootstrap/Form";
import "../App.css";
import { Typeahead } from "react-bootstrap-typeahead";
import Login from "./LoginAndSignUp/Login";
import { useContext, useState } from "react";
import UserContext from "./Context/Context";
import { RiFlightTakeoffFill } from "react-icons/ri";
import { RiFlightLandLine } from "react-icons/ri";
import { Link, json, useNavigate } from "react-router-dom";
import Heart from "./Heart";
import axios from "axios";
import Swal from "sweetalert2";

const FlightSearchBox = (props) => {
  console.log("Flight Box Loaded.........................");
  const { handleClose, getFlights } = props;
  console.log("Handle Search Box....", handleClose);
  const fromLocation = useRef(null);
  const toLocation = useRef(null);
  const fromDate = useRef(null);
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
    currentStep, 
    setCurrentStep
  ] = useContext(UserContext);

  useEffect(() => {
  setToCityname("")
  setFromCityname("")
  setTravelDate("")
  setCurrentStep(0)
  }, []);
  function getDate() {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    return formattedDate;
  }
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!",currentStep)
  console.log("From City....................", fromcityname);
  console.log("From To....................", tocityname);
  const [ShowReturnDate, setShowReturnDate] = useState(true);
  const [locations, setLocations] = useState([]);
  const [errorMessage, setErrorMessage] = useState({
    startlocation: "",
    endlocation: "",
  });
  const navigate = useNavigate();

  const Navigation = () => {
    console.log(" Err Message sLocation", errorMessage.startlocation);
    console.log(" Err Message eLocation", errorMessage.endlocation);
    console.log(" Err Message TravelDate", errorMessage.travelDate);
    console.log("Travell Date", TravelDate);
    if (
      (fromcityname != "" &&
        tocityname != "" &&
        errorMessage.startlocation == "" &&
        errorMessage.endlocation == "" &&
        TravelDate != "" )&&
       ( errorMessage.travelDate == "" ||
      errorMessage.travelDate == undefined)
    ) {
      if (handleClose != undefined) {
        getFlights()
        handleClose();
      }
      
      navigate("/FlightsSelection");
    } else {
      Swal.fire({
        title: "Failed",
        text: "Fill all the Details...OR...Enter Valid Details!",
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  const VerifyFromInput = (val) => {
    let strFromLocation = val;
    let strToLocation = tocityname;
    const isFromValueFound = locations.includes(strFromLocation);
    if (strFromLocation === "") {
      setErrorMessage({ ...errorMessage, startlocation: "Enter Location" });
    } else if (!isFromValueFound) {
      setErrorMessage({
        ...errorMessage,
        startlocation: "Enter valid Location...",
      });
    } else if (strFromLocation === strToLocation) {
      setErrorMessage({
        ...errorMessage,
        startlocation: "Both locations should not Same..!",
      });
    } else {
      setErrorMessage({ ...errorMessage, startlocation: "" });
    }
  };
  const VerifyToinput = (val) => {
    let strFromLocation = fromcityname;
    let strToLocation = val;
    const isToValueFound = locations.includes(strToLocation);
    if (strToLocation === "") {
      setErrorMessage({ ...errorMessage, endlocation: "Enter Location" });
    } else if (!isToValueFound) {
      setErrorMessage({
        ...errorMessage,
        endlocation: "Enter valid Location...",
      });
    } else if (strFromLocation === strToLocation) {
      setErrorMessage({
        ...errorMessage,
        endlocation: "Both locations should not Same..!",
      });
    } else {
      setErrorMessage({ ...errorMessage, endlocation: "" });
    }
  };
  const verifyInputDate = (val) => {
    let t = getDate();
    let todayDate = new Date(t).getTime();
    console.log("<<<<INSIDE DATE>>>", todayDate);
    let selectedDate = new Date(val).getTime();
    if (selectedDate < todayDate) {
      setErrorMessage({ ...errorMessage, travelDate: "Enter Valid Date" });
    } else {
      setErrorMessage({ ...errorMessage, travelDate: "" });
    }
  };
  const indianCities = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Surat"
];
  useEffect(() => {
    getLocations();
  }, []);
  const getLocations = () => {
    // const url = "http://localhost:8080/listAllLocations";
    // axios.get(url).then((response) => setLocations(response.data));
    setLocations(indianCities)
  };
  return (
    <div className="searchBox" data-aos="fade-right" data-aos-duration="1100">
      <div className="trip ">
        <div className="tripBox">
          <input
            type="radio"
            id="html"
            name="aroundTrip"
            value=""
            onChange={() => {
              setShowReturnDate(!ShowReturnDate);
              console.log(ShowReturnDate);
            }}
          />
          <label for="html">Round Trip</label>
        </div>
        <div className="tripBox">
          <input
            type="radio"
            id="css"
            name="aroundTrip"
            value=""
            checked={ShowReturnDate}
            onChange={() => {
              setShowReturnDate(!ShowReturnDate);
              console.log(ShowReturnDate);
            }}
          />
          <label for="css">One Way</label>
        </div>
      </div>








      <div className="fromBox">
      <RiFlightTakeoffFill size={35} />
      <Form.Group className="mb-1 w-75">
        <Form.Label>From</Form.Label>
        <Typeahead
          id="from-city-typeahead"
          className=""
          options={locations}
          onChange={(selected) => {
            setFromCityname(selected.length > 0 ? selected[0] : "");
            VerifyFromInput(selected.length > 0 ? selected[0] : "");
          }}
          placeholder="Enter Location"
        />
        <Form.Text className="text-danger">{errorMessage.startlocation}</Form.Text>
      </Form.Group>
    </div>

    <div className="fromBox">
      <RiFlightLandLine size={35} />
      <Form.Group className="mb-1 w-75">
        <Form.Label>To</Form.Label>
        <Typeahead
          id="to-city-typeahead"
          options={locations}
          onChange={(selected) => {
            setToCityname(selected.length > 0 ? selected[0] : "");
            VerifyToinput(selected.length > 0 ? selected[0] : "");
          }}
          placeholder="Enter Location"
        />
        <Form.Text className="text-danger">{errorMessage.endlocation}</Form.Text>
      </Form.Group>
    </div>




      <div className="dates">
        <div>
          <h6>Depart Date</h6>
          <input
            type="date"
            id="dateInput"
            value={TravelDate}
            onChange={(e) => {
              setTravelDate(e.target.value);
              verifyInputDate(e.target.value);
            }}
            required
            ref={fromDate}
          ></input>
        </div>
        {ShowReturnDate ? (
          <div></div>
        ) : (
          <div>
            <h6>Return Date</h6>
            <input type="date" id="dateInput" required></input>
          </div>
        )}
      </div>
      <p className="errorMessage ps-5">{errorMessage.travelDate}</p>

      <div className="SrcButton">
        <button className="btn-grad" onClick={Navigation}>
          Search
        </button>
      </div>
    </div>
  );
};

export default FlightSearchBox;
