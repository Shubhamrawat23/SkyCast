import './App.css';
import CityWeather from './Component/CityWeather/CityWeather';
import RecentSearches from './Component/RecentSearch/RecentSearches.js';
import SearchInput from './Component/SearchCity/SearchInput.js'
import { CityProvider } from './Context/Context.js';

function App() {
  return (
    <div className="App">
      <CityProvider>
        <div style={{ fontFamily: "monospace", fontSize: "-webkit-xxx-large" }}>Weather-App</div>
        <SearchInput />
        <CityWeather />
        <RecentSearches/>
      </CityProvider>
    </div>
  );
}

export default App;
