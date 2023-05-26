import React, { Component } from "react";
import { Link, HashRouter, Route } from "react-router-dom";
// import "./StudentSection.css";
import { Navbar, Nav } from 'react-bootstrap';
import MyTutors from "./MyTutors";
import SearchTutors from "./SearchTutors";
import SentRequests from "./SentRequests";
import StudentProfile from "./StudentProfile";
import SentAppoinments from "./SentAppoinments";
import AppoinmentForm from "./AppoinmentForm";
import FixedAppoinments from "./FixedAppoinments";
import apistudent from "../api/studentapi";
import TutorNotes from "./TutNotes";
import { Button } from "react-bootstrap";
import Avatar from "react-avatar";
import { logoutUser } from "./actions/studentAuthActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";


class StudentSection extends Component {
  state = {
      studentID: this.props.match.params.value,
      student: {},
    };
  
 
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
    console.log("User logged out");
  };
  componentDidMount = async () => {
    await apistudent.getStudentById(this.state.studentID).then((stu) => {
      this.setState({
        student: stu.data.data,
      });
    });
  };

  render() {
    console.log(this.state.studentID)
    return (
      <div className=" mt-0 pt-0">
        
      <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href={`/studentsection/${this.props.auth.user.id}`}>
        <Avatar name={this.state.student.firstname} size="50" round={true} />
        {this.state.student.firstname}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href={`#/myprofile/${this.state.studentID}`}>
            {this.state.student.username}'s PROFILE
          </Nav.Link>
          <Nav.Link href={`#/mytutors/${this.state.studentID}`}>MY TUTORS</Nav.Link>
          <Nav.Link href={`#/searchtutor/${this.state.studentID}`}>SEARCH TUTORS</Nav.Link>

          {/* <Nav.Link href="/searchtutors">SEARCH TUTORS</Nav.Link> */}
          <Nav.Link href={`#/sentrequests/${this.state.studentID}`}>SENT REQUESTS</Nav.Link>
          <Nav.Link href={`#/sentappoinments/${this.state.studentID}`}>
            SENT APPOINMENTS
          </Nav.Link>
          <Nav.Link href={`#/tutornotes/${this.state.studentID}`}>TUTOR NOTES</Nav.Link>
        </Nav>
        <Button className="button" variant="primary" onClick={this.onLogoutClick}>
          Log out
        </Button>
      </Navbar.Collapse>
    </Navbar>

      <HashRouter basename="/">
          <div className="whole st-col">

        
            <div className="barside">
              <Route
                exact
                path="/fixed-appoinments/:value"
                component={FixedAppoinments}
              />
              <Route exact path="/tutornotes/:value" component={TutorNotes} />
              <Route exact path="/mytutors/:value" component={MyTutors} />
              <Route
                exact
                path="/searchtutor/:value"
                component={SearchTutors}
              />
              <Route
                exact
                path="/sentrequests/:value"
                component={SentRequests}
              />
              <Route
                exact
                path="/myprofile/:value"
                component={StudentProfile}
              />
              <Route
                exact
                path="/appoinments/:value/:studentID"
                component={AppoinmentForm}
              />
              <Route
                exact
                path="/sentappoinments/:value"
                component={SentAppoinments}
              />
            </div>
          </div>
          </HashRouter>
      </div>
    );
  }
}
StudentSection.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

// export default StudentSection;
export default connect(mapStateToProps, { logoutUser })(
  withRouter(StudentSection)
);