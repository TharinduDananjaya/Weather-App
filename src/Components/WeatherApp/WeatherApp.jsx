import React, { useEffect, useState }  from 'react' ;
import './WeatherApp.css' 

import search_icon from '../Assets/search.png' ;
import clear_icon from '../Assets/clear.png' ;
import cloud_icon from '../Assets/cloud.png' ;
import drizzle_icon from '../Assets/drizzle.png' ;
import rain_icon from '../Assets/rain.png' ;
import snow_icon from '../Assets/snow.png' ;
import wind_icon from '../Assets/wind.png' ;
import humidity_icon from '../Assets/humidity.png' ;



const WeatherApp = () => {

    let api_key ="8443d8a2509bbbef2d52bf4392bec5db" ;

    const [wicon,setWicon]=useState(cloud_icon);
    const [latitude,setLatitude]=useState(6.927079);
    const [longitude,setLongitude]=useState(79.861244);
    const [forecast,setForecast]=useState([]);
    const [data,setData]=useState({});
    const [lat,setLat]=useState();
    const [lon,setLon]=useState();
    const [maxDays,setMaxDays]=useState(4);


    useEffect(() => {
        fetchWeather()
    },[]);

    const fetchWeather = async () => {
        let url = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=hourly,minutely&appid=${api_key}`;
        
        let response = await fetch(url) ;
        let data = await response.json() ; 
        console.log(data) ;
        setData(data.current) ;
        setForecast(data.daily) ;
        console.log(forecast)
        return data ;
    }



    const search = async () =>{
        
        if (lat && lon) {
            if(lat>90 || lat<-90 || lon>180 || lon<-180){
              alert("Invalid Values");
              return
            }
            setLatitude(lat);
            setLongitude(lon);
            fetchWeather()

        setWicon(getWeatherIcon(data.weather[0].icon));
          } else {
            alert('Please enter both latitude and longitude');
          }
        };

        
        // const humidity = document.getElementsByClassName("humidity-precent")[0].innerHTML = data.current.humidity+"%";;
        // const wind = document.getElementsByClassName("wind-rate");
        // const temperature = document.getElementsByClassName("weather-temp");
        // const location = document.getElementsByClassName("weather-location");

        // humidity.innerHTML = data.current.humidity+"%";
        // wind [0].innerHTML =Math.floor(data.wind.speed) +"km/h";
        // temperature [0].innerHTML = Math.floor(data.main.temp)+"°C";
        // location [0].innerHTML = data.name;

    const getWeatherIcon = (code) => {
        if(code === "01d" || code === "01n"){
            return clear_icon
            }
        else if(code === "02d" || code === "02n"){
            return cloud_icon
        }
        else if(code === "03d" || code === "03n"){
            return drizzle_icon
        }
        else if(code === "04d" || code === "04n"){
            return drizzle_icon
        }
        else if(code === "09d" || code === "09n"){
            return rain_icon
        }
        else if(code === "10d" || code === "10n"){
            return rain_icon
        }
        else if(code === "11d" || code === "11n"){
            return rain_icon
        }
        else if(code === "13d" || code === "13n"){
            return snow_icon
        }
       
        else{
            return cloud_icon
        }
    }

    const handleLogout = () => {
        localStorage.clear();
        window.location.reload();
    }


  return (
    <div className='weather-container'>
    <div className='container'>
      <div className="top-bar">
      <input type="number" className='input' placeholder='Latitude' value={lat} onChange={(e)=>{setLat(e.target.value)}} />
      <input type="number" className='input' placeholder='Longitude' value={lon} onChange={(e)=>{setLon(e.target.value)}} />
      <div className="search-icon" onClick={()=>{search()}}>
      <img src={search_icon} alt="" />
    </div>
    </div>
    <div className="weather-image">
        <img src={wicon} alt="" />
    </div>
    <div className="weather-temp">{data.temp}°C</div>
    <div className="weather-location">{latitude+','+longitude}</div>
    <div className="data-container">
        <div className="element">
            <img src={humidity_icon} alt="" className='icon' />
            <div className="data">
                <div className="humidity-precent">{data.humidity}%</div>
                <div className="text">Humidity</div>
            </div>
        </div>
        <div className="element">
            <img src={wind_icon} alt="" className='icon' />
            <div className="data">
                <div className="wind-rate">{data.wind_speed}km/h</div>
                <div className="text">Wind Speed</div>
            </div>
        </div>
    </div>

    <div>
  
    </div>
    
    </div>
    <div className="forecast">
    {forecast.slice(1,maxDays).map((day,index)=>{
                return(
                    <div className="day" key={index}>
                        <div className="forecast-date">{new Date(day.dt * 1000).toLocaleDateString('en', { weekday: 'long' })}</div>
                        
                        <div className="forecast-image">
                            <img src={getWeatherIcon(day.weather[0].icon)} alt="" />
                        </div>
                        <div className="forecast-temp">{day.temp.day}°C</div>
                    </div>
                )
            }
            )}
            
            

        </div>
        <div className="actions">
        <button className='more-btn' onClick={()=>maxDays==4 ? setMaxDays(7):setMaxDays(4)}>{maxDays==4 ? 'Show More':'Show Less'}</button>
        <button className='logout-btn' onClick={handleLogout}>Logout</button>
        </div>
    </div>

  );
}
export default WeatherApp;