import React, { useState } from "react";
import img from "../../Assets/contactUs.png";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";
const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        reasonForContact: '',
        description: '',
      });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

 


  const handleSubmit = (event) => {
    console.log("EVENT",event.target.value)
    event.preventDefault();
    const formData = new FormData(event.target.form);
    console.log("Form DAta",formData)
    const templateParams = {
      name: formData.get("name"),
      email: formData.get("email"),
      phoneNumber: formData.get("phoneNumber"),
      reasonForContact: formData.get("reasonForContact"),
      description: formData.get("description"),
    };
  console.log(templateParams)
    emailjs
      .send(
        "service_lpbg074",
        "template_tiulpuu",
        templateParams,
        "3hZQGlPVQgz_uLz-Q"
      )
      .then((result) => {
        console.log(result.text);
        Swal.fire({
            icon: 'success',
            title: 'Request Submitted Successfully',
            text: 'Thank you for reaching out to us. We will get back to you soon.',
          });
         setFormData({ name: '',
         email: '',
         phoneNumber: '',
         reasonForContact: '',
         description: ''}) 
      })
      .catch((error) => {
        console.error(error.text);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'An error occurred while submitting the request. Please try again.',
          });
      });
  };

  return (
    <div>
      <div className="d-flex pt-5">
        <div className="contactUsLeftSide w-50 d-flex  text-center flex-column justify-content-center">
          <h6 className="">Get in touch</h6>
          <h2 className="text-black">Contact Us</h2>
        </div>
        <div className="contactUsRightSide w-50">
          <img src={img} height={450}></img>
        </div>
      </div>

      <div className="d-flex justify-content-center py-5">
        <p className="w-75">
          TripOdeal is based in Delhi, India and one of India's leading online
          travel companies and operates the website TripOdeal.com. The company
          provides information, pricing, availability, and booking facility for
          domestic and international air travel.
        </p>
      </div>

      <div className="d-flex flex-column align-items-center py-3">
        <h3>Flight Inquiry Form</h3>


        <Form className="w-50" onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridReason">
              <Form.Label>Reason For Contact</Form.Label>
              <Form.Control
                type="text"
                name="reasonForContact"
                value={formData.reasonForContact}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <InputGroup>
              <InputGroup.Text>Description</InputGroup.Text>
              <Form.Control
                as="textarea"
                aria-label="With textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </InputGroup>
          </Row>

          <div className="d-flex justify-content-center">
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ContactUs;
