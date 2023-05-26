import React, { Component } from "react";
import { Container, Row, Col, Accordion, Card, Button } from "react-bootstrap";
import { logoutUser } from "./actions/adminAuthActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "../Student/StudentSection.css";
import { Link, Route, HashRouter, withRouter } from "react-router-dom";
import apiadmin from "../api/adminapi";
import AdminProfile from "./AdminProfile";
import Avatar from "react-avatar";
import ViewAppoinments from './ViewAppoinments'
import ViewStudents from './ViewStudents'
import ViewStudent from '../Tutor/ViewStudent'
import TutorRequests from './TutorRequests'
import AcceptedTutors from './AcceptedTutors'
import "./AdminHome.css";
class AdminHome extends Component {
  
    state = {
      adminID: this.props.match.params.value,
      admin: {},
    };
    

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
    console.log("User logged out");
  };

  componentDidMount = async () => {
    console.log(this.state.adminID);
    await apiadmin.getAdminById(this.state.adminID).then((adm) => {
      this.setState({
        admin: adm.data.data,
      });
    });
    console.log(this.state.admin);
  };

  
  render() {
    // console.log(this.state.admin);
    return (
      <div className="admin-back">        
          <HashRouter basename="/">
          <div className="gap sp">
              <div className="container text-center">
                
                <div className="card bd">
                  
                  <center>
                    <Avatar
                      name={this.state.admin.name}
                      size="50"
                      round={true}
                    />
                  </center>
                  <div className="card-body">
                  <h5 className="card-title">Hello,{this.state.admin.name}</h5>
                  <p className="card-text">Welcome to your Dashboard</p>
                <Button
                  className="button"
                  bsStyle="primary"
                  onClick={this.onLogoutClick}
                >
                  Log out
                </Button>
                </div>
                
                </div> 
                
              </div>
            </div>

            <div className="whole admin-lb">
              <div className="linkside">
                <div className="gap">
                  <Link
                    to={`/adminprofile/${this.state.adminID}`}
                    className="waves-effect waves-light btn-small"
                  >
                    <font >MY PROFILE</font>
                  </Link>
                </div>
                <div className="gap">
                  <Link
                    to={`/viewappoinments/${this.state.adminID}`}
                    className="waves-effect waves-light btn-small"
                  >
                    <font >VIEW APPOINMENTS</font>
                  </Link>
                </div>

                <div className="gap">
                  <Link
                    to={`/viewstudents/${this.state.adminID}`}
                    className="waves-effect waves-light btn-small"
                  >
                    <font >VIEW STUDENTS</font>
                  </Link>
                </div>

                <div className="gap">
                  <Link
                    to={`/tutorrequests/${this.state.adminID}`}
                    className="waves-effect waves-light btn-small"
                  >
                    <font >TUTOR REQUESTS</font>
                  </Link>
                </div>

                <div className="gap">
                  <Link
                    to={`/acceptedtutors/${this.state.adminID}`}
                    className="waves-effect waves-light btn-small"
                  >
                    <font >ACCEPTED TUTORS</font>
                  </Link>
                </div>

              </div>

              <div className="barside">
                <Route
                  exact
                  path="/adminprofile/:value"
                  component={AdminProfile}
                />
                <Route
                  exact
                  path="/viewappoinments/:value"
                  component={ViewAppoinments}
                />
                <Route
                  exact
                  path="/viewstudents/:value"
                  component={ViewStudents}
                />
                <Route
                  exact
                  path="/viewstudentprofile/:value/:studentID"
                  component={ViewStudent}
                />
                <Route
                  exact
                  path="/tutorrequests/:value"
                  component={TutorRequests}
                />                
                <Route
                exact
                path="/acceptedtutors/:value"
                component={AcceptedTutors}
              />
                
              </div>
            </div>
          </HashRouter>
        
      </div>
    );
  }
}

AdminHome.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(withRouter(AdminHome));
