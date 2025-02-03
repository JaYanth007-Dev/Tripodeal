import React from 'react';
import { Table } from 'react-bootstrap';

function FareDetails({passengersCount,baseFare,taxes}) {
console.log("FARE DETAILS>>>",baseFare,taxes)
const total=(baseFare+taxes)-(100*passengersCount)
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Traveller</th>
          <th>Base Fare</th>
          <th>Taxes</th>
          <th>Discount</th>
          <th>Total Fare</th>
        </tr>
      </thead>
      <tbody>
      
        <tr>
          <td>{passengersCount}</td>
          <td>{baseFare}</td>
          <td>{taxes}</td>
          <td>{100*passengersCount}</td>
          <td>{total}</td>
          
        </tr>
        <tr>
        <td><h5>Total</h5></td>
        <td></td>
        <td></td>
        <td></td>
        <td><h5>{total}</h5></td>
        </tr>
      </tbody>
    </Table>
  );
}

export default FareDetails;