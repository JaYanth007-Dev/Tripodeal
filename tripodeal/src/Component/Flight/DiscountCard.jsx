import React from "react";
import { BiRupee } from "react-icons/bi";
const DiscountCard = ({flightData}) => {

  const lowestPrice=[];
  flightData.map(e=>{
    lowestPrice.push(e.ticketPriceEconomyClass
      )
  })
 
  const data = [
    {
      name: "Lowest Price",
      price: "8890",
    },
    {
      name: "Discounted Price",
      price: "6172",
    },
    {
      name: "Non Stop",
      price: "6895",
    },
  ];
  return (
    <div>
      <div className="discountCard">
        {data.map((e) => (
          <li>
            <h5>{e.name}</h5>
            <p>
              <BiRupee />
              {e.price}
            </p>
          </li>
        ))}
      </div>
     
    </div>
  );
};

export default DiscountCard;
