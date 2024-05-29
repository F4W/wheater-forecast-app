import "./App.css";
import { useState, useEffect } from "react";
import { Button, TextField, Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm, WiFog } from "weather-icons-react";

const api = {
  key: "3ce08e04bccf3450c193699c2fd4d173",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [background, setBackground] = useState("default.jpg");

  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        updateBackground(result.weather[0].main);
      });
  };

  const updateBackground = (weatherCondition) => {
    switch(weatherCondition) {
      case "Clear":
        setBackground("clear.jpg");
        break;
      case "Clouds":
        setBackground("clouds.jpg");
        break;
      case "Rain":
        setBackground("rain.jpg");
        break;
      case "Snow":
        setBackground("snow.jpg");
        break;
      case "Thunderstorm":
        setBackground("thunderstorm.jpg");
        break;
      case "Fog":
      case "Mist":
        setBackground("fog.jpg");
        break;
      default:
       setBackground("default.jpg");
         break;
  } 
};

const getWeatherIcon = (weatherCondition) => {
  switch (weatherCondition) {
    case "Clear":
      return <WiDaySunny size={50} color="#f1c40f" />;
    case "Clouds":
      return <WiCloud size={50} color="#bdc3c7" />;
    case "Rain":
      return <WiRain size={50} color="#3498db" />;
    case "Snow":
      return <WiSnow size={50} color="#ecf0f1" />;
    case "Thunderstorm":
      return <WiThunderstorm size={50} color="#e74c3c" />;
    case "Fog":
    case "Mist":
      return <WiFog size={50} color="#95a5a6" />;
    default:
      return <WiDaySunny size={50} color="#f1c40f" />;
  }
};

useEffect(() => {
  document.body.style.backgroundImage = `url(${background})`;
}, [background]);

return (
  <div className="app">
    <header>
      <Typography variant="h3" component="h1" gutterBottom>
      Weather Forecast App
      </Typography>
    </header>
    <motion.div initial={{ y: -250 }} animate={{ y: 0 }} transition={{ type: "spring", stiffness: 120 }}>
      <TextField
        label="Masukan Kota..."
        variant="outlined"
        onChange={(e) => setSearch(e.target.value)}
        sx={{ marginRight: 2 }}
      />
      <Button variant="contained" color="primary" onClick={searchPressed}>
        Search
      </Button>
    </motion.div>
    {typeof weather.main !== "undefined" ? (
      <Card className="weather-card" variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div">
            {weather.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {weather.main.temp}°C
          </Typography>
          <Typography variant="body2">
            {getWeatherIcon(weather.weather[0].main)} {weather.weather[0].main} ({weather.weather[0].description})
          </Typography>
          <Typography variant="body2">
            Humidity: {weather.main.humidity}%
          </Typography>
          <Typography variant="body2">
            Wind Speed: {weather.wind.speed} m/s
          </Typography>
        </CardContent>
      </Card>
    ) : (
      <Card className="weather-card" variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div">
            Kota Yang Anda Masukan Tidak Ada
          </Typography>
          </CardContent>
      </Card>
    )}
  </div>
);
}

export default App;
