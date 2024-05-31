import "./App.css";
import { useState, useEffect } from "react";
import { Button, TextField, Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm, WiFog } from "weather-icons-react";
import clearWheater from './clear.jpg';
import cloudsWheather from './cloud.jpg';
import rainWheather from './rain.jpg';
import snowWheather from './snow.jpg';
import thunderstormWheater from './thunderstrom.jpg';
import fogWheater from './foge.jpg';

const api = {
  key: "3ce08e04bccf3450c193699c2fd4d173",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [background, setBackground] = useState(clearWheater); // default to clearWheater image

  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        updateBackground(result.weather[0].main);
      });
  };

  const updateBackground = (weatherCondition) => {
    switch (weatherCondition) {
      case "Clear":
        setBackground(clearWheater);
        break;
      case "Clouds":
        setBackground(cloudsWheather);
        break;
      case "Rain":
        setBackground(rainWheather);
        break;
      case "Snow":
        setBackground(snowWheather);
        break;
      case "Thunderstorm":
        setBackground(thunderstormWheater);
        break;
      case "Fog":
      case "Mist":
        setBackground(fogWheater);
        break;
      default:
        setBackground(clearWheater); // default to clear weather image
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
    document.body.style.backgroundSize = 'cover';
  }, [background]);

  return (
    <div className="app bg-black bg-opacity-50 p-5 rounded-lg">
      <header className="mb-5">
        <Typography variant="h3" className="title-aja" component="h1" gutterBottom style={{ fontFamily: 'Luckiest Guy, cursive'}}>
          Weather Forecast App
        </Typography>
      </header>
      <motion.div initial={{ y: -250 }} animate={{ y: 0 }} transition={{ type: "spring", stiffness: 120 }}>
        <TextField
          label="Masukan Kota..."
          variant="outlined"
          onChange={(e) => setSearch(e.target.value)}
          sx={{ marginRight: 2 }}
          className="m-1 p-2 rounded"
        />
        <Button variant="contained" color="primary" onClick={searchPressed} className="m-1 p-2 rounded bg-blue-500 text-white hover:bg-blue-400">
          Search
        </Button>
      </motion.div>
      {typeof weather.main !== "undefined" ? (
        <Card className="weather-card bg-opacity-10 p-5 rounded mt-5 text-left">
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
        <Card className="weather-card bg-opacity-10 p-5 rounded mt-5 text-left">
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
