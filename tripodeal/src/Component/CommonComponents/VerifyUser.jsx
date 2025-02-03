
import axios from "axios";
import UserContext from "../Context/Context";
import { useContext } from "react";
const VerifyUser = () => {
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
    console.log("FUNCTION CALL,Login DATA>>>>>>>",Logindata);
    const url = "http://localhost:8080/find";
    axios.post(url, Logindata)
    .then((response) => {
      console.log("Login........",response)
      if (response.status == 200 && response.data!= "") {
      console.log("LOGIN DATA>>>>",response.data)
        setusername(response.data);
        
   
      }
    }).catch((e)=> console.log(e))
  };

  export default VerifyUser;