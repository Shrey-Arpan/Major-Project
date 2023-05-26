import React, { Component } from "react";
import "./TutorSignUp.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "./actions/tutorAuthActions";
import { withRouter } from "react-router-dom";
// import _ from "lodash";

class TutorSignUp extends Component {
  state = {
    fullname: "",
    email: "",
    password: "",
    address: "",
    postal: "",
    dob: "",
    contact_number: "",
    gender: "",
    description: "",
    city: "",
    errors: {},
    subjects: "",
    method:[],
    specialization: "",
  };

  handleMethodChange = (event) => {
    const { value, checked } = event.target;
    const { method } = this.state;
  
    if (checked) {
      // Add the selected method to the array
      this.setState({
        method: [...method, value],
      });
    } else {
      // Remove the deselected method from the array
      const updatedMethod = method.filter((m) => m !== value);
      this.setState({
        method: updatedMethod,
      });
    }
    console.log(this.state.method)
  }
  

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
    const newTutor = {
      fullname: this.state.fullname,
      email: this.state.email,
      password: this.state.password,
      address: this.state.address,
      postal: this.state.postal,
      dob: this.state.dob,
      contact_number: this.state.contact_number,
      gender: this.state.gender,
      city: this.state.city,
      subjects: this.state.subjects,
      description: this.state.description,
      specialization: this.state.specialization,
      method: this.state.method,
    };
    console.log(newTutor);
    this.props.registerUser(newTutor, this.props.history);
  }


  handleSelect = (e) => {

    const { value } = e.target;
    this.setState({ subjects: value });
  };




  render() {
    const { errors } = this.state;


    return (
      <div className="w-50 mx-auto mt-5 py-3">

        <div className="">

          <div className="row">
            <div className="col-2">
              <input id="tab-1" type="radio" name="tab" className="sign-in" />
              <label htmlFor="tab-1" className="tab">
                <a href="/tutorsignin">Sign In</a>
              </label>
            </div>
            <div className="col-10">
              <input id="tab-2" type="radio" name="tab" className="sign-up" defaultChecked />
              <label htmlFor="tab-2" className="tab">
                <a href="/tutorsignup">Sign Up</a>
              </label>
            </div>
          </div>

          <div className="login-form">
            <div className="">
              <div className="form-group">
                <label htmlFor="fullname" className="label">
                  Full name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="fullname"
                  value={this.state.fullname}
                  onChange={this.handleChange}
                />
                <span className="error-display">{errors.fullname}</span>
              </div>
              <div className="form-group">
                <label htmlFor="email" className="label">
                  Email Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.email}
                  name="email"
                  onChange={this.handleChange}
                />
                <span className="error-display">{errors.email}</span>
              </div>

              <div className="form-group">
                <label htmlFor="address" className="label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.address}
                  name="address"
                  onChange={this.handleChange}
                />
                <span className="error-display">{errors.address}</span>
              </div>

              <div className="form-group">
                <label htmlFor="city" className="label">
                  City
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.city}
                  name="city"
                  onChange={this.handleChange}
                />
                <span className="error-display">{errors.city}</span>
              </div>

              <div className="form-group">
                <label htmlFor="postal" className="label">
                  Postal Code
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.postal}
                  name="postal"
                  onChange={this.handleChange}
                />
                <span className="error-display">{errors.postal}</span>
              </div>

              <div className="form-group">
                <label htmlFor="dob" className="label">
                  Date of birth
                </label>
                <input
                  placeholder="YYYY/MM/DD"
                  type="text"
                  className="form-control"
                  value={this.state.dob}
                  name="dob"
                  onChange={this.handleChange}
                />
                <span className="error-display">{errors.dob}</span>
              </div>

              <div className="form-group">
                <label htmlFor="contact_number" className="label">
                  Contact number
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.contact_number}
                  name="contact_number"
                  onChange={this.handleChange}
                />
                <span className="error-display">{errors.contact_number}</span>
              </div>

              <div className="form-group">
                <label htmlFor="gender" className="label">
                  Gender
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.gender}
                  name="gender"
                  onChange={this.handleChange}
                />
                <span className="error-display">{errors.gender}</span>
              </div>


              <div className="form-group">
                <label htmlFor="method" className="label">
                  Method
                </label>
                <div onChange={this.handleMethodChange} >
                  <label className="mr-3">
                    <input type="checkbox" name="method" value="online" /> Online
                  </label>
                  <label>
                    <input type="checkbox" name="method" value="offline" /> Offline
                  </label>
                </div>
                <span className="error-display">{errors.method}</span>
              </div>



              <div className="form-group">
                <label htmlFor="subjects" className="label">
                  Select Field
                </label>
                <select
                  className="form-control"
                  id="subjects"
                  name="subjects"
                  value={this.state.subjects}
                  onChange={this.handleSelect}
                >
                  <option value="" disabled>--Select a subject--</option>
                  <option value="Academics">Academics</option>
                  <option value="Sports">Sports</option>
                  <option value="Music">Music</option>
                  <option value="Arts">Arts</option>
                </select>
                <span className="error-display">{errors.subjects}</span>
              </div>

              <div className="form-group">
                <label htmlFor="specialization" className="label">
                  Specialization
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.specialization}
                  name="specialization"
                  onChange={this.handleChange}
                />
                <span className="error-display">{errors.specialization}</span>
              </div>

              <div className="form-group">
                <label htmlFor="description" className="label">
                  About
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.description}
                  name="description"
                  onChange={this.handleChange}
                />
                <span className="error-display">{errors.description}</span>
              </div>

              <div className="form-group">
                <label htmlFor="password" className="label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  data-type="password"
                  value={this.state.password}
                  name="password"
                  onChange={this.handleChange}
                />
                <span className="error-display">{errors.password}</span>
              </div>

              <div className="form-group">
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
                  <a href="/tutorlogin">Already a member?</a>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  }
}

TutorSignUp.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { registerUser })(
  withRouter(TutorSignUp)
);
