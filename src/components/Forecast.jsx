import React from "react";
import { iconURLFromCode } from "../services/WeatherService";

function Forecast(props) {
  return (
    <div>
      <div className="flex items-center justify-start mt-6 font-medium uppercase">
        <h1>{props.title}</h1>
      </div>
      <hr className="my-2" />
      <div className="flex flex-row items-center justify-between">
        {props.items.map((item) => (
          <div key={item.title} className="flex flex-col items-center justify-center space-y-2">
            <span>{item.title}</span>
            <img src={iconURLFromCode(item.icon)} alt="" className="h-10 w-10" />
            <span className="font-bold">{`${item.temp.toFixed()}°`}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
