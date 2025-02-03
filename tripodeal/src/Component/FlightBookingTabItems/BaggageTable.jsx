import React from "react";
import Table from "react-bootstrap/Table";
import { useContext, useEffect, useState } from "react";
import UserContext from "../Context/Context";
const BaggageTable = () => {
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
    setSelectedFlightData,
  ] = useContext(UserContext);

  const airlinename=SelectedFlightData.flights.airlines.airlinename
  console.log("Baggage......",)

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Airline</th>
          <th>Check-in Baggage</th>
          <th>Cabin Baggage </th>
        </tr>
      </thead>
      <tbody>
    
        <tr>
          <td>{airlinename}</td>
          <td>15KG</td>
          <td>7KG</td>
        </tr>
       
      </tbody>
    </Table>
  );
};

export default BaggageTable;
