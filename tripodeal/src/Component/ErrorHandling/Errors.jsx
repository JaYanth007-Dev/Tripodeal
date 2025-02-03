import {useRouteError} from "react-router-dom"


const Errors=()=>{
    const errorMsg=useRouteError();
    const{status,statusText}=errorMsg;
    return(
        <div>
        <h1>Oops!!!...<br></br> Something Went wrong</h1>
        <h1>{status} {statusText}</h1>
        </div>
        
    );
}

export default Errors;