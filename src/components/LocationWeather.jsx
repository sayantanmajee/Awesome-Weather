import React from "react";
import { RiTempColdLine, RiWindyFill } from "react-icons/ri";
import {TbSunrise, TbSunset, TbArrowUp, TbArrowDown} from "react-icons/tb"
import { MdOutlineWaterDrop } from "react-icons/md";
import {iconURLFromCode, formatToLocalTime} from "../services/WeatherService";

function LocationWeather(props) {
  return (
    <div>

      <div className="flex items-center justify-center pb-4 text-xl text-cyan-300 ">
        <p>{props.weather.details}</p>
      </div>


      <div className="flex flex-row justify-between py-3 items-center">
        <img src={iconURLFromCode(props.weather.icon)} alt="weather-icon" className="h-25 w-25" />
        <p className="text-5xl">{`${Math.round(props.weather.temp)}°`}</p>
        <div className="flex flex-col space-y-1">
          <div className="text-gray-300 flex flex-row justify-center items-center">
            <RiTempColdLine size={18} className="mr-1" />
            <p>Feels like:</p>
            <span className="font-bold ml-1">{`${Math.round(props.weather.feels_like)}°`}</span>
          </div>
          <div className="text-gray-300 flex flex-row justify-center items-center">
            <MdOutlineWaterDrop size={18} className="mr-1" />
            <p>Humidity:</p>
            <span className="font-bold ml-1">{`${Math.round(props.weather.humidity)} %`}</span>
          </div>
          <div className="text-gray-300 flex flex-row justify-center items-center">
            <RiWindyFill size={18} className="mr-1" />
            <p>Wind:</p>
            <span className="font-bold ml-1">{`${Math.round(props.weather.speed)} km/h`}</span>
          </div>
        </div>
      </div>


    <div className="flex flex-row  my-6 justify-center items-center space-x-2">
        <div className="flex flex-row justify-center items-center space-x-1">
            <TbSunrise size={18}/>
            <p>Rise:</p>
            <span className="font-bold">{formatToLocalTime(props.weather.sunrise, props.weather.timezone, 'hh:mm a')}</span>
        
        </div>
        <span>|</span>
        <div className="flex flex-row justify-center items-center space-x-1">
            <TbSunset size={18}/>
            <p>Set:</p>
            <span className="font-bold">{formatToLocalTime(props.weather.sunset, props.weather.timezone, 'hh:mm a')}</span>
           
        </div>
        <span>|</span>
        <div className="flex flex-row justify-center items-center space-x-1">
            <TbArrowUp size={18}/>
            <p>High:</p>
            <span className="font-bold">{props.weather.temp_max.toFixed()}</span>
        
        </div>
        <span>|</span>
        <div className="flex flex-row justify-center items-center space-x-1">
            <TbArrowDown size={18}/>
            <p>Low:</p>
            <span className="font-bold">{props.weather.temp_min.toFixed()}</span>
        </div>
        
    </div>

    </div>
  );
}

export default LocationWeather;
