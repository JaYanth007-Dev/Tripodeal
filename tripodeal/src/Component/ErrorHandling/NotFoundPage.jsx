import React from "react";
import notFoundImage from "../../Assets/notFound.png";
import FlightSearchBox from "../FlightSearchBox";
import { useState } from "react";
const NotFoundPage = ({ handleShow }) => {
  return (
    <div className="d-flex justify-content-center w-100 py-3">
      <div className="notFoundpage">
        <img src={notFoundImage} width={400}></img>
        <h4 className="text-primary">No Results Found</h4>
        <p>Please search again</p>
        <div className="py-2">
          <button className="btn btn-grad " onClick={handleShow}>
            Search again
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
