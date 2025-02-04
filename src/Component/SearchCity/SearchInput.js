import React, { useState } from "react";
import './SearchInput.css';
import useWeatherData from "../../Context/Context";

export default function SearchInput(){

    const [citySearch,setCitySearch] = useState("")
    const {setData} = useWeatherData();

    
    const handleCityName = (e) => {
        e.preventDefault();
        if (citySearch) {
            setData((prev)=>({cityName:citySearch.toUpperCase(),recentSearches:[citySearch,...prev.recentSearches]}))
            setCitySearch("")
        }
    }

    return(
        <form onSubmit={handleCityName} id="searchBox">
            <input type="text"
            id="searchInput"
            value={citySearch} 
            placeholder="Enter City Name" 
            onChange={(e)=>setCitySearch(e.target.value)}/>

            <button id = "searchBtn">Search</button>
        </form>
    )
}