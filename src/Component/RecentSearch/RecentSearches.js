import React from "react";
import useWeatherData from "../../Context/Context";
import './RecentSearches.css';

export default function RecentSearches() {
    const { data, setData } = useWeatherData();
    console.log(data.cityName);
    
    return (
        <>
            {
                data.recentSearches.length !== 0 ? (
                    <div id="mainRecentSearchBox" className="h-vh p-2">
                        <p id="recentSearchText" className="text-gray-400 font-semibold text-xl text-left px-2">Recent</p>
                        <div id="allSearchesList" className="max-h-[calc(100vh-120px)] overflow-auto flex flex-row md:flex-col">
                            {data.recentSearches.map((value, index) => (
                                <div key={index}
                                    onClick={() => {
                                        setData({ ...data, cityName: value.toUpperCase() });
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    title={value}
                                    className={`searchesCity cursor-pointer hover:bg-slate-900 hover:font-bold text-white border md:m-2 md:p-2 m-1 p-1 flex justify-center shrink-0 items-center rounded truncate ${data.cityName.toLowerCase() === value ? `border-2 border-[#e05a2b]`:``}`}>
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