import React from 'react'
import Carousel from "react-bootstrap/Carousel";
import logo1 from "../Assets/Thailand-Banner.jpg";
import logo22 from "../Assets/TOD-Winter.jpg";
import logo3 from "../Assets/TRV-Christmas.jpg";

const Carousal = () => {
  return (
     <div className="carousal">
    <Carousel slide={false}>
      <Carousel.Item>
        <img src={logo1} width={630} height={380} alt="banner" />
      </Carousel.Item>
      <Carousel.Item>
        <img src={logo22} width={630} height={380} alt="banner" />
      </Carousel.Item>
      <Carousel.Item>
        <img src={logo3} height={380} width={630} alt="banner" />
      </Carousel.Item>
    </Carousel>
  </div>
  )
}

export default Carousal
