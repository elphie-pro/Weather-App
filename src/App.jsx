import { useEffect, useState } from 'react'
import './App.css'
import myImage from './assets/search-alt-2-svgrepo-com.svg';
import date from './assets/event-date-and-time-symbol-svgrepo-com.svg'
import { MoonLoader } from 'react-spinners';

function App() {
  const [weather, setWeather] = useState(null)
  const [location, setLocation] = useState('')
  const [loading, setLoading] = useState(false)

  const API_KEY = '0e62e8af959e4215bef115816240710';

  const fetchWeather = async() => {
    try{
      setLoading(true)
       const response =  await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`)
       const data = await response.json()
       console.log(data)
       setWeather(data)
    }
    catch(e) {
      console.log(e)
    }
    finally{
      setLoading(false)
    }
  }
  return (
    <>
    <div className="">
      <h2>WEATHER APP</h2>
       <div className="container">
        <input type="text" placeholder='Input Location' className='search' value={location} onChange={(e) => {
          setLocation(e.target.value)
        }}/>
        <button className='btn' onClick={() => {
          fetchWeather()
        }}><img src={myImage} alt="" className='img'/></button>
       <div className="mid">
       
        {weather ? <main>
                  <div> 
                      <img src={weather.current.condition.icon} alt="" className='cloud'/>
                      <h1>{weather.current.temp_c}°C</h1>
                      <h3>{weather.location.name}</h3>
                      <img src={date} alt="" className='date'/>
                     <h2 className='time'>{weather.current.last_updated}</h2>
            </div>
          </main> : <MoonLoader className='loader'/>
        }
      </div>
      </div>
    </div>
     
    </>
  )
}

export default App
