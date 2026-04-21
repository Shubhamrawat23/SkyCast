import './App.css';
import CityWeather from './Component/CityWeather/CityWeather';
import RecentSearches from './Component/RecentSearch/RecentSearches.js';
import SearchInput from './Component/SearchCity/SearchInput.js'
import { CityProvider } from './Context/Context.js';

function App() {
  return (
    <div className="App">
      <CityProvider>
        <div className='flex justify-between p-2 border-b border-slate-600'>
          <div className='text-3xl font-bold text-white'>SkyCast</div>
          <SearchInput />
        </div>
        <div className='grid grid-col-12'>
          <RecentSearches />
          <CityWeather />
        </div>
      </CityProvider>
    </div>
  );
}

export default App;
