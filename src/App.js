import { useState, useEffect } from 'react';
import './App.css';
import { TopButtons, Inputs, TImeAndLocations, LocationWeather, Forecast } from './components';
import getFormatedWeatherData from './services/WeatherService';
// import getWeatherData from './services/WeatherService';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [query, setQuery] = useState({ q: 'west bengal' });
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);


  useEffect(() => {
    const fetchWeather = async () => {

      const message = query.q ? query.q : 'current location';

      toast.info ('Fetching weather for ' + message)

      await getFormatedWeatherData({ ...query, units }).then((data) => {

        toast.success(`Successfully fetched weather for ${data.city_name}, ${data.country}`);

        setWeather(data);
      });

    }

    fetchWeather();

  }, [query, units])


  const formatBackground = () => {
    if (!weather) return "from-red-600 to-yellow-700";
    const threshold = units === 'metric' ? 25 : 60;
    if (weather.temp <= threshold) return "from-cyan-700 to-blue-700"

    return "from-yellow-600 to-orange-700";
  }



  return (
    <div className={`text-white mx-auto max-w-screen-md mt-4 py-10 px-32 bg-gradient-to-br ${formatBackground()} h-fit shadow-xl shadow-gray-500`}>
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

      {weather && (
        <div>
          <TImeAndLocations weather={weather} />
          <LocationWeather weather={weather} />
          <Forecast title="hourly forecast" items={weather.hourly} />
          <Forecast title="daily forecast" items={weather.daily} />
        </div>
      )}

      <ToastContainer autoClose={2000} theme="colored" newestOnTop={true}/>

    </div>


  );
}

export default App;
