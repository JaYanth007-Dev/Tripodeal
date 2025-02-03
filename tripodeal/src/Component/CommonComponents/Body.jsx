import React from "react";
import "../../App.css";
import reviewImg from "../../Assets/footer-trustlogo_new.jpg";

import plane from "../../Assets/plane-icon.png";
import support from "../../Assets/support.png";
import deal from "../../Assets/deal.png";
import Mumbai from "../../Assets/Mumbai.jpg";
import HongKong from "../../Assets/Hong-Kong.jpg";
import Dubai from "../../Assets/Dubai.jpg";
import Bangkok from "../../Assets/Bangkok.jpg";
import Srinagar from "../../Assets/Srinagar.jpg";
import appstore from "../../Assets/appStore.png";
import playstore from "../../Assets/playstore.png";
import flight from "../../Assets/tod_download_icon_2.png";
import Carousal from "../Carousal";
import FlightSearchBox from "../FlightSearchBox";
import { useNavigate } from "react-router-dom";

const Body = () => {
 const navigate=useNavigate()

  return (
    <div>
      <div className="HomeBody">
        <div className="second-part">
         
            <div className="main">
              <div className="search-part">
                <div>
                  <div className="findBox">
                    <h5>Find Flights</h5>
                  </div>
                  <FlightSearchBox />
                </div>

                <Carousal />
              </div>

              <div className="firstFooter">
                <img
                  src={reviewImg}
                  alt="footer"
                  width="900px"
                  height="80px"
                ></img>
              </div>
              <div className="TopValues">
                <div className="topValuesHeading" data-aos="fade-up" data-aos-duration="1100" >
                  <h4>
                    Top values For <span>You</span>
                  </h4>
                  <p>Try a variety of benefits when using our services</p>
                </div>

                <div className="cards">
                  <div className="cardItem" data-aos="fade-right" data-aos-duration="1100" >
                    <div>
                      <img src={plane} width={40}></img>
                    </div>
                    <div >
                      <h6>FAST BOOKING</h6>
                      <p>
                        We offer fast booking, fantastic products, competitive
                        pricing & amazing experience.
                      </p>
                    </div>
                  </div>

                  <div className="cardItem">
                    <div>
                      <img src={deal} alt="plane" width={40}></img>
                    </div>
                    <div>
                      <h6>EXCITING DEALS</h6>
                      <p>
                        Enjoy exciting deals on flights, hotels, buses, car
                        rental, tour packages and more..
                      </p>
                    </div>
                  </div>

                  <div className="cardItem" data-aos="fade-left" data-aos-duration="1100">
                    <div>
                      <img src={support} width={40}></img>
                    </div>
                    <div onClick={()=>{
                      navigate("/ContactUs")
                    }}>
                      <h6>24/7 SUPPORT</h6>
                      <p>
                        Get assitance 24/7 on any kind of travel related query.
                        We are happy to assist you..
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="DestinationContainer ">
                <h5>
                  Packages in <span id="destHeading">Popular Destination</span>
                </h5>
                <div className="Destinations">
                  <div className="destinationColumn1" data-aos="fade-right" data-aos-duration="1100">
                    <div className="destination1">
                      <img src={Mumbai} width={340} height={224}></img>
                      <p>
                        Mumbai <span>Rs:2,500</span>
                      </p>
                    </div>
                    <div className="destination2">
                      <img src={HongKong} width={340} height={224}></img>
                      <p>
                        Hong Kong <span>Rs:2,500</span>
                      </p>
                    </div>
                  </div>
                  <div className="destinationColumn2" >
                    <div>
                      <img src={Dubai} width={340} height={523}></img>
                      <p>
                        Dubai <span>Rs:11,000</span>
                      </p>
                    </div>
                  </div>
                  <div className="destinationColumn3" data-aos="fade-left" data-aos-duration="1100">
                    <div className="destination4">
                      <img src={Bangkok} width={340} height={224}></img>
                      <p>
                        Bangkok <span>Rs:7,000</span>
                      </p>
                    </div>
                    <div className="destination5">
                      <img src={Srinagar} width={340} height={224}></img>
                      <p>
                        Srinagar <span>Rs:2,500</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="Tickets">
                <div>
                  {" "}
                  <h5>BOOK TICKETS FASTER.</h5>
                  <h5>DOWNLOAD OUR MOBILE APP TODAY</h5>
                </div>
                <p>
                  The application will help you find attractions, tours or
                  adventure in a new city
                </p>
                <div>
                  <img src={playstore} width={130} id="stores"></img>
                  <img src={appstore} width={130} id="stores"></img>
                </div>
                <img src={flight} width={900}></img>
              </div>
            </div>
         
        </div>
      </div>
    </div>
  );
};

export default Body;
