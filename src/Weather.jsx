import React, { useState, useEffect } from 'react'
import Clear from './assets/clear.png'
import Cloud from './assets/cloud.png'
import drizzle from './assets/drizzle.png'
import rain from './assets/rain.png'
import snow from './assets/snow.png'
import humidityIcon from './assets/humidity.png'
import windIcon from './assets/wind.png'

function Weather({ text }) {
  const apikey = "01fbf778560a90a920bdfe8eff337ef9";
  const [icon, setIcon] = useState(snow);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("Thanjavur");
  const [country, setCountry] = useState("IN")
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [citynotfound, setCitynotfound] = useState(false);
  const [loading, setLoading] = useState(false);
  const search = async () => {
    setLoading(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apikey}`

    try {
      let res = await fetch(url);
      let data = await res.json()
      if (data.cod === "404") {
        console.error("city not found");
        setCitynotfound(true);
        setLoading(false);
        return;
      }
      setCitynotfound(false);
      setTemp(Math.floor(data.main.temp - 273.15));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLong(data.coord.lon);
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);

      let weather = data.weather[0].main;
      const iconMap = {
        Clouds: Cloud,
        Clear: Clear,
        Rain: rain,
        Drizzle: drizzle,
        Snow: snow,
      };
      setIcon(iconMap[weather] || Clear);

    } catch (error) {
      console.log("An error occured", error.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (text) {
      search();
    }
  }, [text]);

   if (loading) {
    return (
      <div className="text-center mt-10 text-lg font-medium text-gray-600">
        Loading...
      </div>
    );
  }

  if (citynotfound) {
    return (
      <div className="text-center mt-10 text-lg font-medium text-red-500">
        City Not Found
      </div>
    );
  }

  return (
    <>
      <div className='flex justify-center mb-2.5'>
        <img className='w-[160px] h-[160px]' src={icon} alt="weather-icon" />
      </div>
      <div className='mt-5 text-4xl text-gray-800 uppercase text-center font-medium'>
        {temp}°C
      </div>
      <div className='mt-2 text-[32px] md:text-[40px] text-amber-400 uppercase text-center'>
        {city}
      </div>
      <div className='text-[18px] text-[#888] font-medium uppercase text-center'>
        {country}
      </div>

      <div className='flex justify-center items-center gap-5 mt-8'>
        <div className='flex flex-col items-center'>
          <span className='text-[14px]'>Latitude</span>
          <span className='text-[18px] font-bold text-[#666] pt-1'>{lat}</span>
        </div>
        <div className='flex flex-col items-center'>
          <span className='text-[14px]'>Longitude</span>
          <span className='text-[18px] font-bold text-[#666] pt-1'>{long}</span>
        </div>
      </div>

      <div className='flex justify-between md:justify-around mt-10 '>
        <div className='text-center'>
          <img className='w-[50px] h-[50px] mx-auto ' src={humidityIcon} alt="humidity" />
          <div className='text-[18px] font-bold text-[#666] pt-1'>{humidity}%</div>
          <div className='text-[12px] text-[#888]'>Humidity</div>
        </div>
        <div className='text-center'>
          <img className='w-[60px] h-[50px] mx-auto' src={windIcon} alt="wind" />
          <div className='text-[18px] font-bold text-[#666] pt-1'>{wind} km/h</div>
          <div className='text-[12px] text-[#888]'>Wind Speed</div>
        </div>
      </div>
    </>
  )
}

export default Weather