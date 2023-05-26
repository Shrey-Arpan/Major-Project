import React, { Component } from "react";
import { Link, HashRouter, Route, withRouter } from "react-router-dom";
import "../Student/StudentSection.css";
import TutorProfile from "./TutorProfile";
import TeachingSubjects from "./TeachingSubjects";
import StudentRequests from "./StudentRequests";
import TutorAppoinments from "./TutorAppoinments";
import ViewStudent from "./ViewStudent";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "./actions/tutorAuthActions";
import { Button } from "react-bootstrap";
import Avatar from "react-avatar";
import api from "../api/tutorapi";
import MyAppoinmentReq from "./MyAppoinmentReq";
import MyStudents from "./MyStudents";
import MyNotes from "./MyNotes";
// import "./TutorHome.css";
class TutorHome extends Component {
  state = {
      tutorID: this.props.match.params.value,
      tutor: {},
    };
  

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
    console.log("User logged out");
  };

  componentDidMount = async () => {
    await api.getTutorById(this.state.tutorID).then((tut) => {
      this.setState({
        tutor: tut.data.data,
      });
    });
  };


  render() {
    // console.log(this.state.tutor);
   
    return (
      <>
      
       <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to={`/tutorhome/${this.props.auth.user.id}`}>
          {this.state.tutor.fullname}
        </Link>
        <Button
          className="ml-auto btn-danger"
          // bsStyle="primary"
          onClick={this.onLogoutClick}
        >
          Logout
        </Button>
      </nav>
      
      <div className="" >
        
        
          <HashRouter basename="/">
           <h1 className="text-center mt-2 mb-5 text-light "> Welcome to Your dashboard</h1>

            <div className="whole">
              <div className="linkside cl-test">
                <div className="gap all-sec">
                  <Link
                    to={`/tutorprofile/${this.state.tutorID}`}
                    className="waves-effect waves-light btn-small"
                  >
                    <font >MY PROFILE</font>
                  </Link>
                </div>

                <div className="gap all-sec">
                  <Link
                    to={`/mystudents/${this.state.tutorID}`}
                    className="waves-effect waves-light btn-small"
                  >
                    <font >MY STUDENTS</font>
                  </Link>
                </div>

                <div className="gap all-sec">
                  <Link
                    to={`/studentrequests/${this.state.tutorID}`}
                    className="waves-effect waves-light btn-small"
                  >
                    <font >REQUESTS</font>
                  </Link>
                </div>
                <div className="gap all-sec">
                  <Link
                    to={`/tutorappoinments/${this.state.tutorID}`}
                    className="waves-effect waves-light btn-small"
                  >
                    <font >APPOINMENTS </font>
                  </Link>
                </div>
                
              </div>
              <div className="barside">
              
                <Route exact path="/mystudents/:value" component={MyStudents} />

                <Route
                  exact
                  path="/studentrequests/:value"
                  component={StudentRequests}
                />
                <Route
                  exact
                  path="/tutorprofile/:value"
                  component={TutorProfile}
                />

                <Route
                  exact
                  path="/tutorappoinments/:value"
                  component={TutorAppoinments}
                />
                <Route
                  exact
                  path="/viewstudentprofile/:value/:studentID"
                  component={ViewStudent}
                />
                <Route
                  exact
                  path="/appoinmentreq/:value"
                  component={MyAppoinmentReq}
                />
               
              </div>
            </div>
          </HashRouter>
        
      </div>
      </>
    );
  }
}

TutorHome.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(withRouter(TutorHome));
