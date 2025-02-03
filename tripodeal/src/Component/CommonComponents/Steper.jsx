import React, { useState,useContext } from "react";
import { Steps, Button } from "rsuite";
import FlightsSelection from "../Flight/FlightsSelection";
import FlightBooking from "../Flight/FlightBooking";
import "rsuite/dist/rsuite.css";
import PaymentPage from "../PaymentPage";
import ConfirmationPage from "./ConfirmationPage";
import UserContext from "../Context/Context";

const Steper = () => {
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
  

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
    window.scrollTo(0, 0);
  };

  const handlePrev = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleReset = () => {
    setCurrentStep(0);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div>
            <FlightsSelection handleNext={handleNext} />
          
          </div>
        );
      case 1:
        return (
          <div>
          <FlightBooking handlePrev={handlePrev} handleNext={handleNext} />
         
          </div>
        );
      case 2:
        return (
          <div>
            <PaymentPage handlePrev={handlePrev} handleNext={handleNext} />
          </div>
        );
      case 3:
        return (
            
          <div>
          <ConfirmationPage/>
          </div>
       
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <Steps current={currentStep}>
        <Steps.Item title="Search" />
        <Steps.Item title="Select" />
        <Steps.Item title="Payment" />
        <Steps.Item title="Confirmation" />
      </Steps>

      <div style={{ marginTop: "20px" }}>{renderStepContent()}</div>
    </div>
  );
};

export default Steper;
