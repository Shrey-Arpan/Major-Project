import React, { Component } from "react";
import { withRouter, HashRouter as Router } from "react-router-dom";
import "../Tutor/TutorSignIn.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "./actions/studentAuthActions";
import Cookies from "js-cookie";
class StudentLogin extends Component {

  state = {
    email: "",
    password: "",
    errors: {},
  };



  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push(`/studentsection/${this.props.auth.user.id}`);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push(`/studentsection/${nextProps.auth.user.id}`); // push user to dashboard when they login
    }
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
    const studentData = {
      email: this.state.email,
      password: this.state.password,
    };
    console.log(studentData);
    this.props.loginUser(studentData).then((res) => {
      if (res.success) {
        const { token } = res;
        const expiresIn = res.expiresIn; // time in seconds until token expiration
        console.log("a");
        Cookies.set("studToken", token, { expires: expiresIn / (24 * 60 * 60) });
        console.log("token");
        console.log("d")
        this.props.history.push(`/studentsection/${this.props.auth.user.id}`);
        
      } else {
        console.log("e")
        this.setState({ errors: res });
      }
    });
  }
  render() {
    const { errors } = this.state;
    //console.log(errors);
    const tutorToken = Cookies.get("tutorToken");
    if (tutorToken) {
      console.log("d");
      this.props.history.push(`/tutorhome/${this.props.auth.user.id}`);
      return null;
    }
    return (
      <div className="container  py-5 w-25 mx-auto">
        <div className="mt-5">
        <div className="row ">
          <div className="col-4  ">
            <button className="tab" onClick={() => window.location.href = 'studentlogin'} >
              Sign In
            </button>
          </div>  
          <div className="col-8">
            {/* <input id="tab-2" type="radio" name="tab" className="sign-up" /> */}
            <button className="tab" onClick={() => window.location.href = 'student-signup'} >
              Sign Up
            </button>
            {/* <label htmlFor="tab-2" className="tab">
              <a href="/student-signup">Sign Up</a>
            </label> */}
          </div>
        </div>

        <div className="sign-in-htm">
          <div className="form-group">
            <label htmlFor="user" className="label">
              Email
            </label>
            <input
              id="user"
              type="text"
              className="form-control input"
              name="email"
              value={this.state.email}
              error={errors.email}
              onChange={this.handleChange}
            />
            <span className="error-display">
              {errors.email}
              {errors.emailnotfound}
            </span>
          </div>
          <div className="form-group">
            <label htmlFor="pass" className="label">
              Password
            </label>
            <input
              id="pass"
              type="password"
              className="form-control input"
              data-type="password"
              name="password"
              value={this.state.password}
              error={errors.password}
              onChange={this.handleChange}
            />
            <span className="error-display">
              {errors.password}
              {errors.passwordincorrect}
            </span>
          </div>
         
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-primary button"
              onClick={this.handleSubmit}
            >
              Sign In
            </button>
          </div>
        </div>
        </div>
      </div>
    );

  }
}

StudentLogin.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { loginUser })(
  withRouter(StudentLogin)
);
