import { useContext } from "react";
import React from "react";
import Body from "../CommonComponents/Body";
import UserContext from "../Context/Context";
import FlightSearchBox from "../FlightSearchBox";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { MdOutlineFlight } from "react-icons/md";
import DataComponent from "../DataComponent";
import Accordian from "../FilterAccordion";
import SlickSlider from "./SlickSlider";
import FlightCard from "./FlightCard";
const FlightPage = () => {
  localStorage.clear();
  const [
    showLogin,
    setShowLogin,
    showSignUp,
    setShowSignUp,
    fromcityname,
    setFromCityname,
    tocityname,
    setToCityname,
  ] = useContext(UserContext);

  return (
    <div>
      <div className="FlightContainer">
        <div className="BookingBox">Book Flights from {fromcityname}</div>
        <FlightSearchBox />
      </div>
      <div>
        <h5 style={{ textAlign: "center", padding: "20px 0px" }}>
          Top Destinations from {fromcityname}
        </h5>

        <div className="flightCard">
          {Array(9)
            .fill("")
            .map((e) => (
              <Card
                style={{
                  width: "14rem",
                  height: "",
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                }}
              >
                <Card.Body className="d-flex items-center gap-4">
                  <div>
                    {" "}
                    <h6>
                      BOM <MdOutlineFlight /> DEL
                    </h6>
                    <Card.Text style={{ fontSize: "11px" }}>
                      Mumbai to New Delhi
                    </Card.Text>
                  </div>
                  <div className="py-2">
                    {" "}
                    <Button style={{ padding: "2px 10px" }}>View</Button>
                  </div>
                </Card.Body>
              </Card>
            ))}
        </div>
      </div>
      <div className="CalenderContainer">
        <h6>
          {fromcityname} to {tocityname} Fare Calender
        </h6>
        <hr></hr>
        <DataComponent />
      </div>
    </div>
  );
};

export default FlightPage;
