import React from "react";
import { formatToLocalTime } from "../services/WeatherService";

function TImeAndLocations(props) {

  return (
    <div className="flex flex-col justify-center items-center my-5">
      <div className="text-gray-300 text-xl">
        <p>
          {formatToLocalTime(props.weather.dt, props.weather.timezone)}
        </p>
      </div>
      <div  className="text-gray-300 text-4xl mt-5">
        <p>{`${props.weather.city_name} , ${props.weather.country}`}</p>
      </div>
    </div>
  );
}

export default TImeAndLocations;
