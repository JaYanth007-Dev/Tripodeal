import React, { useState, useRef, useContext } from "react";
import { Modal, Button, Form, Dropdown } from "react-bootstrap";
import UserContext from "../Context/Context";
import { authentication } from "../../firebases";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
const MobileVerificationModal = ({
  showModal,
  handleClose,
  handleNext,
  handlePayment,
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

  const [showOTPForm, setShowOTPForm] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);
  const otpInputRefs = useRef([...Array(6)].map(() => React.createRef()));
  const [code, setcode] = useState();


  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      authentication,
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
        "expired-callback": () => {},
      }
    );
  };

  const handleMobileSubmit = (e) => {
    e.preventDefault();
    // validation for mobile number
    if (!mobileNumber || !/^[0-9]+$/.test(mobileNumber)) {
      alert("Please enter a valid mobile number.");
    } else {
      //console.log("Mobile Numbeer",mobileNumber)
      // generateRecaptcha();
      // let appVerifier = window.recaptchaVerifier;
      // //setCode(appVerifier);
      // let phoneNumber = "+91" + mobileNumber;
      // console.log("Mobile Numbeer", phoneNumber);
      // signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
      //   .then((confirmationResult) => {
      //     window.confirmationResult = confirmationResult;

      //     setcode(confirmationResult);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
      // setShowOTPForm(true);
      handlePayment();
    }
  };

 

  const verifyOTP = () => {
    let otpCheck = otp.join("");
    let confirmationResult = window.confirmationResult;
    window.confirmationResult
      .confirm(otpCheck)
      .then((result) => {
        setOTP(["", "", "", "", "", ""]);
        setShowOTPForm(false);
        handleClose();
        handlePayment();
      })
      .catch((error) => {
        setOTP(["", "", "", "", "", ""]);
        alert("Wrong OTP");
      });
  };

  const handleOTPSubmit = (e) => {
    e.preventDefault();
    const enteredOTP = otp.join("");

    // Basic validation for OTP
    if (!/^[0-9]{6}$/.test(enteredOTP)) {
      alert("Please enter a valid 6-digit OTP.");
    }
    console.log("OTP", otp);
    verifyOTP();
  };

  const handleOTPChange = (index, value) => {
    // validation for OTP
    if (!/^[0-9]+$/.test(value)) {
      // If the value is not a digit, do not update the OTP state
      alert("Please enter a valid digit.");
      // return;
    }
  
    const newOTP = [...otp];
    newOTP[index] = value;
  
    setOTP(newOTP);
  
    // Move focus to the next input box
    if (value !== "" && index < otp.length - 1) {
      otpInputRefs.current[index + 1].current.focus();
    }
  
    // Handle backspace key
    if (value === "" && index > 0) {
      // Move focus to the previous input box
      otpInputRefs.current[index - 1].current.focus();
    }
  };
  

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Mobile Verification</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showOTPForm ? (
          <Form onSubmit={handleOTPSubmit}>
            <Form.Group controlId="formOTP">
              <Form.Label>Enter OTP</Form.Label>
              <div className="d-flex">
                {otp.map((digit, index) => (
                  <Form.Control
                    key={index}
                    ref={otpInputRefs.current[index]}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOTPChange(index, e.target.value)}
                    style={{ width: "2.5em", marginRight: "1em" }}
                  />
                ))}
              </div>
            </Form.Group>
            <div className="d-flex justify-content-start py-3">
              <Button type="submit" variant="primary">
                Submit OTP
              </Button>
            </div>
          </Form>
        ) : (
          <Form onSubmit={handleMobileSubmit}>
            <Form.Group controlId="formMobileNumber">
              <Form.Label>Code & Mobile Number</Form.Label>
              <div className="d-flex gap-2">
                <Form.Group md="4" controlId="validationCustom02">
                  <Form.Select
                    size="sm"
                    required
                    value={userData.code}
                    style={{ width: "100px", height: "58px" }}
                    onChange={(e) => {
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
                <Form.Control
                  type="tel"
                  placeholder="Enter mobile number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
              </div>
            </Form.Group>
            <div className="d-flex justify-content-center py-4">
              <Button type="submit" variant="primary">
                Continue
              </Button>
            </div>
          </Form>
        )}
      </Modal.Body>
      <div id="recaptcha-container" className="recaptcha"></div>
    </Modal>
  );
};

export default MobileVerificationModal;
