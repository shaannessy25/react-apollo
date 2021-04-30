import { useState } from "react";
import { gql } from "@apollo/client";
import { client } from "./index";

function Weather() {
  const [zip, setZip] = useState("");
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState('imperial')

  async function getWeather() {
    try {
      const json = await client.query({
        query: gql`
                    query {
                        getWeather(zip: ${zip}, units: ${unit}){
                            temperature
                            description
                            temp_max
                            temp_min
                            feels_like
                            humidity
                            cod
                        }
                    }
                `,
      });
      setWeather(json);
    } catch (err) {
      alert(err.message)
      console.log(err.message);
    }
  }
  return (
    <div className="Weather">
      <h1 className="Title">Shaan's Weather App</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          getWeather();
        }}
      >
        <input placeholder="Enter Zip Code" value={zip} onChange={(e) => setZip(e.target.value)} />
      
          <label for='fahrenheit'>fahrenheit
            <input 
              className='radio' 
              type='radio' 
              name='fahrenheit' 
              value='imperial'
              checked={ unit === "imperial" ? true : false }
              onChange={e => setUnit(e.target.value)}
            />
          </label>

          <label for='celcius'>celcius
            <input 
              className='radio' 
              type='radio' 
              name='celcius' 
              value='metric'
              checked={ unit === "metric" ? true : false }
              onChange={e => setUnit(e.target.value)}
            />
          </label>


        <button type="submit">Submit</button>
      </form>
      <section className="Info">
          <div className="Temperature">
            {weather ? <h1>Temp: {weather.data.getWeather.temperature}</h1> : null}
            {weather ? <h1>Lows: {weather.data.getWeather.temp_min}</h1> : null}
            {weather ? <h1>Highs: {weather.data.getWeather.temp_max}</h1> : null}
            {weather ? <h1>Feels Like: {weather.data.getWeather.feels_like}</h1> : null}
           </div>
           <div className="Description">
                {weather ? <h1>Desc: {weather.data.getWeather.description.charAt(0,1).toUpperCase() + weather.data.getWeather.description.slice(1)}</h1> : null}
                {weather ? <h1>Humidity: {weather.data.getWeather.humidity}</h1> : null}
            </div>
      </section>
    </div>
  );
}

export default Weather;
