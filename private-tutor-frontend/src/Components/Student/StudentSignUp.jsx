import React, { Component } from "react";
import "../Tutor/TutorSignUp.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "./actions/studentAuthActions";
import { withRouter } from "react-router-dom";

class StudentSignUp extends Component {

  state = {
    firstname: "",
    lastname: "",
    email: "",
    address: "",
   
    dob: "",
    contact_number: "",
    gender: "",
    password: "",
    errors: {},
  };



  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const newStudent = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      address: this.state.address,
      dob: this.state.dob,
      contact_number: this.state.contact_number,
      gender: this.state.gender,
      password: this.state.password,
    };
    console.log(newStudent);
    this.props.registerUser(newStudent, this.props.history);
  }
  render() {
    const { errors } = this.state;
    //console.log(errors);
    return (
      <div className="container py-5 w-25 mx-auto">
        <div className="mt-5">
    
          <div className="row">
            <div className="col-4">
            <button className="tab" onClick={() => window.location.href = 'studentlogin'} >
              Sign In
            </button>
            </div>
            <div className="col-8">
            <button className="tab" onClick={() => window.location.href = 'student-signup'} >
              Sign Up
            </button>
            </div>
          </div>
    
          <div className="">
    
            <div className="group mb-2">
              <label htmlFor="fname" className="label">
                First name
              </label>
              <input
                id="fname"
                type="text"
                className="form-control"
                name="firstname"
                value={this.state.firstname}
                error={errors.firstname}
                onChange={this.handleChange}
              />
              <span className="error-display">{errors.firstname}</span>
            </div>
    
            <div className="group mb-2">
              <label htmlFor="lname" className="label">
                Last name
              </label>
              <input
                id="lname"
                type="text"
                className="form-control"
                name="lastname"
                value={this.state.lastname}
                error={errors.lastname}
                onChange={this.handleChange}
              />
              <span className="error-display">{errors.lastname}</span>
            </div>
    
            <div className="group mb-2">
              <label htmlFor="email" className="label">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="form-control"
                name="email"
                value={this.state.email}
                error={errors.email}
                onChange={this.handleChange}
              />
              <span className="error-display">{errors.email}</span>
            </div>
    
            <div className="group mb-2">
              <label htmlFor="address" className="label">
                Address
              </label>
              <input
                id="address"
                type="text"
                className="form-control"
                name="address"
                value={this.state.address}
                error={errors.address}
                onChange={this.handleChange}
              />
              <span className="error-display">{errors.address}</span>
            </div>
    
          
    
            <div className="group mb-2">
              <label htmlFor="dob" className="label">
                Date of birth
              </label>
              <input
                placeholder="YYYY/MM/DD"
                id="dob"
                type="text"
                className="form-control"
                name="dob"
                value={this.state.dob}
                error={errors.dob}
                onChange={this.handleChange}
              />
              <span className="error-display">{errors.dob}</span>
            </div>
    
            <div className="group mb-2">
              <label htmlFor="phoneNo" className="label">
                Contact number
              </label>
              <input
                id="phoneNo"
                type="text"
                className="form-control"
                name="contact_number"
                value={this.state.contact_number}
                error={errors.contact_number}
                onChange={this.handleChange}
              />
              <span className="error-display">{errors.contact_number}</span>
            </div>
    
            <div className="group mb-2">
              <label htmlFor="gender" className="label">
                Gender
              </label>
              <input
                id="gender"
                type="text"
                className="form-control"
                name="gender"
                value={this.state.gender}
                error={errors.gender}
                onChange={this.handleChange}
              />
              <span className="error-display">{errors.gender}</span>
            </div>
    
            <div className="group mb-2">
              <label htmlFor="password" className="label">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="form-control"
                name="password"
                value={this.state.password}
                error={errors.password}
                onChange={this.handleChange}
              />
              <span className="error-display">{errors.password}</span>
            </div>
    
            <div className="group mb-2">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.handleSubmit}
              >
                Sign Up
              </button>
            </div>
    
            <div className="hr"></div>
    
            <div className="foot-lnk">
              <label>
                <a href="/studentlogin">Already a member?</a>
              </label>
            </div>
    
          </div>
        </div>
      </div>
    );
    

  }
}

StudentSignUp.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { registerUser })(
  withRouter(StudentSignUp)
);
