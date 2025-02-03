import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import AOS from "aos";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import React, { useContext} from "react";
import { BiSolidUserCircle } from "react-icons/bi";
import logo from "../../Assets/tripodeal_logo_ctm.png";
import UserContext from "../Context/Context";
import { Link, useNavigate } from "react-router-dom";
const Header2 = () => {
 
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
  ] = useContext(UserContext);
  const navigate = useNavigate();
  // let {name}=username;
  console.log("Header LOGIN ,", username);

localStorage.setItem('alldetails',JSON.stringify( username.bookings));
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} alt="logo" width={140}></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto ms-auto my-2 my-lg-0"
            id="navbar"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Link
              to="/"
              onClick={() => {
                setShowLogin(false);
                setShowSignUp(false);
              }}
            >
              HOME
            </Link>
            <Link to="/Flights">FLIGHT</Link>
            <Link to="/Hotel">HOTEL</Link>
            <Link to="/Bus">BUS</Link>
            <Link to="/Packages">PACKAGES</Link>
          </Nav>

          <div className="userInfo">
            {userLogin ? <div id="username">{username.username}</div> : ""}

            <div className="LoginDropdown">
              <BiSolidUserCircle size={40} />
              <NavDropdown title="MY ACCOUNT" id="navbarScrollingDropdown">
              <NavDropdown.Item><Link to="/MyBookings">My Booking </Link></NavDropdown.Item>

                {userLogin ? (
                  <div>
                    <NavDropdown.Item
                      onClick={() => {
                        setUserLogin(false);
                        setusername({});
                        setLoginData({})

                      }}
                    >
                      <Link to="/">Logout</Link>
                    </NavDropdown.Item>
                  </div>
                ) : (
                  <div>
                    <NavDropdown.Item
                      onClick={() => {
                        setShowLogin(true);
                        setShowSignUp(false);
                      }}
                    >
                      <Link to="/Login">Login </Link>
                    </NavDropdown.Item>

                    <NavDropdown.Divider />

                    <NavDropdown.Item
                      onClick={() => {
                        setShowLogin(false);
                        setShowSignUp(true);
                        console.log(showLogin, showSignUp);
                      }}
                    >
                      <Link to="/SignIn">Sign Up </Link>
                    </NavDropdown.Item>
                  </div>
                )}
              </NavDropdown>
            </div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header2;
