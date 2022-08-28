import { DateTime } from "luxon";

// const API_KEY = process.env.SECRET_API_KEY;
const API_KEY = "0cd3b16f8a1631c78115a5bde73e8ba8";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";


const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });


    return fetch(url).then((res) => res.json());

};

const formatCurrentWeather = (data) => {

    //destructuring weather data https://openweathermap.org/current/#geo

    const {
        coord: { lat, lon },
        weather,
        main: { temp, feels_like, temp_min, temp_max, humidity },
        wind: { speed },
        dt,
        sys: { country, sunrise, sunset },
        name: city_name,

    } = data;

    const { main: details, icon } = weather[0];

    return { lat, lon, temp, feels_like, temp_min, temp_max, humidity, speed, dt, country, sunrise, sunset, city_name, details, icon }
}

const formatForecastWeather = (data) => {
    let { timezone, daily, hourly } = data;

    daily = daily.slice(1, 6).map(d => {
        return {
            title: formatToLocalTime(+d.dt, timezone, 'ccc'),
            temp: d.temp.day,
            icon: d.weather[0].icon
        }
    })


    hourly = hourly.slice(1, 6).map(d => {
        return {
            title: formatToLocalTime(+d.dt, timezone, 'hh:mm a'),
            temp: d.temp,
            icon: d.weather[0].icon
        }
    })

    return { timezone, daily, hourly };
}


const getFormatedWeatherData = async (searchParams) => {

    //weather for hourly weather data
    const formatedCurrentWeather = await getWeatherData('weather', searchParams).then(formatCurrentWeather)

    const { lat, lon } = formatedCurrentWeather;

    //weather for daily weather data
    const formattedForecastWeather = await getWeatherData('onecall', {
        lat, lon, exclude: "current,minutely,alerts", units: searchParams.units,
    }).then(formatForecastWeather);

    return { ...formatedCurrentWeather, ...formattedForecastWeather };
}


//formating dt to local date time format using luxon
const formatToLocalTime = (secs, zone, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") => DateTime.fromSeconds(+secs).setZone(zone).toFormat(format);


const iconURLFromCode = (code) => ` http://openweathermap.org/img/wn/${code}@2x.png`


export default getFormatedWeatherData;

export {formatToLocalTime, iconURLFromCode};

