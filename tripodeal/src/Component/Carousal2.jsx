import React from 'react'
import Carousel from "react-bootstrap/Carousel";
import myTrips from "../Assets/myTrips.png"
import myTrips1 from "../Assets/mytrips1.png"

const Carousal2 = () => {
  return (
     <div className="carousal">
    <Carousel slide={false}>
      <Carousel.Item>
        <img src={myTrips} width={700} height={300} alt="banner" />
      </Carousel.Item>
      <Carousel.Item>
        <img src={myTrips1} width={700} height={300} alt="banner" />
      </Carousel.Item>
     
    </Carousel>
  </div>
  )
}

export default Carousal2;
