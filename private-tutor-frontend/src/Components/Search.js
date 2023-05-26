import React, { useState } from 'react';
import axios from 'axios';
import "./search.css"
import { useHistory } from 'react-router-dom';
function Search() {
    const history = useHistory();
    const [category, setCategory] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [section, setSection] = useState("online");
    const [postal, setPostal] = useState("");
    const [city, setCity] = useState("");
    const [postalOrCity, setPostalOrCity] = useState("byZip");

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

            history.push({
                pathname: '/search-results',
                state: { searchResults: data.searchResults }
            });
        } catch (error) {
            console.error("Error searching users:", error);
        }
        
    };

    return (
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
    );

}

export default Search;