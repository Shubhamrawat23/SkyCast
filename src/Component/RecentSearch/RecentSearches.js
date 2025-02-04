import React from "react";
import useWeatherData from "../../Context/Context";
import './RecentSearches.css';

export default function RecentSearches(){
    const {data, setData} = useWeatherData()
    console.log(data);
    return(
        <div id="mainRecentSearchBox">
            <p id="recentSearchText">Recent Searches</p>
            <div id="allSearchesList">
                {data.recentSearches && data.recentSearches.map((value, index) => (
                    <div key={index}
                        onClick={() => {setData({ ...data, cityName: value.toUpperCase()})
                        window.scrollTo({top:0,behavior:'smooth'})
                    }}
                        className="searchesCity">
                        {value}
                    </div>
                ))}
            </div>
        </div>
    )
}