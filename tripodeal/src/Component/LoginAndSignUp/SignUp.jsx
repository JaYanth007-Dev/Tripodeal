import React from "react";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import "../../App.css";
import { useContext } from "react";
import UserContext from "../Context/Context";
import { useState, useRef } from "react";
import Swal from 'sweetalert2';
import Carousal2 from "../Carousal2";
import axios from "axios";

const SignUp = () => {
  const email = useRef(null);
  const password = useRef(null);
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

  const verifyEmail = () => {
    var rex = new RegExp("^[a-zA-Z0-9][a-zA-Z0-9.]+[@][a-z]+[.][a-z]+$");
    let strEmail = email.current.value;

    if (strEmail === "") {
      setErrorMessage({ ...errorMessage, email: "Email Required" });
    } else if (!rex.test(strEmail)) {
      setErrorMessage({ ...errorMessage, email: "Enter valid Email..." });
    } else {
      setErrorMessage({ ...errorMessage, email: "" });
    }
  };
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

  const setValue = (e) => {
    const { name, value } = e.target;
    setSignInData((pre) => ({ ...pre, [name]: value }));
  };
  const handleChangeEmail = (e) => {
    setValue(e);
    verifyEmail();
  };
  const handleChangePassword = (e) => {
    setValue(e);
    verifyPassword();
  };

  const RegisterUser = () => {
    console.log(username);
    if (errorMessage.email == "" && errorMessage.password == "") {
      const url = "http://localhost:8080/register";
      axios.post(url, SignIndata).then((response) => {
        console.log("REsponse....",response)
        if (response.status == 200) {
          Swal.fire({
            icon: 'success',
            title: 'User Registered',
          })
          navigate("/");
          setFromCityname("");
          setUserLogin(true);
          setusername(SignIndata);
        }
        else if(response.data.status==409){
          alert(response.data)
        }
      }).catch(e=>   Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: e.response.data,
      }));
    }
  };
  return (
    <div className="LoginPage">
      <Form
        className="LoginBox"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <h4>Sign Up</h4>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={SignIndata.username}
            onChange={setValue}
            placeholder="Username"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={SignIndata.email}
            onChange={handleChangeEmail}
            ref={email}
            required
            placeholder="name@example.com"
          />
          <div className="errorMessage">{errorMessage.email}</div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={SignIndata.password}
            onChange={handleChangePassword}
            ref={password}
            required
            placeholder="Password"
          />
          <div className="errorMessage">{errorMessage.password}</div>
        </Form.Group>

        <div className="loginBtn">
          <button className="btn-grad" onClick={RegisterUser}>
            Sign Up
          </button>
        </div>
        <p>Or Connect with a social network</p>

        <div className="socialIcons">
          <FaFacebookSquare size={30} />

          <FaInstagramSquare size={30} />
          <BiLogoGmail size={30} />
        </div>
      </Form>
      <Carousal2 />
    </div>
  );
};

export default SignUp;
