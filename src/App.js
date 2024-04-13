import "./App.css";
import { useState } from "react";

const api = {
  key: "3ce08e04bccf3450c193699c2fd4d173",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});

  /*
     Untuk Menjalankan weather API
  */
  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* Tema  */}
        <h1>Weather App By Wahyu</h1>

        {/* Mesin Input  */}
        <div>
          <input
            type="text"
            placeholder="Masukan Kota..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={searchPressed}>Search</button>
        </div>

        {/* kalo cuaca Kagak ada */}
        {typeof weather.main !== "undefined" ? (
          <div>
            {/* Lokasi  */}
            <p>{weather.name}</p>

            {/* Temperatur  */}
            <p>{weather.main.temp}°C</p>

            {/* cuaca dan kondisi */}
            <p>{weather.weather[0].main}</p>
            <p>({weather.weather[0].description})</p>
          </div>
        ) : (
          ""
        )}
      </header>
    </div>
  );
}

export default App;