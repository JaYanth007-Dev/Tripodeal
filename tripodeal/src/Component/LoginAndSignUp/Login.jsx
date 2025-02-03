import React from "react";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import "../../App.css";
import Carousal2 from "../Carousal2";
import Swal from "sweetalert2";
import axios from "axios";
import { useContext } from "react";
import UserContext from "../Context/Context";
import { useState, useRef,useEffect } from "react";

const Login = () => {
  const email = useRef(null);
  const password = useRef(null);
  const [errorMessage, setErrorMessage] = useState({});
  const [showPassword, setShowPassword] = useState(true);
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
 
  const inputValue = document.getElementById("inputField");
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
    setLoginData((pre) => ({ ...pre, [name]: value }));
  };
  const handle = (e) => {
    setValue(e);
    verifyEmail();
  };
  const handleChange = (e) => {
    setValue(e);
    verifyPassword();
  };
  const showingPassword = () => {
    setShowPassword(!showPassword);
    if (Logindata.password != "") {
      showPassword
        ? (inputValue.type = "text")
        : (inputValue.type = "password");
    }
  };
  const VerifyUser = () => {
    console.log("Verify USer Function in LOGIN PAGE")
    console.log("Email",Logindata.email);
    const url = "http://localhost:8080/find";
    axios.post(url, Logindata)
    .then((response) => {
      console.log("Login........",response)
      if (response.status == 200 && response.data!= "") {
        Swal.fire({
          title: "Success",
          text: "Login Successful...!",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        navigate("/FlightsSelection");
        setusername(response.data);
        setUserLogin(true)
      }
    }).catch((e)=> {
    
    console.log("Login EEEEEEEEEE........",e)
    Swal.fire({
      icon: 'error',
      title: 'User not found',
      text: 'Check the credentials',
      timer: 2000,
      showConfirmButton: false,
    })})
  };
  
  console.log("loginn",userLogin )
  
  console.log("Header LOGIN ,",username)

  return (
    <div className="LoginPage">
      <Form
        className="LoginBox"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <h4>Login</h4>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={Logindata.email}
            onChange={handle}
            ref={email}
            placeholder="name@example.com"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            ref={password}
            name="password"
            id="inputField"
            value={Logindata.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </Form.Group>

        <div className="password">
          <div className="d-flex">
          <Form.Check // prettier-ignore
          type="switch"
          id="custom-switch"
          onChange={showingPassword}
          name="re"
          
        />
          
            <label for="remember" name="re">
              Show Password
            </label>
          </div>
          <a href="#">Forgot Password</a>
        </div>

        <div className="loginBtn">
          <button className="btn-grad" onClick={VerifyUser}>
            Login
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

export default Login;
