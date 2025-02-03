import React from "react";
import Swal from "sweetalert2";
import UserContext from "./Context/Context";
import { useContext,useState } from "react";
import Table from "react-bootstrap/Table";
import { MdOutlineArrowBackIos } from "react-icons/md";
import Button from "react-bootstrap/Button";
import { MdOutlineArrowForward, MdOutlineFlight } from "react-icons/md";
import { FaRegCalendarAlt, FaUser } from "react-icons/fa";
import BookingPageFlightCard from "./FlightBookingTabItems/BookingPageFlightCard";
import PaymentForm from "./CommonComponents/PaymentOptions";
import SelectedListItem from "./CommonComponents/PaymentOptions";
import MobileVerificationModal from "./CommonComponents/OTPVerification";
const PaymentPage = ({ handlePrev, handleNext }) => {
  const date = localStorage.getItem("date");
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
  ] = useContext(UserContext);


  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handlePayment = () => {
    Swal.fire({
      title: "Payment Done Successfully",
      text: `Paid with ${selectedPaymentMethod}`,
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });
    setTimeout(() => {
      console.log("Payment page Handle Next", handleNext);
      handleNext();
    }, 2200);
  };

  let passengersCount = Object.keys(passengers).length;
  return (
    <div className="paymentContainer">
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

          <div className="d-flex gap-2 align-items-center">
            <FaUser size={15} color="white" />
            {passengersCount >1?<p>{passengersCount} Travellers</p>:<p>{passengersCount} Traveller</p>}
          </div>
        </div>
        <div>
          <Button className="ChangeButton px-3" onClick={handlePrev}>
            <span className="d-flex align-items-center gap-1">
              <MdOutlineArrowBackIos />
              Go Back
            </span>
          </Button>
        </div>
      </div>

      <div className="paymentBoxContainer">
        
            <div className="paymentBox">
            <h5>Review Details</h5>
            <p className="font-bolder">
                Ticket is Non Refundable/Non Changeable/Non Cancellable
            </p>
            <div className="paymentCustomerBox">
                Customers can directly do the Web Check-In on the Airlines website
                10 hours ago from your trip
            </div>
            <div className="d-flex align-items-center gap-2 paymentPassengerBox">
                <FaUser />
                <h5>Passengers</h5>
            </div>

            <div>
                <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>SNo</th>
                    <th>Age</th>
                    <th>Name </th>
                    </tr>
                </thead>
                <tbody>
                    {passengers.map((item, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.age}</td>
                        <td>
                        {item.passengerFirstName} {item.passengerLastName}
                        </td>
                    </tr>
                    ))}
                </tbody>
                </Table>
            </div>

            <div className="d-flex align-items-center gap-2 paymentPassengerBox">
                <MdOutlineFlight size={22} />
                <h5>Flight</h5>
            </div>
            <BookingPageFlightCard props={SelectedFlightData} />
            </div>


            <div className="py-3">

            <SelectedListItem selectedPaymentMethod={selectedPaymentMethod} setSelectedPaymentMethod={setSelectedPaymentMethod}/>
            </div>

            <div className="pt-3 pb-5">
            <button className="payNowBtn" onClick={handleShowModal}>Pay Now</button>
            <MobileVerificationModal showModal={showModal} handleClose={handleCloseModal} handleNext={handleNext} handlePayment={handlePayment}/>
            </div>
      </div>

     
   
    </div>
  );
};

export default PaymentPage;
