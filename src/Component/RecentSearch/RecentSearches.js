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
                    <div id="mainRecentSearchBox" className="h-full p-2">
                        <p id="recentSearchText" className="text-gray-600 font-semibold text-xl text-left px-2">Recent</p>
                        <div id="allSearchesList" className="h-[95%]">
                            {data.recentSearches.map((value, index) => (
                                <div key={index}
                                    onClick={() => {
                                        setData({ ...data, cityName: value.toUpperCase() });
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    className="searchesCity cursor-pointer hover:bg-slate-900 hover:font-bold flex justify-center items-center text-white border m-2 p-2 rounded">
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