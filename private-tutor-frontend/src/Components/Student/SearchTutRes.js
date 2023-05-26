import React from 'react';
import { useLocation } from 'react-router-dom';
import "../SearchResults.css"


function SearchTutRes() {
  
  const location = useLocation();
  const { searchResults } = location.state;
  console.log("sork")
  return (
    
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h2 className="text-center mt-4 mb-5">Search Results</h2>

          {searchResults.length > 0 ? (
            searchResults.map((result, index) => (
              <div key={index} className="card mb-4 shadow">
                <div className="card-body">
                  <h5 className="card-title">{result.fullname}</h5>
                  <p className="card-text">Email: {result.email}</p>
                  <p className="card-text">Address: {result.address}</p>
                  <p className="card-text">Postal Code: {result.postal}</p>
                  <p className="card-text">Date of Birth: {result.dob}</p>
                  <p className="card-text">Contact Number: {result.contact_number}</p>
                  <p className="card-text">Gender: {result.gender}</p>
                  <p className="card-text">City: {result.city}</p>
                  <p className="card-text">Subjects: {result.subjects}</p>
                  <p className="card-text">Description: {result.description}</p>
                  <p className="card-text">Specialization: {result.specialization}</p>
                  <p className="card-text">Date: {result.date}</p>
                  {/* <p className="card-text">Date: {result.date}</p> */}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No search results found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchTutRes;
