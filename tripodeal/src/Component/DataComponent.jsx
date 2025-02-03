import React, { Component } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { MdOutlineFlight } from "react-icons/md";


class DataComponent extends Component {
    constructor(props) {
       super(props);
       this.state = {     
         date: new Date(),
         flights: {
           '2024-01-01':<div ><MdOutlineFlight />7666</div> ,
           '2024-01-02':<div><MdOutlineFlight />5566</div> ,
           '2024-01-03':<div><MdOutlineFlight />8526</div> ,
           '2024-01-06':<div><MdOutlineFlight />3500</div> ,
           '2024-01-23':<div><MdOutlineFlight />9000</div> ,
           
           // Add all the dates with their respective flight prices
         },
       };
    }

    tileContent = ({ date, view }) => {
        const monthView = view === 'month';
        const flights = this.state.flights;
    
        if (!monthView) {
          return null;
        }
    
        const dayString = date.toISOString().slice(0, 10);
        const price = flights[dayString];
    
        if (!price) {
          return null;
        }
    
        return (
          <div style={{ backgroundColor: '#000', color: '#fff', padding: '5px' }}>
            {price}
          </div>
        );
     };

     render() {
        return (
          <div className="">
            <div >
              <Calendar
                onChange={this.onDateChange}
                value={this.state.date}
                tileContent={this.tileContent}
              />
              
            </div>
          </div>
        );
     }
    
    }
    
    export default DataComponent;