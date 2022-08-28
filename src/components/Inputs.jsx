import React, { useState, useEffect } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { IoLocationOutline } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Inputs({ setQuery, units, setUnits }) {
  const [city, setCity] = useState("");

  const handleSearchClick = () => {
    if (city !== "") setQuery({ q: city });
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      
      toast.info("Fetching user location...");

      navigator.geolocation.getCurrentPosition((position) => {
        toast.success("Location Fetched.");
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({ lat, lon });
      });
    }
  };

  const handleUnitChange = (e) => {
    const selectedUnit = e.target.name;
    if (units !== selectedUnit) setUnits(selectedUnit);
  }

  return (
    <div className="flex flex-row my-6 justify-center">
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="text-black text-xl font-light p-2 w-full shadow-xl capitalize focus:outline-none rounded-md placeholder:lowercase"
          type="text"
          placeholder="Search for city..."
        />
        <BiSearchAlt2
          size={30}
          onClick={handleSearchClick}
          className=" cursor-pointer transition ease-out hover:scale-125"
        />
        <IoLocationOutline
          size={30}
          onClick={handleLocationClick}
          className=" cursor-pointer transition ease-out hover:scale-125"
        />
      </div>
      <div className="flex flex-row w-1/4 items-center justify-center">
        <button
          name="metric"
          className=" text-xl font-light"
          onClick={handleUnitChange}
        >
          °C
        </button>
        <p className=" text-lg font-light mx-2">|</p>
        <button
          name="imperial"
          className=" text-xl font-light"
          onClick={handleUnitChange}
        >
          °F
        </button>
      </div>
    </div>
  );
}

export default Inputs;
