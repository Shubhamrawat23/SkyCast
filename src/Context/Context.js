import { createContext, useContext, useState } from "react";

const cityContext = createContext();

export function CityProvider({children}){
    const [data,setData] = useState({
        cityName:"",
        recentSearches:[],
    })
    return <cityContext.Provider value={{data,setData}}>{children}</cityContext.Provider>
}

export default function useWeatherData(){
    return useContext(cityContext);
}