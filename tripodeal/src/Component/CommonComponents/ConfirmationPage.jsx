import React from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { useContext } from "react";
import UserContext from "../Context/Context";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import emailjs from "emailjs-com";
import axios from "axios";
const ConfirmationPage = () => {
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
    setCurrentStep,
  ] = useContext(UserContext);

  const navigate = useNavigate();

  let passengersCount = Object.keys(passengers).length;

  const seatDetails = [];
  const { ticketPriceEconomyClass } = SelectedflightData;
  let amount = ticketPriceEconomyClass * passengersCount;
  let passengerDetailsForDB = [...passengers];

  console.log("SEAT,", typeof seatDetails);

  // Maintain a set of unique seat numbers globally
  const generatedCombinations = new Set();

  for (let i = 0; i < passengersCount; i++) {
    const randomUniqueCombination = generateUniqueRandomCombination(
      generatedCombinations
    );
    seatDetails.push(randomUniqueCombination);
  }

  // ...

  function generateUniqueRandomCombination(generatedCombinations) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";

    // generate the random character and random number
    const randomCharacter = characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
    const randomNumber = numbers.charAt(
      Math.floor(Math.random() * numbers.length)
    );

    const combination = randomCharacter + randomNumber;

    // It checks if the combination has already been generated
    if (!generatedCombinations.has(combination)) {
      generatedCombinations.add(combination);
      return combination;
    } else {
      return generateUniqueRandomCombination(generatedCombinations);
    }
  }

  function generateTransactionId(existingIds) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const idLength = 12;

    // Add timestamp to ensure uniqueness
    const timestamp = Date.now().toString();

    let transactionId = "";

    do {
      // Generate random characters
      for (let i = 0; i < idLength - timestamp.length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        transactionId += characters.charAt(randomIndex);
      }

      // Combine timestamp with random characters
      transactionId = timestamp + transactionId;
    } while (existingIds.has(transactionId));

    // Add the new ID to the set of existing IDs
    existingIds.add(transactionId);

    return transactionId;
  }

  const existingIds = new Set();
  const transactionId = generateTransactionId(existingIds);





  function generateBookingReference(existingReferences) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const referenceLength = 8;

    let bookingReference = "";

    do {
      // Generate a new booking reference
      for (let i = 0; i < referenceLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        bookingReference += characters.charAt(randomIndex);
      }
    } while (existingReferences.has(bookingReference));

    // Add the new reference to the set of existing references
    existingReferences.add(bookingReference);

    return bookingReference;
  }

  const existingReferences = new Set();
  const bookingReferenceNumber = generateBookingReference(existingReferences);



  const fullData = {
    bookingReferenceNumber: bookingReferenceNumber,
    seatDetails: seatDetails,
    airlinename: SelectedflightData.flights.airlines.airlinename,
    flightNumber: SelectedflightData.flights.flightNumber,
    flightStatus: SelectedflightData.flights.flightStatus,
    fromcityname: fromcityname,
    tocityname: tocityname,
    travelDate: TravelDate,
    amountPaid: ticketPriceEconomyClass * passengersCount,
    transactionId: transactionId,
  };

  console.log("FULL OBJECT>>>>>>>>>>>>", fullData);

  console.log("PASS------", passengers);
  var labels = ["age", "name", "seatNumber"];
  let fullname = "";
  var values = [];
  passengers.map((object, index) => {
    fullname = object.title + " " + object.firstName + object.lastName;
    values.push({
      age: object.age,
      name: fullname,
      seatNumber: seatDetails[index],
    });
  });

  const getPassengerDetails = (labels, values) => {
    return values.map((valueObject, index) => ({
      serialNumber: index + 1,
      label: labels,
      values: labels.map((label) => ({
        label,
        value: valueObject[label] !== undefined ? valueObject[label] : "N/A",
      })),
    }));
  };

  let passengerDetails = getPassengerDetails(labels, values);
  console.log("ALLLLLLLLL.........", passengerDetails);

  const handleSubmit = () => {
    const templateParams = {
      name: username.username,
      email: userData.email,
      bookingReferenceNumber: bookingReferenceNumber,
      airlinename: SelectedflightData.flights.airlines.airlinename,
      flightNumber: SelectedflightData.flights.flightNumber,
      flightStatus: SelectedflightData.flights.flightStatus,
      fromcityname: fromcityname,
      tocityname: tocityname,
      travelDate: TravelDate,
      amountPaid: amount,
      transactionId: transactionId,
    };
    console.log(templateParams);
    emailjs
      .send(
        "service_lpbg074",
        "template_p9qsgtw",
        templateParams,
        "3hZQGlPVQgz_uLz-Q"
      )
      .then((result) => {
        Swal.fire({
          title: "Done",
          text: " ✈️Ticket send to email...🎊",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        console.error(error.text);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "An error occurred while sending. Please try again.",
        });
      });
    setCurrentStep(0);
    console.log("STTTTEEEEEPPPPPP", currentStep);
    setToCityname("");
    setFromCityname("");
    navigate("/");
  };

  passengerDetailsForDB.forEach((obj) => delete obj.age);
  passengerDetailsForDB.forEach((obj) => (obj.transcationId = transactionId));
  const date = localStorage.getItem("date");
  const userdetails = {
    bookingDate: date,
    numPassengers: passengersCount,
    totalPrice: amount,
    status: SelectedflightData.flights.flightStatus,
    passengerDetails: passengerDetailsForDB,
  };

  const postData = () => {
    const url = `http://localhost:8080/booking/${username.email}/${SelectedflightData.routeId}`;
    axios
      .post(url, userdetails)
      .then((response) => {
        console.log("REsponse....", response);
      })
      .catch((e) =>
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: e.response.data,
        })
      );
  };

  console.log("FINAL OBJECT>!!!!!}}}}}}}}]", userdetails);
  postData();

  return (
    <Container className="my-5 d-flex flex-column  align-items-center">
      <Row className="w-50">
        <Col>
          <h2>Booking Confirmation</h2>
          <p>Your flight booking has been confirmed successfully!</p>
          <p>
            <strong>Booking Reference Number:</strong> {bookingReferenceNumber}
          </p>
          <p>
            <strong>Seats :</strong>
            {seatDetails.join(",")}
          </p>
          <p>
            <strong>Passengers:</strong>
          </p>

          <div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>SNo</th>
                  <th>Name </th>
                </tr>
              </thead>
              <tbody>
                {passengers.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>

                    <td>
                      {item.passengerFirstName} {item.passengerLastName}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <p>
            <strong>Flight Details:</strong>
          </p>
          <ul>
            <li>
              <strong>Airline:</strong>{" "}
              {SelectedflightData.flights.airlines.airlinename}
            </li>
            <li>
              <strong>Flight Number:</strong>{" "}
              {SelectedflightData.flights.flightNumber}
            </li>
            <li>
              <strong>Flight Status:</strong>{" "}
              {SelectedflightData.flights.flightStatus}
            </li>
            <li>
              <strong>Departure:</strong> {fromcityname}
            </li>
            <li>
              <strong>Destination:</strong> {tocityname}
            </li>
            <li>
              <strong>Departure Date</strong> {TravelDate}
            </li>
          </ul>
          <p>
            <strong>Payment Details:</strong>
          </p>
          <ul>
            <li>
              <strong>Total Amount Paid: </strong>{" "}
              {ticketPriceEconomyClass * passengersCount}
            </li>

            <li>
              <strong>Transaction ID:</strong> {transactionId}
            </li>
          </ul>
          <p>
            <strong>Additional Information:</strong>
            <ul>
              <li>
                Please arrive at the airport at least 2 hours before the
                departure time.
              </li>
              <li>Make sure to carry a valid government-issued photo ID.</li>
              <li>
                Ensure you have your boarding pass, either in printed form or
                accessible on your mobile device.
              </li>
              <li>
                International travelers: Have a valid passport and any required
                visas.
              </li>
              <li>
                Confirm your check-in status and details. Complete online
                check-in if available.
              </li>
            </ul>
          </p>
          <p>
            Thank you for choosing
            <strong>{SelectedflightData.flights.airlines.airlinename}</strong> !
            We look forward to serving you on board. Your e-ticket has been sent
            to your email address. Please keep it handy for check-in and
            boarding.
          </p>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Button variant="primary" onClick={handleSubmit}>
            Go to Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ConfirmationPage;
