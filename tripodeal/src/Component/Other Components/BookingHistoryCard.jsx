import React from "react";
import { useState } from "react";
import { IoIosAirplane } from "react-icons/io";
import { Card, Button, Modal, Table } from "react-bootstrap";
import { SiChinasouthernairlines } from "react-icons/si";
import axios from "axios";
import Swal from "sweetalert2";
import verifyUser from "../CommonComponents/VerifyUser";
const BookingHistoryCard = ({ props, showPast }) => {
  // console.log("kkkkkkkkkkkkkk", props);

  const airlinename = props.routes?.flights?.airlines?.airlinename;
  const source = props.routes?.startAirport?.location;
  const destination = props.routes?.destinationAirport?.location;
  const date=props?.bookingDate;

  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleShowModal1 = () => setShowModal1(true);
  const handleCloseModal1 = () => setShowModal1(false);

  const passengers = props?.passengerDetails;

  const [count, setcount] = useState(1);
  if(count==1){
      verifyUser();
      setcount(count+1);
  }
  const handleCancellation=(id)=>{
    const url = `http://localhost:8080/deletePassenger/+${id}`;
    axios.delete(url)
    .then((response) => {
      console.log("Deleted Response........",response)
      if (response.status == 200 && response.data!= "") {
        Swal.fire({
          title: "Success",
          text: "Ticket Cancelled Successfully...!",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
       handleCloseModal()
       setcount(1);
      }
    }).catch((e)=>  Swal.fire({
      icon: 'error',
      title: 'Unable to Cancel',
      text: 'Oops',
      timer: 2000,
      showConfirmButton: false,
    }))
  }
  return (
    <div>
      {showPast ? (
        <Card className="bookingHistoryCard">
          <Card.Body className="d-flex justify-content-between align-items-center">
            <Card.Subtitle>
              <div>Airline </div>{" "}
              <p className="fw-bolder">
                <SiChinasouthernairlines /> {airlinename}
              </p>
            </Card.Subtitle>
            <Card.Subtitle className="text-muted">
              <div>
                <p>Source</p>
                <p className="fw-bolder text-danger">{source}</p>
              </div>
            </Card.Subtitle>

            <Card.Subtitle>
              <p>
                ...........
                <IoIosAirplane size={20} />
                ..........
              </p>
            </Card.Subtitle>
            <Card.Subtitle className="text-muted">
            <p>Destination</p>
            <p className="fw-bolder font-monospace text-primary">
            {destination}
            </p>
            </Card.Subtitle>
            
            <div className="d-flex flex-column gap-2"><h6>Travel Date</h6><p>{date}</p></div>
            <div>
              <Button className="viewPassengersBtn" onClick={handleShowModal1}>
                View Passengers
              </Button>
            </div>
          </Card.Body>
        </Card>
      ) : (
        <Card className="bookingHistoryCard">
          <Card.Body className="d-flex justify-content-between align-items-center">
            <Card.Subtitle>
              <div>Airline </div>{" "}
              <p className="fw-bolder">
                <SiChinasouthernairlines /> {airlinename}
              </p>
            </Card.Subtitle>
            <Card.Subtitle className="text-muted">
              <div>
                <p>Source</p>
                <p className="fw-bolder text-primary">{source}</p>
              </div>
            </Card.Subtitle>

            <Card.Subtitle>
              <p>
                ...........
                <IoIosAirplane size={20} />
                ..........
              </p>
            </Card.Subtitle>
            
            <Card.Subtitle className="text-muted">
              <p>Destination</p>
              <p className="fw-bolder font-monospace text-primary">
                {destination}
              </p>
            </Card.Subtitle>
            <div className="d-flex flex-column gap-2"><h6>Travel Date</h6><p>{date}</p></div>
            <div className="d-flex flex-column gap-2">
              <Button className="viewPassengersBtn" onClick={handleShowModal}>
                View Passengers
              </Button>
            </div>
           
          </Card.Body>
        </Card>
      )}

      {/* Passengers Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Passengers List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Seat Class</th>
                <th>Cancel Ticket</th>
              </tr>
            </thead>
            <tbody>
              {passengers.map((passenger, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>

                  <td>
                    {passenger.abbrivation} {passenger.passengerFirstName}{" "}
                    {passenger.passengerLastName}
                  </td>
                  <td>{passenger.seatClass}</td>
                  <td><button className="ticketCancelBtn" onClick={()=>{
                    handleCancellation(passenger.passengerId)
                  }}>Cancel Ticket</button></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>



      <Modal show={showModal1} onHide={handleCloseModal1}>
      {console.log("MODEL 2")}
        <Modal.Header closeButton>
          <Modal.Title>Passengers List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Seat Class</th>
              </tr>
            </thead>
            <tbody>
              {passengers.map((passenger, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>

                  <td>
                    {passenger.abbrivation} {passenger.passengerFirstName}
                    {passenger.passengerLastName}
                  </td>
                  <td>{passenger.seatClass}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal1}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BookingHistoryCard;
