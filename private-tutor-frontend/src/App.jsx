import React from "react";
// import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
import Search from "./Components/Search";
// import Search from "./Components/S";
import Navbar from "./Components/CustomNavBar";
import AdminLogin from "./Components/Admin/AdminLogin";
import AdminHome from "./Components/Admin/AdminHome";
import TutorSignIn from "./Components/Tutor/TutorSignIn";
import TutorSignUp from "./Components/Tutor/TutorSignUp";
import StudentLogin from "./Components/Student/StudentLogin";
import StudentSection from "./Components/Student/StudentSection";
import StudentSignUp from "./Components/Student/StudentSignUp";
import TutorHome from "./Components/Tutor/TutorHome";
import { Provider } from "react-redux";
import store from "./Components/store";
import SearchResults from "./Components/SearchResults";
import { useLocation } from 'react-router-dom';
// const NavbarWithRouter = withRouter(Navbar);

function App() {
  const location = useLocation();
  const excludedPaths = ['/tutorhome/:value', '/adminhome/:value', '/studentsection/:value',"/myprofile/:value"];

  const shouldRenderNavbar = !excludedPaths.some((path) => location.pathname.includes(path.split('/:')[0]));

  return (
    
    <div>
          {/* <Navbar /> */}
          {shouldRenderNavbar && <Navbar />}
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/search" component={Search} />
          <Route path="/adminlogin" component={AdminLogin} />
          <Route path="/adminhome/:value" component={AdminHome} />
          <Route path="/studentlogin" component={StudentLogin} />
          <Route path="/tutorsignin" component={TutorSignIn} />
          <Route path="/tutorsignup" component={TutorSignUp} />
          <Route path="/studentsection/:value" component={StudentSection} />
          <Route path="/student-signup" component={StudentSignUp} />
          <Route path="/tutorhome/:value" component={TutorHome} />
          <Route path="/search-results" component={SearchResults} />
         
        </div>
  
  );
}

export default App;
