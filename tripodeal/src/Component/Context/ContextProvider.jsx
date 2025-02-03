import { createContext, useState } from "react";
import UserContext from "./Context";

const ContextProviderr = ({ children }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [fromcityname, setFromCityname] = useState("");
  const [tocityname, setToCityname] = useState("");
  const [Logindata, setLoginData] = useState({ email: "", password: "" });
  const [SignIndata, setSignInData] = useState({username:"",email: "", password: "" });
  const [username, setusername] = useState({});
  const [userLogin, setUserLogin] = useState(false);
  const [TravelDate, setTravelDate] = useState("");
  const [flightData,setFlightData]=useState([]);
  const [flightDupliData,setFlightDupliData]=useState([]);
  const [SelectedflightData,setSelectedFlightData]=useState({});
  const [userData, setUserData] = useState({
    email: "",
    code: "",
    mobileNumber: "",
  });
  const [passengers,setPassengers]=useState([ { abbrivation: "", passengerFirstName: "", passengerLastName: "", seatClass: "", passengerDOB: "",age:"" }]);
  const [currentStep, setCurrentStep] = useState(0);
  return (
    <UserContext.Provider
      value={[
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
        setCurrentStep

      ]}
    >
      {children}
    </UserContext.Provider>
  );
};

export default ContextProviderr;
