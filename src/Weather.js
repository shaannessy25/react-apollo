import { useState } from 'react'
import { gql } from '@apollo/client'
import { client } from './index'

function Weather() {
    const [ zip, setZip ] = useState("")
    const [ weather, setWeather ] = useState(null)

    async function getWeather(){
        try {
            const json = await client.query({
                query: gql`
                    query {
                        getWeather(zip: ${zip}){
                            temperature
                            description
                            temp_max
                            temp_min
                            feels_like
                            humidity
                        }
                    }
                `
            })
            setWeather(json)
        } catch(err){
            console.log(err.message)
        }
    }
  return (
    <div className="Weather">

      <form onSubmit={(e) => {
          e.preventDefault()
          getWeather()
      }}>

          <input
            value={zip}
            onChange={(e) => setZip(e.target.value)} 
          />

          <button type="submit">Submit</button>
        {weather ? <h1>{weather.data.getWeather.temperature}</h1>: null}
        {weather ? <h1>{weather.data.getWeather.description}</h1>: null}
        {weather ? <h1>Humidity: {weather.data.getWeather.humidity}</h1>: null}
        {weather ? <h1>Lows: {weather.data.getWeather.temp_min}</h1>: null}
        {weather ? <h1>Highs: {weather.data.getWeather.temp_max}</h1>: null}
        {weather ? <h1>Feels Like: {weather.data.getWeather.feels_like}</h1>: null}
      </form>
    </div>
  );
}

export default Weather;
