import React, { Component } from "react";
import "./TutorSignIn.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "./actions/tutorAuthActions";
import { withRouter } from "react-router-dom";
import Cookies from "js-cookie";

export class TutorSignIn extends Component {
  state = {
    email: "",
    password: "",
    errors: {},
    isChecked: false

  };


  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push(`/tutorhome/${this.props.auth.user.id}`);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push(`/tutorhome/${nextProps.auth.user.id}`); // push user to dashboard when they login
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
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    console.log("dddd")
    this.props.loginUser(userData).then((res) => {
      if (res.success) {
        const { token } = res;
        const expiresIn = res.expiresIn; // time in seconds until token expiration
        console.log("a");
        Cookies.set("tutorToken", token, { expires: expiresIn / (24 * 60 * 60) });
        console.log("token");
        console.log("d")
        this.props.history.push(`/tutorhome/${this.props.auth.user.id}`);
      } else {
        console.log("e")
        this.setState({ errors: res });
      }
    });
  };


  // handleSubmit = () => {
  //   e.preventDefault();
  //   const tutorData = {
  //     email: this.state.email,
  //     password: this.state.password,
  //   };
  //   console.log(tutorData);
  //   this.props.loginUser(tutorData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  // }
  // if (tutorToken) {
  //   // redirect to tutor home page
  //   this.props.history.push(`/tutorhome/${this.props.auth.user.id}`);
  // }

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

      <div className="mt-5 py-3 w-50 mx-auto ">

        <div className="row">
          <div className="col-2">
            <input id="tab-1" type="radio" name="tab" className="sign-in" defaultChecked />
            <label htmlFor="tab-1" className="tab">
              <a href="/tutorsignin">Sign In</a>
            </label>
          </div>
          <div className="col-10">
            <input id="tab-2" type="radio" name="tab" className="sign-up" />
            <label htmlFor="tab-2" className="tab">
              <a href="/tutorsignup">Sign Up</a>
            </label>
          </div>
        </div>

        <div className="">
          <div className="sign-in-htm">
            <div className="group">
              <label htmlFor="user" className="label">
                Email
              </label>
              <input
                id="user"
                type="email"
                className="input"
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
            <div className="group">
              <label htmlFor="pass" className="label">
                Password
              </label>
              <input
                id="pass"
                type="password"
                className="input"
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
       
            <div className="group">
              <button
                type="submit"
                className="button"
                onClick={this.handleSubmit}
              >
                Sign In
              </button>
            </div>
            <div className="hr"></div>
            <div className="foot-lnk">
              <a href="#forgot">Forgot Password?</a>
            </div>
          </div>
        </div>
      </div>

    );

  }

}

TutorSignIn.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { loginUser })(withRouter(TutorSignIn));
