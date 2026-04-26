import './App.css';
import CityWeather from './Component/CityWeather/CityWeather';
import RecentSearches from './Component/RecentSearch/RecentSearches.js';
import SearchInput from './Component/SearchCity/SearchInput.js'
import { CityProvider } from './Context/Context.js';

function App() {
  return (
    <div className="App flex flex-col min-h-dvh">
      <CityProvider>
        {/* Header */}
        <div className='flex justify-between p-2 border-b border-slate-600 shrink-0'>
          <div className='text-xl md:text-3xl font-bold text-white'>SkyCast</div>
          <SearchInput />
        </div>

        {/* Content */}
        <div className='flex flex-col-reverse md:grid md:grid-cols-12 md:flex-1'>

          <div className='col-span-2 border-r border-slate-600'>
            <RecentSearches />
          </div>

          <div className='col-span-10 flex justify-center items-center'>
            <CityWeather />
          </div>
        </div>
      </CityProvider>
    </div>
  );
}

export default App;
