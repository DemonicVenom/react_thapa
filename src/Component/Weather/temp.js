import React, { useEffect, useState } from 'react'
import Weathercard from './weathercard';
import './style.css'

const Temp = () => {
     const [searchValue, setSearchValue] = useState("patna");
     const [tempInfo,setTempInfo] = useState({});
     
     const getWeatherInfo = async() =>{
       try {
        let url =`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=e0d5f35e6577cbd25b6626c213fe000c&units=metric`;

        let res = await fetch(url);
        let data = await res.json();
        const {temp,humidity,pressure} = data.main;

        const {main:weathermood} = data.weather[0];
        const {name} = data;
        const {speed} = data.wind;
        const {country,sunset} = data.sys;
        
       const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        name,
        speed,
        country,
        sunset,
        weathermood,
       };
       setTempInfo(myNewWeatherInfo);
       } catch (error) {
        console.log(error);
       }
     }
     useEffect(()=>{
        getWeatherInfo()
    },[]);

  return (
    <>
    <div className='wrap'>
        <div className="search">
            <input type="search" 
            placeholder='search...'
            autoFocus
            id='search'
            className='searchTerm'
            value={searchValue}
            onChange={(e)=> setSearchValue(e.target.value)}
            />
            <button className='searchButton' type='button' onClick={getWeatherInfo}>
                Search
            </button>
        </div>
    </div>
    {/* our temp card */}
    <Weathercard {...tempInfo}/>
    </>
  )
}

export default Temp
