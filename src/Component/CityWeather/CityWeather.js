import React, { useEffect, useState } from "react";
import ClearIcon from "../../ImagesAndIcons/Sunny.png"
import RainyIcon from "../../ImagesAndIcons/Rainy.png"
import CloudsIcon from "../../ImagesAndIcons/Clouds.png"
import FogIcon from "../../ImagesAndIcons/Fog.png"
import SnowIcon from "../../ImagesAndIcons/Sunny.png"
import ThunderstormIcon from "../../ImagesAndIcons/Thunderstorm.png"
import ClearSky from "../../ImagesAndIcons/ClearSky.jpg"
import RainySky from "../../ImagesAndIcons/RainySky.jpg"
import Cloudy from "../../ImagesAndIcons/Cloudy.jpg"
import Foggy from "../../ImagesAndIcons/Foggy.jpg"
import Snowy from "../../ImagesAndIcons/Snowy.jpg"
import Thunder from "../../ImagesAndIcons/ThunderStorm.jpg"
import './CityWeather.css';
import useWeatherData from '../../Context/Context.js'


const APIKEY = process.env.REACT_APP_API_KEY;

export default function CityWeather() {
    const { data, setData } = useWeatherData();
    const [weatherData, setWeatherData] = useState(null)
    const [fiveDaysWeatherData, setfiveDaysWeatherData] = useState(null)
    const [units, setUnits] = useState("metric")


    const handleCloseBtn = () => {
        setWeatherData("")
        setData({ ...data, cityName: "" })
    }

    const weatherAssets = {
        '01d': { icon: ClearIcon, background: ClearSky },
        '01n': { icon: ClearIcon, background: ClearSky },
        '02d': { icon: CloudsIcon, background: Cloudy },
        '02n': { icon: CloudsIcon, background: Cloudy },
        '03d': { icon: CloudsIcon, background: Cloudy },
        '03n': { icon: CloudsIcon, background: Cloudy },
        '04d': { icon: CloudsIcon, background: Cloudy },
        '04n': { icon: CloudsIcon, background: Cloudy },
        '09d': { icon: RainyIcon, background: RainySky },
        '09n': { icon: RainyIcon, background: RainySky },
        '10d': { icon: RainyIcon, background: RainySky },
        '10n': { icon: RainyIcon, background: RainySky },
        '11d': { icon: ThunderstormIcon, background: Thunder },
        '11n': { icon: ThunderstormIcon, background: Thunder },
        '13d': { icon: SnowIcon, background: Snowy },
        '13n': { icon: SnowIcon, background: Snowy },
        '50d': { icon: FogIcon, background: Foggy },
        '50n': { icon: FogIcon, background: Foggy },
    };

    const getWeatherAssets = () => {
        const iconKey = weatherData && weatherData.weather[0].icon;
        // console.log(weatherData);

        return weatherAssets[iconKey] || null;
    };

    useEffect(() => {
        let fetchweatherData = async () => {
            if (data.cityName) {
                const apiData = await Promise.allSettled([
                    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${data.cityName}&units=${units}&appid=${APIKEY}`).then(res => res.json()),
                    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${data.cityName}&units=${units}&appid=${APIKEY}`).then(res => res.json())
                ])

                console.log(apiData);

                let todaysData = apiData[0].status === "fulfilled" ? apiData[0]?.value : null;
                let nextFiveData_all = apiData[1].status === "fulfilled" ? apiData[1]?.value : null;

                let dataMap = new Map();
                let nextFiveDays_Data;

                if (nextFiveData_all.cod === '200') {
                    if (nextFiveData_all?.list.length !== 0) {
                        nextFiveData_all.list.forEach((value) => {
                            let date = value.dt_txt.split(' ')
                            dataMap.set(date[0], value.main.temp)
                        })

                        nextFiveDays_Data = [...dataMap];
                        console.log(nextFiveDays_Data);

                    }
                }

                setWeatherData(todaysData ?? '');
                setfiveDaysWeatherData(nextFiveDays_Data ?? '');

            }
        }

        fetchweatherData();
    }, [data.cityName, units])


    const call_for_date_day = (e) => {
        let nextWeatherDate = new Date(e);
        let day = nextWeatherDate.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short'
        })
        let week_day = nextWeatherDate.toLocaleDateString('en-US', {
            weekday: 'short'
        })
        return (
            <>
                <div>{week_day}</div>
                <div>{day}</div>
            </>
        )
    }

    return (
        weatherData && fiveDaysWeatherData && weatherData.cod === 200 ?
            <section id="WeatherMain" className="flex flex-col gap-2 md:w-auto w-full md:max-h-[calc(100vh-120px)] md:overflow-auto py-2 md:p-0">

                {/* ── HERO CARD ── */}
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-3 sm:p-4 md:p-5 shadow-lg">

                    {/* Top row */}
                    <div className="flex justify-between items-start gap-2">
                        <div className="min-w-0">
                            <div className="flex items-center gap-1.5 mb-0.5">
                                <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#e05a2b] rounded-full flex-shrink-0" />
                                <h1 className="text-[13px] sm:text-[15px] md:text-[17px] font-bold text-white tracking-tight truncate">
                                    {data.cityName}
                                </h1>
                            </div>
                            <p className="text-[9px] sm:text-[10px] md:text-[11px] text-white/35 ml-3">
                                {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} · Updated just now
                            </p>
                        </div>

                        <div className="unitBox flex-shrink-0">
                            <div
                                onClick={() => setUnits(units === "metric" ? 'imperial' : 'metric')}
                                className="flex bg-white/10 rounded-lg overflow-hidden border border-white/15 cursor-pointer select-none"
                            >
                                <span className={`px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium transition-all duration-150 ${units !== "metric" ? "bg-white/20 text-white" : "text-white/35"}`}>°F</span>
                                <span className={`px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium transition-all duration-150 ${units === "metric" ? "bg-white/20 text-white" : "text-white/35"}`}>°C</span>
                            </div>
                        </div>
                    </div>

                    {/* Mid row */}
                    <div className="flex items-end justify-between mt-2 sm:mt-3">
                        <div className="flex items-start gap-0.5">
                            <span className="text-[44px] sm:text-[52px] md:text-[68px] font-bold text-white leading-none tracking-[-2px] sm:tracking-[-3px]">
                                {weatherData.main.temp}
                            </span>
                            <span className="text-lg sm:text-xl md:text-2xl text-white/40 mt-1.5 sm:mt-2 font-light">
                                °{units === "metric" ? "C" : "F"}
                            </span>
                        </div>
                        <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-orange-400/10 border border-orange-400/20 flex items-center justify-center flex-shrink-0">
                            <img
                                src={getWeatherAssets()?.icon}
                                alt="weatherIcon"
                                className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain"
                            />
                        </div>
                    </div>

                    {/* Bottom */}
                    <div className="mt-2.5 sm:mt-3 md:mt-3.5 flex flex-col gap-1.5 sm:gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="bg-orange-950/40 border border-orange-600/35 rounded-full px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-xs font-medium text-amber-300 capitalize">
                                {weatherData.weather[0].description}
                            </span>
                            <span className="text-[11px] sm:text-[12px] md:text-[13px] text-white/40">
                                Feels like <span className="text-white/60">{weatherData.main.feels_like}°{units === "metric" ? "C" : "F"}</span>
                            </span>
                        </div>

                        {/* Meta — wraps naturally on tiny screens */}
                        <div className="flex items-center gap-2.5 sm:gap-3 md:gap-5 flex-wrap">
                            <span className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] md:text-[12px] text-white/38">
                                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                                {weatherData.main.humidity}% hum
                            </span>
                            <span className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] md:text-[12px] text-white/38">
                                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-teal-400 flex-shrink-0" />
                                {weatherData.wind.speed} {units === "metric" ? "m/s" : "mph"}
                            </span>
                            <span className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] md:text-[12px] text-white/38">
                                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                                {weatherData.main.pressure} hPa
                            </span>
                        </div>
                    </div>
                </div>

                {/* ── MAIN DATA CONTAINER ── */}
                <div className="flex flex-col gap-2">

                    {/* ── STAT CARDS — always 2x2 on mobile, 4 cols on sm+ ── */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
                        {[
                            {
                                icon: "💧", color: "bg-blue-500/15", label: "Humidity",
                                value: `${weatherData.main.humidity}%`,
                                sub: weatherData.main.humidity < 30 ? "Very low" : weatherData.main.humidity < 60 ? "Moderate" : "High"
                            },
                            {
                                icon: "💨", color: "bg-teal-500/15", label: "Wind",
                                value: weatherData.wind.speed,
                                sub: `${units === "metric" ? "m/s" : "mph"} · ${weatherData.wind.speed < 3 ? "Calm" : weatherData.wind.speed < 8 ? "Moderate" : "Strong"}`
                            },
                            {
                                icon: "🌡️", color: "bg-amber-500/15", label: "Max / Min",
                                value: `${weatherData.main.temp_max}° / ${weatherData.main.temp_min}°`,
                                sub: "Today's range"
                            },
                            {
                                icon: "🔵", color: "bg-violet-500/15", label: "Pressure",
                                value: weatherData.main.pressure,
                                sub: "hPa · Stable"
                            },
                        ].map(({ icon, color, label, value, sub }) => (
                            <div
                                key={label}
                                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-2.5 sm:p-3 md:p-3.5 hover:bg-white/10 hover:border-white/20 transition-all text-left"
                            >
                                <div className={`w-5 h-5 sm:w-6 sm:h-6 md:w-[26px] md:h-[26px] rounded-md sm:rounded-lg ${color} flex items-center justify-center text-[11px] sm:text-xs md:text-[13px] mb-1.5 sm:mb-2`}>
                                    {icon}
                                </div>
                                <div className="text-[8px] sm:text-[9px] md:text-[10px] font-semibold uppercase tracking-widest text-white/28 mb-1">
                                    {label}
                                </div>
                                <div className="text-[14px] sm:text-[16px] md:text-[19px] font-bold text-white leading-tight">
                                    {value}
                                </div>
                                <div className="text-[9px] sm:text-[10px] md:text-[11px] text-white/30 mt-0.5 sm:mt-1">
                                    {sub}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ── SUNRISE / SUNSET ── */}
                    <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                        {[
                            { icon: "🌅", color: "bg-orange-400/12", label: "Sunrise", time: weatherData.sys?.sunrise },
                            { icon: "🌇", color: "bg-indigo-500/12", label: "Sunset", time: weatherData.sys?.sunset },
                        ].map(({ icon, color, label, time }) => (
                            <div
                                key={label}
                                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-2.5 sm:p-3 md:p-3.5 flex items-center gap-2 sm:gap-2.5 md:gap-3"
                            >
                                <div className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-md sm:rounded-lg ${color} flex items-center justify-center text-xs sm:text-sm md:text-base flex-shrink-0`}>
                                    {icon}
                                </div>
                                <div className="min-w-0">
                                    <div className="text-[8px] sm:text-[9px] md:text-[10px] font-semibold uppercase tracking-widest text-white/28 mb-0.5">
                                        {label}
                                    </div>
                                    <div className="text-[12px] sm:text-[13px] md:text-[15px] font-bold text-white">
                                        {time ? new Date(time * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : "—"}
                                    </div>
                                    <div className="text-[9px] sm:text-[10px] md:text-[11px] text-white/30 mt-0.5">
                                        Local time
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ── 5-DAY FORECAST — horizontal scroll on mobile ── */}
                    <div className="grid grid-cols-5 gap-1.5 overflow-x-auto pb-0.5 sm:pb-0 scrollbar-none">
                        {fiveDaysWeatherData.slice(1).map((entry) => (
                            <div
                                key={entry[0]}
                                className="flex-shrink-0 sm:flex-shrink-[unset] w-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-2 sm:p-2.5 md:p-3 text-center cursor-default"
                            >
                                {call_for_date_day(entry[0])}
                                <div className="text-[11px] sm:text-[12px] md:text-[15px] font-bold text-white mt-1">
                                    {`${entry[1]}°${units === "metric" ? "C" : "F"}`}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>:
            <section id="wrongInputMain" className="text-white capitalize text-lg">
                <p>
                    {weatherData && weatherData.cod === "404" && weatherData.message}
                </p>
            </section>
    )
}