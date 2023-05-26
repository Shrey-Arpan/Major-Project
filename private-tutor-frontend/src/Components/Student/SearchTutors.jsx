import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../search.css"
// import { useHistory } from 'react-router-dom';
function SearchTutors() {
    // const history = useHistory();
    const [category, setCategory] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [section, setSection] = useState("online");
    const [postal, setPostal] = useState("");
    const [city, setCity] = useState("");
    const [postalOrCity, setPostalOrCity] = useState("byZip");
    const [searchResults, setSearchResults] = useState([]);
    const handlePostalOrCityChange = (event) => {
        setPostalOrCity(event.target.value);
    };
    const handlePostalChange = (event) => {
        setPostal(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleSpecializationChange = (event) => {
        setSpecialization(event.target.value);
    };

    const handleSectionChange = (event) => {
        setSection(event.target.value);
    };


    const handleCityChange = (event) => {
        setCity(event.target.value);
    };


    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const userSearch = {
            postal: postal,
            city: city,
            category: category,
            specialization: specialization,
            section: section,
        };
        try {
            const response = await axios.post("/api/search/findUsers", userSearch);
            const { data } = response;
            if (data.searchResults.length === 0) {
                // Show a popup or alert indicating no search results found
                alert("No search results found.");
            }
            setSearchResults(data.searchResults);
        } catch (error) {
            console.error("Error searching users:", error);
        }

    };

    const handleAddTutor =  (result, currentUrl) => {
        // Add tutor to database or state
        // Example only
        const studentId = currentUrl.substring(currentUrl.indexOf('/searchtutor/') + '/searchtutor/'.length);
        console.log(studentId.trim())
        fetch('/api/search/add-tutor', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
              ...result,
              studentId: studentId.trim()
            })
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Tutor already added');
            }
            alert('Tutor added successfully!');
          })
          .catch(error => {
            alert(error.message);
          });
      }

    console.log(searchResults);
    const renderSearchForm = () => {
        return (
            <div>

                <div className="container mt-5">
                    <h3 className="mt-2 mb-4 text-center">Search Page</h3>
                    <div className="row my-3">
                        <h4 className="col-3 text-info text-center">I want my lessons</h4>
                        <div className="col-2 ">
                            <div className="form-check bg-warning px-5 py-2 rounded-pill text-center ">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    value="online"
                                    checked={section === "online"}
                                    onChange={handleSectionChange}
                                    id="onlineRadio"
                                />
                                <label className="form-check-label " htmlFor="onlineRadio">
                                    Online
                                </label>
                            </div>
                        </div>
                        <div className="col-2">
                            <div className="form-check bg-warning px-5 py-2 rounded-pill text-center">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    value="offline"
                                    checked={section === "offline"}
                                    onChange={handleSectionChange}
                                    id="offlineRadio"
                                />
                                <label className="form-check-label " htmlFor="offlineRadio">
                                    Offline
                                </label>
                            </div>
                        </div>
                        <div className='col-5'></div>
                    </div>

                    {section === "offline" && (
                        <div>
                            <div className="w-75 mx-auto">

                                <div className="mb-3">
                                    <div className="form-check form-check-inline">
                                        <h5 className="my-3 mx-2 text-danger text-center">Search by Zipcode / Postalcode </h5>
                                        <div className='bg-dark text-white py-1 px-3 rounded-pill'>
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                value="byZip"
                                                checked={postalOrCity === "byZip"}
                                                onChange={handlePostalOrCityChange}
                                                id="postalRadio"

                                            />
                                            <label className="form-check-label" htmlFor="postalRadio">
                                                Postal
                                            </label>
                                        </div>
                                    </div>

                                    <div className="form-check form-check-inline">
                                        <h5 className="my-3 text-danger text-center">or City / Town</h5>
                                        <div className='bg-dark text-white py-1 px-3 rounded-pill'>
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                value="byArea"
                                                checked={postalOrCity === "byArea"}
                                                onChange={handlePostalOrCityChange}
                                                id="cityRadio"
                                            />
                                            <label className="form-check-label" htmlFor="cityRadio">
                                                City / Town
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                {postalOrCity === "byZip" && (
                                    <form onSubmit={handleFormSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="zipcodeInput" className="form-label">
                                                Zipcode/Postalcode:
                                            </label>
                                            <input
                                                type="number"
                                                value={postal}
                                                onChange={handlePostalChange}
                                                className="form-control"
                                                id="zipcodeInput"
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="categoryInput" className="form-label">
                                                Field:
                                            </label>
                                            <select
                                                className="form-select"
                                                value={category}
                                                onChange={handleCategoryChange}
                                                id="categoryInput"
                                                required
                                            >
                                                <option value="" disabled>Select a category</option>
                                                <option value="Academics">Academics</option>
                                                <option value="Sports">Sports</option>
                                                <option value="Music">Music</option>
                                                <option value="Arts">Arts</option>
                                            </select>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="specializationInput" className="form-label">
                                                Specialization:
                                            </label>
                                            <input
                                                type="text"
                                                value={specialization}
                                                onChange={handleSpecializationChange}
                                                className="form-control"
                                                id="specializationInput"
                                                placeholder="optional"
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary">
                                            Search
                                        </button>
                                    </form>
                                )}
                                {postalOrCity === "byArea" && (
                                    <form onSubmit={handleFormSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="cityInput" className="form-label">
                                                City / Town:
                                            </label>
                                            <input
                                                type="text"
                                                value={city}
                                                onChange={handleCityChange}
                                                className="form-control"
                                                id="cityInput"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="categoryInput" className="form-label">
                                                Field:
                                            </label>
                                            <select
                                                className="form-select"
                                                value={category}
                                                onChange={handleCategoryChange}
                                                id="categoryInput"
                                                required
                                            >
                                                <option value="" disabled>Select a category</option>
                                                <option value="Academics">Academics</option>
                                                <option value="Sports">Sports</option>
                                                <option value="Music">Music</option>
                                                <option value="Arts">Arts</option>
                                            </select>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="specializationInput" className="form-label">
                                                Specialization:
                                            </label>
                                            <input
                                                type="text"
                                                value={specialization}
                                                onChange={handleSpecializationChange}
                                                className="form-control"
                                                id="specializationInput"
                                                placeholder="optional"
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary">
                                            Search
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    )}

                    {section === "online" && (
                        <div>
                            <h2>Online Section</h2>
                            <form onSubmit={handleFormSubmit}>

                                <div className="mb-3">
                                    <label htmlFor="categoryInput" className="form-label">
                                        Field:
                                    </label>
                                    <select
                                        className="form-select"
                                        value={category}
                                        onChange={handleCategoryChange}
                                        id="categoryInput"
                                        required
                                    >
                                        <option value="" disabled>Select a category</option>
                                        <option value="Academics">Academics</option>
                                        <option value="Sports">Sports</option>
                                        <option value="Music">Music</option>
                                        <option value="Arts">Arts</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="specializationInput" className="form-label">
                                        Specialization:
                                    </label>
                                    <input
                                        type="text"
                                        value={specialization}
                                        onChange={handleSpecializationChange}
                                        className="form-control"
                                        id="specializationInput"
                                        placeholder="optional"
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Search
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const renderResultScreen = () => {
        return (

            <div className="container">
                <div className='row justify-content-center'>
                    <button className="tab mt-2 btn-danger" onClick={() => window.location.reload()} >
                        Search Again
                    </button>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <h2 className="text-center mt-2 mb-2">Search Results</h2>

                        {searchResults.length > 0 ? (
                            searchResults.map((result, index) => (
                                <div key={index} className="card mb-4 shadow">
                                    <div className="card-body">
                                        <h5 className="card-title">{result.fullname}</h5>
                                        <p className="card-text">Email: {result.email}</p>
                                        <p className="card-text">Address: {result.address}</p>
                                        <p className="card-text">Postal Code: {result.postal}</p>
                                        {/* <p className="card-text">Date of Birth: {result.dob}</p> */}
                                        <p className="card-text">Contact Number: {result.contact_number}</p>
                                        <p className="card-text">Gender: {result.gender}</p>
                                        <p className="card-text">City: {result.city}</p>
                                        <p className="card-text">Subjects: {result.subjects}</p>
                                        <p className="card-text">Description: {result.description}</p>
                                        <p className="card-text">Specialization: {result.specialization}</p>
                                        {/* <p className="card-text">Date: {result.date}</p> */}
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleAddTutor(result, window.location.href)}
                                        >
                                            Add
                                        </button>
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

    };
    return (
        <div>
            {searchResults.length === 0 ? renderSearchForm() : renderResultScreen()}
        </div>
    );
}

export default SearchTutors;