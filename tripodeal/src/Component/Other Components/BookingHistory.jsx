import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import BookingHistoryCard from "./BookingHistoryCard";
import BookingPageFlightCard from "../FlightBookingTabItems/BookingPageFlightCard";

const BookingHistory = () => {
  let d = localStorage.getItem("alldetails");
  console.log("DDDDDDDDDDDD",d)
  let details=[]
  if (d != undefined) {
    details = JSON.parse(d);
    console.log("All details...", details);
  }
  const [showPast, setshowPast] = useState(true);
  console.log("PST",showPast)


  let pastBooking=[];
  let upcomingBooking=[];

  
  const currentDate = new Date().toISOString().split("T")[0];

  details.map((item)=>{
    if(item.bookingDate<currentDate){
        pastBooking.push(item)
    }
    else{
        upcomingBooking.push(item)
    }
  })

  let pastBookingLength=pastBooking.length;
  let upComingBookingLength=upcomingBooking.length;
  return (
    <div className="bookingHistoryContainer">
    {d!=undefined?<Card className="bookingDetailsCard">
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Card.Header> <Col >
      <Nav variant="pills" >
        <Nav.Item>
          <Nav.Link
            eventKey="first"
            onClick={()=>setshowPast(true)}
            className="text-decoration-none colour-inherit"
          >
            Completed
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="second"
            onClick={()=>setshowPast(false)}
            className="text-decoration-none colour-inherit"
          >
            Upcoming
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Col></Card.Header>
      <Card.Body>
       

        <Col  className="tabs2">
          <Tab.Content>
            <Tab.Pane eventKey="first">
            {pastBookingLength>0? pastBooking.map((item)=> <BookingHistoryCard props={item} showPast={showPast}/>):<p>No Bookings Found</p>}
           
            
            </Tab.Pane>
            <Tab.Pane eventKey="second">{upComingBookingLength>0? upcomingBooking.map((item)=> <BookingHistoryCard props={item} showPast={showPast}/>):<p>No Bookings Found</p>}</Tab.Pane>
          </Tab.Content>
        </Col>
      </Card.Body>
    </Tab.Container>
  </Card>:<p>No Items Left</p>}
      
    </div>
  );
};

export default BookingHistory;
