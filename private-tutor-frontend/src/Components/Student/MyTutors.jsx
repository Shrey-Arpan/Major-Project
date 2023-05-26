import React, { Component } from "react";
import api from "../api/tutorapi";
import apirequest from "../api/requestsapi";
import { Link } from "react-router-dom";
import _ from "lodash";
import apistudents from "../api/studentapi";

class MyTutors extends Component {
  state = {
      tutors: [],
      isLoading: false,
      studentID: this.props.match.params.value,
      accept: false,
      isSuccess: false,
      mytutorsDup: [],
      requests: [],
      isAppoinment: false,
    };
  

  deleteTutor(newtutor) {
    if (
      window.confirm(`Do you want to delete ${newtutor.fullname} permanently?`)
    ) {
      apirequest.deleteRequestById(newtutor.req);
      window.location.reload();
    }
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true });
  
    const { studentID } = this.state;
    console.log("fd")
    console.log(studentID)
    try {
      const { data } = await apistudents.getStudentById(studentID);
      console.log(data)
      const { tutors } = data.data;
      // console.log(tutors)
      const tutorsInfo = tutors.map(tutorId => {
        console.log(tutorId)
        const tutor = this.state.tutors.find(tutor => 
          tutor._id === tutorId  
        );
        return {
          fullname: tutor.fullname,
          email: tutor.email, 
          contactNumber: tutor.contactNumber
        }      
      });
  
      this.setState({
        tutors: tutorsInfo,
        isLoading: false
      });  
    } catch(err) {
      console.log("errr")
      console.log(err);
    }
  };

  render() {
    // const { tutors, isLoading, requests, mytutorsDup } = this.state;

    // this.state.requests.map((req) => {
    //   if (req.studentID == this.state.studentID && req.accept) {
    //     this.state.tutors.map((tut) => {
    //       if (tut._id == req.tutorID) {
    //         tut.req = req._id;
    //         mytutorsDup.push(tut);
    //       }
    //     });
    //   }
    // });

    // const mytutors = _.uniq(mytutorsDup);

    return (
      <div>
        <div>
          <h4>
            <strong>
              <font color="blue">&nbsp;&nbsp;&nbsp;MY TUTORS</font>
            </strong>
          </h4>
        </div>
        <div>
          <table class="table table-stripe">
            <tr>
              <th>
                <font color="lightseagreen">User Name</font>
              </th>
              <th>
                <font color="lightseagreen">Address</font>
              </th>
              <th>
                <font color="lightseagreen">Subjects</font>
              </th>
            </tr>

            <tbody>
              {this.state.tutors.map(tutor => (
  <tr key={tutor.email}>
    <td>{tutor.fullname}</td>
    <td>{tutor.email}</td>
    <td>{tutor.contactNumber}</td>
  </tr>
))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default MyTutors;
