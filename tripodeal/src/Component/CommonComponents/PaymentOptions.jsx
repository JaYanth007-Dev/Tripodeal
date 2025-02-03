import React, { useState, useContext, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import Upi from "../../Assets/Upi_icon.jpg";
import Cards from "../../Assets/pay_cards_icon.jpg";
import NetBanking from "../../Assets/pay_net_icon.png";
import Wallet from "../../Assets/pay_wallet_icon.png";
import EmiCards from "../../Assets/pay_emi_icon.jpg";
import { BiRupee } from "react-icons/bi";
import UserContext from "../Context/Context";

const SelectedListItem = ({
  selectedPaymentMethod,
  setSelectedPaymentMethod,
}) => {
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
    passengers,
    setPassengers,
    userData,
    setUserData,
  ] = useContext(UserContext);

  const { ticketPriceEconomyClass } = SelectedFlightData;
  let passengersCount = Object.keys(passengers).length;

  const handleListItemClick = (index) => {
    const paymentMethods = [
      "UPI",
      "Debit Card",
      "Credit Card",
      "Net Banking",
      "Wallet",
      "Debit & Credit Card EMI",
    ];

    setSelectedPaymentMethod(paymentMethods[index]);
  };

  const listItems = [
    "UPI",
    "Debit Card",
    "Credit Card",
    "Net Banking",
    "Wallet",
    "Debit & Credit Card EMI",
  ];
  const icons = [Upi, Cards, Cards, NetBanking, Wallet, EmiCards];

  useEffect(() => {
    setSelectedPaymentMethod("Debit Card");
  }, []);
  return (
    <ListGroup className="paymentOptionsBox">
      <h5>CHOOSE PAYMENT METHOD</h5>
      <h4>
        <BiRupee />
        {ticketPriceEconomyClass * passengersCount}
      </h4>
      {listItems.map((item, index) => (
        <ListGroup.Item
          key={index}
          active={selectedPaymentMethod === listItems[index]}
          onClick={() => handleListItemClick(index)}
          action
        >
          <img className="pe-2" src={icons[index]} width={30}></img>
          {item.toUpperCase()}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default SelectedListItem;
