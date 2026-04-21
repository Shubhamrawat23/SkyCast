import React from "react";
import useWeatherData from "../../Context/Context";
import './RecentSearches.css';

export default function RecentSearches() {
    const { data, setData } = useWeatherData()
    console.log(data);
    return (
        <>
            {
                data.recentSearches.length !== 0 ? (
                    <div id="mainRecentSearchBox" className="col-span-2" >
                        <p id="recentSearchText" className="text-white">Recent Searches</p>
                        <div id="allSearchesList">
                            {data.recentSearches.map((value, index) => (
                                <div key={index}
                                    onClick={() => {
                                        setData({ ...data, cityName: value.toUpperCase() });
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    className="searchesCity">
                                    {value}
                                </div>
                            ))}
                        </div>
                    </div >
                ) :
                    ''
            }
        </>
    )
}