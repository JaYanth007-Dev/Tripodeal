import React from "react";
import travelseesLogo from "../../Assets/travelsees_logo.png";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import "../../App.css";
import reviewImg from "../../Assets/footer-trustlogo_new.jpg";
import footerImg from "../../Assets/footer_card_icons.png";
import FlightSliderFilter from "./FlightSliderFilter";
import AddingUser from "./AddingUser";
import NotFoundPage from "../ErrorHandling/NotFoundPage";
import CountdownTimer from "../Counter/CountdownTimer";
import { Link } from "react-router-dom";



const Footer = () => {
  return (
    <div className="main-footer">
     
      <div className="footer">
        <div className="footer-column1">
          <div>
            <h6>Call Us</h6>
            <p>+91 8069-335-000</p>
            <p>+91 9953-888-840</p>
          </div>

          <div>
            <h6>Email</h6>
            <p>support@travelsees.com</p>
          </div>

          <div>
            <h6>TripOdeal is part of</h6>
            <img src={travelseesLogo} width={100} alt="logo"></img>
          </div>
        </div>

        <div className="footer-column">
          <h6>Book Now</h6>
          <p>Home</p>
          <p>Flight</p>
          <p>Hotel</p>
          <p>Travel Tips</p>
          <p>My Booking</p>
          <p>Domestic Airlines</p>
        </div>

        <div>
          <h6>Packages</h6>
          <p>Goa</p>
          <p>Kashmir</p>
          <p>Himachal</p>
          <p>Kerala</p>
          <p>Dubai</p>
          <p>All Packages</p>
        </div>

        <div>
          <h6>Support</h6>
          <p>About Us</p>
          <p><Link to="/ContactUs">Contact</Link> </p>
          <p>Privacy Policy</p>
          <p>Terms & Conditions</p>
        </div>

        <div className="Footericons">
          <h6>Make Payment</h6>
          <h6>Follow Us</h6>
          <FaFacebookSquare size={30} />
          <FaInstagramSquare size={30} />
          <IoLogoYoutube size={35} />
        </div>
      </div>
      <div className="downFooter">
        <img src={reviewImg} width="700px"></img>
        <img src={footerImg} width="650px"></img>
        <p style={{ color: "grey" }}>
          {" "}
          &#169; 2023 Travelsees. All Rights Reserved.
        </p>
      </div>
  
    </div>
  );
};

export default Footer;
