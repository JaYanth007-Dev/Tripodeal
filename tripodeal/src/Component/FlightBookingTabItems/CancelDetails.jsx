import React from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';

const CancelDetails = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Card className="">
            <Card.Body>
              <Card.Title>Flight Baggage Fare</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item className='fw-bold'>Cancellation Charges: 500 (as per airlines policy)</ListGroup.Item>
                <ListGroup.Item className='fw-bold'>Reschedule Charges: €500 (as per airlines policy)</ListGroup.Item>
                <ListGroup.Item>
                  <p className="text-black fw-bold pb-2">Terms & Conditions:</p>
                  <ul>
                    <li>The charges will be on per passenger per sector</li>
                    <li>Rescheduling Charges = Rescheduling/Change Penalty + Fare Difference (if applicable)</li>
                    <li>Partial cancellation is not allowed on the flight tickets which are book under special discounted fares</li>
                    <li>
                      In case, the customer have not cancelled the ticket within the stipulated time or no show then only statutory taxes are refundable from the respective airlines For infants there is no baggage allowance
                    </li>
                    <li>
                      In certain situations of restricted cases, no amendments and cancellation is allowed
                    </li>
                    <li>
                      Penalty from airlines needs to be reconfirmed before any cancellation or amendments
                    </li>
                    <li>
                      Penalty changes in airline are indicative and can be changed without any prior notice
                    </li>
                  </ul>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CancelDetails;