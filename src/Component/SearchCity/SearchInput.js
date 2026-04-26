import React, { useState, useRef, useEffect } from "react";
import useWeatherData from "../../Context/Context";

export default function SearchInput() {

    const [citySearch, setCitySearch] = useState("")
    const [mobileOpen, setMobileOpen] = useState(false)
    const { data, setData } = useWeatherData();
    const inputRef = useRef(null)

    // Auto-focus input when mobile search opens
    useEffect(() => {
        if (mobileOpen && inputRef.current) {
            inputRef.current.focus()
        }
    }, [mobileOpen])

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (inputRef.current && !inputRef.current.closest("form")?.contains(e.target)) {
                setMobileOpen(false)
            }
        }
        if (mobileOpen) document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [mobileOpen])

    const handleCityName = (e) => {
        e.preventDefault();
        if (citySearch) {
            let isCityPresent = data.recentSearches.includes(citySearch);
            
            if (isCityPresent) {
                setData((prev)=>({
                    cityName: citySearch.toUpperCase(),
                    recentSearches: [...prev.recentSearches]
                }))
            }else{
                setData((prev) => ({
                    cityName: citySearch.toUpperCase(),
                    recentSearches: [citySearch, ...prev.recentSearches]
                }))
            }
            setCitySearch("")
            setMobileOpen(false)
        }
    }

    const SearchIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
    )

    return (
        <>
            <form
                onSubmit={handleCityName}
                id="searchBox"
                className="hidden md:flex gap-2"
            >
                <input
                    type="text"
                    id="searchInput"
                    value={citySearch}
                    placeholder="Enter City/Country Name"
                    onChange={(e) => setCitySearch(e.target.value)}
                    className="rounded-lg bg-stone-700 px-4 py-2 hover:border text-white text-sm outline-none focus:border-slate-400"
                />
                <button
                    id="searchBtn"
                    className="text-white border border-slate-600 px-4 rounded-lg hover:bg-stone-600 transition-colors duration-150 flex items-center gap-2"
                >
                    <SearchIcon />
                    <span className="text-sm">Search</span>
                </button>
            </form>

            <div className="flex md:hidden items-center gap-2">

                {mobileOpen && (
                    <form
                        onSubmit={handleCityName}
                        className="flex items-center gap-2 animate-[fadeIn_0.15s_ease]"
                    >
                        <input
                            ref={inputRef}
                            type="text"
                            value={citySearch}
                            placeholder="Search city/country..."
                            onChange={(e) => setCitySearch(e.target.value)}
                            className="w-44 rounded-lg bg-stone-700 px-3 py-2 text-white text-sm outline-none focus:border focus:border-slate-400 placeholder:text-white/40"
                        />
                        <button
                            type="submit"
                            className="text-white border border-slate-600 p-2 rounded-lg hover:bg-stone-600 transition-colors duration-150"
                        >
                            <SearchIcon />
                        </button>
                    </form>
                )}

                <button
                    type="button"
                    onClick={() => {
                        if (mobileOpen && citySearch) {
                            handleCityName({ preventDefault: () => { } })
                        } else {
                            setMobileOpen(prev => !prev)
                            if (mobileOpen) setCitySearch("")
                        }
                    }}
                    className={`text-white border border-slate-600 p-2 rounded-lg hover:bg-stone-600 transition-colors duration-150 ${mobileOpen?'hidden':''}`}
                >
                   <SearchIcon />
                </button>
            </div>
        </>
    )
}