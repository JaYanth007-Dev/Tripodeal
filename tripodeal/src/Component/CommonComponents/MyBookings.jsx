import React from "react";
import UserContext from "../Context/Context";
import { useContext, useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import reqImage from "../../Assets/login-required.jpg";
import Form from "react-bootstrap/Form";
import { FaPencilAlt, FaUser } from "react-icons/fa";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import { FaCalendarAlt } from "react-icons/fa";
import BookingHistory from "../Other Components/BookingHistory";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import verifyUser from "./VerifyUser";

const MyBookings = () => {
  const email = useRef(null);
  const password = useRef(null);
  const usernames = useRef(null);
  const [errorMessage, setErrorMessage] = useState({});
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
  let ar = [];
  ar.push(`${username.username}`);
  console.log("Bookingsss", ar);
  const [edit, setEdit] = useState(true);
  const [usernameedit, setusernameEdit] = useState(true);
  const [passwordedit, setpasswordEdit] = useState(true);

  const verifyPassword = () => {
    var rex = new RegExp(
      "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$"
    );
    let strPasword = password.current.value;

    if (strPasword === "") {
      setErrorMessage({ ...errorMessage, password: "Password Required" });
    } else if (!rex.test(strPasword)) {
      setErrorMessage({
        ...errorMessage,
        password: `Passwords must contain:
            \na minimum of 1 lower case letter [a-z] and.
            \na minimum of 1 upper case letter [A-Z] and.
            \na minimum of 1 numeric character [0-9] and.
            \na minimum of 1 special character:!`,
      });
    } else {
      setErrorMessage({ ...errorMessage, password: "" });
    }
  };
  const verifyUsername = () => {
    var rex = new RegExp("^[a-zA-Z0-9]+$");
    let strPasword = usernames.current.value;

    if (strPasword === "") {
      setErrorMessage({ ...errorMessage, username: "Username Required" });
    } else if (!rex.test(strPasword)) {
      setErrorMessage({
        ...errorMessage,
        username: "User name contains Alphabets and numbers",
      });
    } else {
      setErrorMessage({ ...errorMessage, username: "" });
    }
  };

  const handleChangeUsername = (e) => {
    handleInput(e);
    verifyUsername();
  };

  const handleChangePassword = (e) => {
    handleInput(e);
    verifyPassword();
  };
  const [updatedDetails, setUpdatedDetails] = useState({
    username: username.username,
    email: username.email,
    password: username.password,
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUpdatedDetails({ ...updatedDetails, [name]: value });
  };

  const [count, setcount] = useState(1);
  if (count <= 2) {
    if(userLogin){
      verifyUser()
      setcount(count + 1);
    }
  }

  function stringAvatar(name) {
    if (!name) {
      return {
        sx: {
          bgcolor: "#000", // Set a default color or handle this case as needed
        },
        children: "",
      };
    }

    let hash = 0;
    let i;

    for (i = 0; i < name.length; i += 1) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    const firstName = name.split(" ")[0];
    const lastName = name.split(" ")[1];

    return {
      sx: {
        bgcolor: color,
      },
      children: `${firstName ? firstName[0] : ""}${
        lastName ? lastName[0] : ""
      }`,
    };
  }

  const updateUser = () => {
    console.log("UPDATED DETAILS", updatedDetails);
    console.log("INSIDE", errorMessage.password);
    if (errorMessage.password == "" && errorMessage.username == "") {
      const url = "http://localhost:8080/updateUser";
      axios
        .put(url, updatedDetails)
        .then((response) => {
          console.log("REsponse....", response);
          if (response.status == 200 && response.data != "") {
            Swal.fire({
              icon: "success",
              title: "User Details Updated",
            });
            setcount(1);
          }
          setEdit(!edit);
          setpasswordEdit(true);
          setusernameEdit(true);
        })
        .catch((e) =>
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Not Updated",
          })
        );
    } else {
      Swal.fire({
        icon: "error",
        title: "Fill all the Details",
        text: "Not Updated",
      });
    }
  };

  let name = username.username || "";

  return (
    <div className="myBookingsContainer">
      {username.username != undefined ? (
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3} className="tabs">
              <Nav variant="pills" className="flex-column">
                <Nav.Item className="cc">
                  <Avatar {...stringAvatar(name)} />
                </Nav.Item>
                <Nav.Item className="pt-4">
                  <Nav.Link
                    eventKey="first"
                    className="text-decoration-none colour-inherit"
                  >
                    <div className="d-flex align-items-center gap-2">
                      <FaUser /> Profile
                    </div>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="second"
                    className="text-decoration-none colour-inherit"
                  >
                    <div className="d-flex align-items-center gap-2">
                      <FaCalendarAlt /> Bookings
                    </div>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9} className="tabs2">
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <div>
                    <Form
                      className="myBookingsBox"
                      onSubmit={(event) => {
                        event.preventDefault();
                      }}
                    >
                      <h4>
                        <FaUser size={20} /> Profile
                      </h4>

                      <div className="d-flex align-items-center gap-2">
                        <div className="w-100">
                          {" "}
                          <Form.Group
                            className="mb-2"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                              type="text"
                              name="username"
                              disabled={usernameedit}
                              ref={usernames}
                              value={updatedDetails.username}
                              onChange={handleChangeUsername}
                              placeholder="Username"
                              required
                            />
                            <div className="errorMessage">
                              {errorMessage.username}
                            </div>
                          </Form.Group>
                        </div>

                        <div className="pt-3">
                          {" "}
                          <FaPencilAlt
                            size={20}
                            className=""
                            onClick={() => {
                              setEdit(false);
                              setusernameEdit(!usernameedit);
                            }}
                          />
                        </div>
                      </div>

                      <div className="emailInput">
                        <Form.Group
                          className="mb-3 w-100"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>Email address</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            readOnly
                            value={updatedDetails.email}
                            ref={email}
                            required
                            placeholder="name@example.com"
                          />
                          <div className="errorMessage">
                            {errorMessage.email}
                          </div>
                        </Form.Group>
                      </div>

                      <div className="d-flex align-items-center gap-2">
                        <div className="w-100">
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                              type="password"
                              name="password"
                              disabled={passwordedit}
                              autoComplete="off"
                              onChange={handleChangePassword}
                              ref={password}
                              required
                              placeholder="Password"
                            />
                            <div className="errorMessage">
                              {errorMessage.password}
                            </div>
                          </Form.Group>
                        </div>

                        <div className="pt-3">
                          {" "}
                          <FaPencilAlt
                            size={20}
                            onClick={() => {
                              setpasswordEdit(!passwordedit);
                              setEdit(false);
                            }}
                          />
                        </div>
                      </div>

                      <div className="loginBtn">
                        {!edit ? (
                          <button
                            type="button"
                            className="btn-grad"
                            onClick={() => {
                              updateUser();
                              console.log(updatedDetails);
                            }}
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            className="btn-grad"
                            onClick={() => {
                              setEdit(!edit);
                              setErrorMessage({})
                              setpasswordEdit(!passwordedit);
                              setusernameEdit(!usernameedit);
                            }}
                          >
                            Edit
                          </button>
                        )}
                      </div>
                    </Form>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <BookingHistory />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      ) : (
        <div className="d-flex flex-column justify-content-center align-items-center loginRequiredBox">
          <h4>LOGIN REQUIRED</h4>
          <img src={reqImage} width={500}></img>
          <button
            className="btn-grad"
            onClick={() => {
              navigate("/Login");
            }}
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
