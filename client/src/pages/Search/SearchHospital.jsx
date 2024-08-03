import React, { useState, useEffect } from "react";
import axios from 'axios';

const SearchHospitals = () => {
const [location, setLocation] = useState({ lat: null, lng: null });
const [keyword, setKeyword] = useState('');
const [hospitals, setHospitals] = useState([]);

useEffect(() => {
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
        setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
        });
        },
        (error) => {
        console.error("Error getting location: ", error);
        }
    );
    } else {
    console.error("Geolocation not supported by this browser.");
    }
}, []);

const searchHospitals = () => {
    if (location.lat && location.lng && keyword) {
    axios.get(`https://minsi.pythonanywhere.com/search/`, {
        params: {
        keyword: keyword,
        lat: location.lat,
        lng: location.lng,
        radius: 1000,
        }
    })
    .then((response) => {
        setHospitals(response.data.results);
    })
    .catch((error) => {
        console.error("Error fetching hospitals: ", error);
    });
    }
};

return (
    <div>
    <input 
        type="text" 
        value={keyword} 
        onChange={(e) => setKeyword(e.target.value)} 
        placeholder="Search for hospitals" 
    />
    <button onClick={searchHospitals}>Search</button>
    <ul>
        {hospitals.map((hospital) => (
        <li key={hospital.place_id}>
            <h2>{hospital.name}</h2>
            <p>{hospital.address}</p>
            <p>Rating: {hospital.rating}</p>
            {hospital.photo_url && <img src={hospital.photo_url} alt={hospital.name} />}
        </li>
        ))}
    </ul>
    </div>
);
};

export default SearchHospitals;
