import React from "react";
import { useContext, useState } from "react";
import UserContext from "../Context/Context";
import { MdOutlineArrowForward, MdOutlineFlight } from "react-icons/md";
import { FaRegCalendarAlt, FaUser } from "react-icons/fa";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { HiHandThumbUp } from "react-icons/hi2";
import Button from "react-bootstrap/Button";
import { FcViewDetails } from "react-icons/fc";
import { BiRupee } from "react-icons/bi";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { IoMdAlarm } from "react-icons/io";
import { RiFlightLandLine, RiFlightTakeoffLine } from "react-icons/ri";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { MdOutlineErrorOutline } from "react-icons/md";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import CustomizedTabs from "../FlightBookingTabItems/CustomizedTabs";
import AddingUser from "../CommonComponents/AddingUser";
import TimeFilter from "../TimeFilter";
import { useNavigate } from "react-router-dom";

const FlightBooking = ({ handlePrev, handleNext }) => {
  console.log("handle NExt ...............", handleNext);
  const date = localStorage.getItem("date");

  const navigation = useNavigate();
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

  const [validatedUserData, setValidatedUserData] = useState(false);
  const [verifiedUserData, setVerifiedUserData] = useState(false);

  const [verifiedPassengersData, setVerifiedPassengersData] = useState(false);

  const [buttonColour, setButtonColour] = useState(false);
  let functioncallCount = 1;
  let [btnCount, setBtnCount] = useState(1);

  const handleSubmit = (event) => {
    console.log("FUNTION CALL", functioncallCount);
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidatedUserData(true);
    } else {
      setVerifiedUserData(true); // set to true only if form is validated
      setValidatedUserData(false); // set to false to clear previous validation messages
      if (btnCount === 1) {
        console.log("BUTTON COLUR CHANGING", btnCount);
        setButtonColour(!buttonColour);
        setBtnCount(btnCount + 1);
      }

      if (btnCount === 1) {
        toast.success("Details added...!");
      } else {
        toast.success("Details already added...!");
      }
    }
  };

  const handlePay = () => {
    console.log("vvv", verifiedPassengersData);
    console.log("Handle Pay......", verifiedUserData);
    console.log("Handle Pay User DAta", userData);
    if (
      userLogin &&
      (verifiedUserData ||
        (userData.email != "" &&
          userData.code != "" &&
          userData.mobileNumber)) &&
      verifiedPassengersData
    ) {
      setTimeout(() => {
        handleNext();
      }, 1000);
    } else if (verifiedUserData && !userLogin) {
      Swal.fire({
        title: "Login Required",
        text: "Please Login to proceed with the payment...!",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
      setTimeout(() => {
        navigation("/Login");
      }, 2200);
    } else {
      toast.error("Fill the Details OR Save the Details...");
    }
  };

  const { ticketPriceEconomyClass } = SelectedFlightData;
  const { travelTime } = SelectedFlightData;
  console.log("SelectedFlightData", ticketPriceEconomyClass);

  let passengersCount = Object.keys(passengers).length;

  let taxes = 1100 * passengersCount;
  console.log("Taxes", taxes);
  let baseFare = (ticketPriceEconomyClass - 1000) * passengersCount;
  console.log("base fire", baseFare);
  return (
    <div className="BookingContainer">
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
          <Button className="ChangeButton px-3" onClick={handlePrev}>
            <span className="d-flex align-items-center gap-1">
              <MdOutlineArrowBackIos />
              Go Back
            </span>
          </Button>
        </div>
      </div>

      <div className="px-5 d-flex gap-4">
        <div className="BookingLeftPart p">
          <div className="d-flex justify-content-between px-3 py-2 w-60 bg-white">
            <div className="d-flex align-items-center gap-2">
              <HiHandThumbUp color="blue" size={25} />
              <p>You got best price available!</p>
            </div>

            <div className="text-center">
              <p>Final Price</p>
              <h5>
                <BiRupee />
                {ticketPriceEconomyClass * passengersCount}
              </h5>
            </div>
          </div>

          <div className="py-4 d-flex gap-2 text-white">
            <RiFlightTakeoffLine size={25} />
            <h5> Review Flight Details</h5>
          </div>

          <div className="flightDetailsBox h-auto bg-white text-black  p-3">
            <div className="d-flex w-60 justify-content-between py-3 px-4 bg-[#eeeeee]">
              <h6 className="d-flex align-items-center gap-1">
                <RiFlightTakeoffLine size={25} />
                {fromcityname}-{tocityname}
              </h6>
              <h5 className="d-flex align-items-center gap-1">
                <IoMdAlarm />
                {travelTime}
              </h5>
              <button className="defaultButton">Exclusive Deal</button>
            </div>

            <CustomizedTabs
              props={SelectedFlightData}
              passengersCount={passengersCount}
              baseFare={baseFare}
              taxes={taxes}
            />
          </div>

          <div className="py-4 d-flex bookingPageHeadings gap-2 text-white">
            <FaUser size={20} />
            <h5> Contact Details</h5>
          </div>

          <div className="d-flex flex-column userDetails">
            <Form
              noValidate
              validated={validatedUserData}
              className="d-flex flex-column"
              onSubmit={handleSubmit}
            >
              <div className="userDetails">
                <Form.Group md="4" controlId="validationCustom01">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                  >
                    <Form.Control
                      type="email"
                      required
                      list="list"
                      value={userData.email}
                      pattern="[a-zA-Z0-9]+@[a-zA-Z]*\.com"
                      onChange={(e) => {
                        setButtonColour(false);
                        setBtnCount(1);
                        setUserData({ ...userData, email: e.target.value });
                      }}
                      placeholder="name@example.com"
                      autoComplete="off"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid email address.
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>

                <Form.Group md="4" controlId="validationCustom02">
                  <Form.Select
                    size="sm"
                    required
                    value={userData.code}
                    style={{ width: "100px", height: "58px" }}
                    onChange={(e) => {
                      setButtonColour(false);
                      setBtnCount(1);
                      setUserData({ ...userData, code: e.target.value });
                    }}
                  >
                    <option value="">Code</option>
                    <option value="+91">+91</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Please select a code.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group md="4" controlId="validationCustom03">
                  <FloatingLabel controlId="floatingInput" label="Phone">
                    <Form.Control
                      type="text"
                      placeholder="Number"
                      pattern="[6-9][0-9]{9}"
                      required
                      value={userData.mobileNumber}
                      onChange={(e) => {
                        setButtonColour(false);
                        setBtnCount(1);
                        setUserData({
                          ...userData,
                          mobileNumber: e.target.value,
                        });
                      }}
                      autoComplete="off"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid 10-digit phone number.
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
              </div>
              <div className="ps-3">
                <MdOutlineErrorOutline size={15} /> Your booking details will be
                sent to this email address
              </div>
              <div className=" d-flex justify-content-center pt-2">
                {" "}
                <button
                  className="saveBtn"
                  onSubmit="submit"
                  style={{ backgroundColor: buttonColour ? "Green" : "blue" }}
                >
                  Save
                </button>
              </div>
            </Form>
          </div>

          <div className="py-4 d-flex bookingPageHeadings gap-2 text-white">
            <FaUser size={20} />
            <h5>Enter Traveller Details</h5>
          </div>

          <AddingUser
            verifiedPassengersData={verifiedPassengersData}
            setVerifiedPassengersData={setVerifiedPassengersData}
          />

          <div className="TicketPriceBox">
            <div className="d-flex align-items-center gap-2">
              <IoShieldCheckmarkSharp size={30} />
              <div>
                <h6>Travell Ticket Amount</h6>
                <p>for all passengers</p>
              </div>
            </div>
            <div>
              <p className="float-end">You pay</p>
              <h5>
                <BiRupee />
                {ticketPriceEconomyClass * passengersCount}
              </h5>
            </div>
          </div>

          <div className="PaymentButton">
            <div>
              <button className="btn btn-grad" onClick={handlePay}>
                Proceed To Payment <MdOutlineArrowForward />
              </button>
            </div>

            <p className="text-white">
              By selecting pay now, I agree to the Booking{" "}
              <u>Terms and Conditions</u> and <u>Privacy Policy</u>
            </p>
          </div>
        </div>
        <div className="BookingRightPart">
          <div className="priceCard">
            <div className="d-flex gap-2 py-3 text-white ">
              <FcViewDetails size={25} />
              <h5>Price Details</h5>
            </div>
            <div className="flight-fare">
              <div className="priceCardRows">
                <span>Base Fare ( Passenger)</span>
                <span>
                  <BiRupee size={20} />
                  {baseFare}
                </span>
              </div>
              <div className="priceCardRows">
                <span>Taxes ( Passenger)</span>
                <span>
                  <BiRupee size={20} />
                  {taxes}
                </span>
              </div>
              <div className="line"></div>
              <div className="priceCardRows fw-bolder fs-6 text-dark">
                <span className="">Total Fare</span>
                <span>
                  <BiRupee size={20} />
                  {baseFare + taxes}
                </span>
              </div>
              <div className="priceCardRows text-danger">
                <span>Insurance(Not included) </span>
                <span>
                  <BiRupee size={20} />0
                </span>
              </div>
              <div className="priceCardRows">
                <span>Sub Total</span>
                <span>
                  <BiRupee size={20} />
                  {baseFare + taxes}
                </span>
              </div>
              <div className="priceCardRows text-success fw-bold">
                <span>Coupon Applied</span>
                <span>
                  <BiRupee size={20} />
                  {100 * passengersCount}
                </span>
              </div>
              <div className="priceCardRows fw-bold fs-5 py-1 text-primary">
                <span>You Pay</span>
                <span>
                  <BiRupee size={20} />
                  {ticketPriceEconomyClass * passengersCount}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightBooking;
