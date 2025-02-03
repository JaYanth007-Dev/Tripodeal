import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { MdDelete } from "react-icons/md";
import UserContext from "../Context/Context";

import { toast } from "react-toastify";
const AddingUser = (props) => {
  const setVerifiedPassengersData = props.setVerifiedPassengersData;
 
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

  

  function calculateAge(dOB) {
    var parts = dOB.split("-");
    console.log("parts", typeof dOB);
    var date = new Date();
    var age = date.getFullYear() - parts[0];
    var month = date.getMonth() + 1;

    if (month < parts[1] || (month === parts[1] && date.getDate() < parts[2])) {
      age--;
    }
    return age;
  }

  const [validated, setValidated] = useState(false);
  const [btnCount, setBtnCount] = useState(1);


  const handleAddPassenger = () => {
    setButtonColour(false);
    setBtnCount(1);

    setVerifiedPassengersData(false);
    setPassengers([
      ...passengers,
      {
        abbrivation: "",
        passengerFirstName: "",
        passengerLastName: "",
        seatClass: "",
        passengerDOB: "",
        age: "",
      },
    ]);
  };

  
  const handleInputChange = (event, index) => {
    setButtonColour(false);
    setBtnCount(1);

    const { name, value } = event.target;
    const updatedPassengers = [...passengers];
    if (name === "passengerDOB") {
      updatedPassengers[index].age = calculateAge(value);
    }
    updatedPassengers[index][name] = value;
    setPassengers(updatedPassengers);
  };

  const handleDeleteInput = (index) => {
    const newArray = [...passengers];
    newArray.splice(index, 1);
    setPassengers(newArray);
  };
  const [buttonColour, setButtonColour] = useState(false);

  //   Form Validation
  let functioncallCount = 0;
  const handleSubmit = (event) => {
    console.log("FUNTION CALL", functioncallCount);
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true); // set to true only if form is validated
    } else {
      setVerifiedPassengersData(true);
      setValidated(false); // set to false to clear previous validation messages
      if (btnCount == 1) {
        setButtonColour(!buttonColour);
        setBtnCount(btnCount + 1);
        toast.success("Details added...!");
      } else {
        toast.success("Details already added...!");
      }
    }
  };
console.log("PASSENGERS......!",passengers)
  return (
    <div className="userDetailsContainer">
      <div>
        <button
          className="addPassengerBtn"
          type="button"
          onClick={handleAddPassenger}
        >
          Add Passenger
        </button>
      </div>

      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className="d-flex flex-column gap-3"
      >
        {passengers.map((passenger, index) => (
          <div key={index} className="d-flex gap-3 ps-5">
            <div className="d-flex flex-column gap-1 border border-primary rounded-3 p-3 pb-4 ">
              <div className="d-flex w-auto gap-5 ps-3">
                <Form.Group md="4" controlId="validationCustom01">
                  <Form.Select
                    size="sm"
                    name="abbrivation"
                    style={{ width: "180px", height: "58px" }}
                    onChange={(event) => handleInputChange(event, index)}
                    required
                  >
                    <option value="">Title</option>
                    <option value="Mr">Mr</option>
                    <option value="Ms">Ms</option>
                    <option value="Mrs">Mrs</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Select a value.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group md="4" controlId="validationCustom02">
                  <FloatingLabel
                    controlId="floatingFirstName"
                    label="First Name"
                    required
                    style={{ width: "200px", height: "58px" }}
                  >
                    <Form.Control
                      name="passengerFirstName"
                      type="text"
                      placeholder="First Name"
                      pattern="[A-Za-z ]+"
                      value={passenger.passengerFirstName}
                      autoComplete="off"
                      onChange={(event) => handleInputChange(event, index)}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid first name.
                    </Form.Control.Feedback>
                  </FloatingLabel>
                  <Form.Control.Feedback type="invalid">
                    Please Enter the value
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group md="4" controlId="validationCustom03">
                  <FloatingLabel
                    controlId="floatingLastName"
                    label="Last Name"
                    pattern="[A-Za-z ]+"
                    required
                    style={{ width: "200px", height: "58px" }}
                  >
                    <Form.Control
                      name="passengerLastName"
                      type="text"
                      placeholder="Last Name"
                      value={passenger.passengerLastName}
                      autoComplete="off"
                      onChange={(event) => handleInputChange(event, index)}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid last name.
                    </Form.Control.Feedback>
                  </FloatingLabel>
                  <Form.Control.Feedback type="invalid">
                    Please Enter the value
                  </Form.Control.Feedback>
                </Form.Group>
              </div>

              <div className="d-flex gap-5 w-auto ps-3">
                <Form.Group md="4" controlId="validationCustom04">
                  <Form.Select
                    size="sm"
                    name="seatClass"
                    style={{ width: "180px", height: "58px" }}
                    onChange={(event) => handleInputChange(event, index)}
                    required
                  >
                    <option value="">Seat Class</option>
                    <option value="Economy Class">Economy Class</option>
                    <option value="Bussiness Class">Business Class</option>
                    <option value="First Class">First Class</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Please Select the value
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group md="4" controlId="validationCustom05">
                  <FloatingLabel
                    controlId="floatingDateOfBirth"
                    label="Date of Birth"
                    style={{ width: "200px", height: "58px" }}
                  >
                    <Form.Control
                      name="passengerDOB"
                      type="date"
                      value={passenger.passengerDOB}
                      autoComplete="off"
                      onChange={(event) => handleInputChange(event, index)}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid date of birth.
                    </Form.Control.Feedback>
                  </FloatingLabel>
                  <Form.Control.Feedback type="invalid">
                    Please Enter the value
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
            </div>

            {passengers.length > 1 && (
              <MdDelete
                className="mt-5"
                onClick={() => handleDeleteInput(index)}
                size={25}
              />
            )}
          </div>
        ))}
        <div className="d-flex justify-content-center">
          <button
            type="submit"
            className="saveBtn"
            style={{ backgroundColor: buttonColour ? "green" : "blue" }}
            onClick={() => console.log(passengers)}
          >
            Save
          </button>
        </div>
      </Form>
    </div>
  );
};

export default AddingUser;
