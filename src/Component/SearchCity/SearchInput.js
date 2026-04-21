import React, { useState } from "react";
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
        <form onSubmit={handleCityName} id="searchBox" className="flex gap-2">
            <input type="text"
            id="searchInput"
            value={citySearch} 
            placeholder="Enter City Name" 
            onChange={(e)=>setCitySearch(e.target.value)}
            className="rounded-lg bg-stone-700 px-4 hover:border text-white"/>

            <button id = "searchBtn" className="text-white border px-4 rounded-lg hover:bg-stone-600">Search</button>
        </form>
    )
}