import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Carousel,
  Row,
  Col,
  Image,
  Button,
} from "react-bootstrap";
import "./Home.css";


export default class Home extends Component {

 

  render() {
    return (
      <div className="home-bg">
      <div className="car" style={{ width: "100%" }}>
       
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="./assets/book1.jpg"
              alt="First slide"
              style={{ width: "100%" }}
            />
            <Carousel.Caption>
              <h3>Welcome to  Private Tutors System</h3>
              <p>The best online Tutoring platform !</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="./assets/teach.jpg"
              alt="Second slide"
              style={{ width: "100%" }}
            />

            <Carousel.Caption>
              <h3></h3>
              <p></p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="w-100"
              src="./assets/learn.jpg"
              alt="Third slide"
              style={{ width: "100%" }}
            />

            <Carousel.Caption>
              <h3>Find a Tutor Online Today !</h3>
              <p>
                Our interactive online tuition keeps your child's studies on
                track and to support learning
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        </div>
        <div className="otherhalf">
        
        <Container>
          <Row className="show-grid text-center">
            <Col xs={12} sm={4} className="person-wrapper">
              <Image
                src="./assets/admin-512.png"
                circle
                className="profile-pic"
              />
            </Col>
            <Col xs={12} sm={4} className="person-wrapper">
              <Image
                src="./assets/Student-3-512.png"
                circle
                className="profile-pic"
              />
            </Col>
            <Col xs={12} sm={4} className="person-wrapper">
              <Image
                src="./assets/tutor-512.png"
                circle
                className="profile-pic"
              />
            </Col>
          </Row>
        </Container>
        
        <Container>
          <Row className="show-grid text-center">
            <Col xs={12} sm={4}>
              <Link to="/adminlogin">
                <Button className="button" bsStyle="primary">
                  Start as Admin{" "}
                </Button>
              </Link>
            </Col>
            <Col xs={12} sm={4}>
              <Link to="/studentlogin">
                <Button className="button" bsStyle="primary">
                  Start as Student{" "}
                </Button>
              </Link>
            </Col>
            <Col xs={12} sm={4}>
              <Link to="/tutorsignin">
                <Button className="button" bsStyle="primary" >
                  Start as Tutor{" "}
                </Button>
              </Link>
            </Col>
          </Row>
        </Container>
        </div>
      </div>
    );
  }
}
