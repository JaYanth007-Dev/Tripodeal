import React from "react";
import SlickSlider from "./SlickSlider";
import FilterAccordion from "../FilterAccordion";
import DiscountCard from "./DiscountCard";
import FlightCard from "./FlightCard";
import UserContext from "../Context/Context";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState, useContext, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { TiPencil } from "react-icons/ti";
import { MdOutlineFlight } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import FlightSearchBox from "../FlightSearchBox";
import NotFoundPage from "../ErrorHandling/NotFoundPage";

const FlightsSelection = ({ handleNext }) => {
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
  localStorage.setItem("date", TravelDate);

  const sortedArrayPriceLowToHigh = [...flightDupliData].sort(
    (a, b) => a.ticketPriceEconomyClass - b.ticketPriceEconomyClass
  );
  const sortedArrayPriceHighToLow = [...flightDupliData].sort(
    (a, b) => b.ticketPriceEconomyClass - a.ticketPriceEconomyClass
  );

  const [selectedValue, setSelectedVAlue] = useState("recommended");

  const [show, setShow] = useState(false);
  const [bool, setBool] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getFlights();
  }, []);

  const getFlights = () => {
    console.log("flightData", flightData);
    const url = `http://localhost:8080/search/${fromcityname}/${tocityname}/${TravelDate}`;
    axios
      .get(url)
      .then((response) => {
        console.log("..........", response.data);
        setFlightDupliData(response.data);
        setFlightData(response.data);
        setBool(true);
      })
      .catch((e) => console.log(e));
  };
  const date = localStorage.getItem("date");
  return (
    <div className="flightsSelectionPage ">
      <div className="details">
        <div className="d-flex text-white gap-5 align-items-center ">
          <div className="d-flex gap-2 align-items-center text-xl">
            <MdOutlineFlight size={25} />
            {fromcityname} - {tocityname}
          </div>
          <div className="d-flex flex align-items-center gap-2 ">
            <FaRegCalendarAlt />
            <span>Depart on</span>
            {date}
          </div>
        </div>
        <div>
          <Button className="ChangeButton " onClick={handleShow}>
            Change ....
            <TiPencil />
          </Button>

          <Modal
            show={show}
            className="bg-red-700"
          >
            <Modal.Header >
              <Modal.Title>Edit</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex justify-content-center">
              <FlightSearchBox
                handleClose={handleClose}
                getFlights={getFlights}
              />
            </Modal.Body>
          </Modal>
        </div>
      </div>
      {flightData.length == 0 ? (
        <div className="details">
          <NotFoundPage handleShow={handleShow} />
        </div>
      ) : (
        <div className="flightsSelection">
          <div className="flightsSelectionCol1">
            <FilterAccordion bool={bool} setBool={setBool} />
          </div>
          <div className="flightsSelectionCol2">
            <SlickSlider />
            <DiscountCard flightData={flightData} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h6>{flightDupliData.length} of 206 flights</h6>
              <Form.Select
                size="sm"
                className="w-25"
                value={selectedValue}
                onChange={(e) => setSelectedVAlue(e.target.value)}
              >
                <option value="recommended">Recommended</option>
                <option value="PriceLowToHigh">Price (Low to High)</option>
                <option value="PriceHighToLow">Price (High to Low)</option>
              </Form.Select>
            </div>
            {selectedValue === "recommended"
              ? flightDupliData.map((item) => (
                  <FlightCard props={item} handleNext={handleNext} />
                ))
              : selectedValue === "PriceLowToHigh"
              ? sortedArrayPriceLowToHigh.map((item) => (
                  <FlightCard props={item} handleNext={handleNext} />
                ))
              : selectedValue === "PriceHighToLow"
              ? sortedArrayPriceHighToLow.map((item) => (
                  <FlightCard props={item} handleNext={handleNext} />
                ))
              : ""}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightsSelection;
