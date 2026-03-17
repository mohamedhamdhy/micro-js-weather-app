import axios from "axios";

export interface WeatherApiResponse {
  main: { temp: number; humidity: number };
  wind: { speed: number };
  weather: { main: string }[];
  coord: { lat: number; lon: number };
}

export const fetchWeather = async (lat: number, lon: number): Promise<WeatherApiResponse> => {
  const res = await axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
  );

  const data = res.data.current_weather;

  return {
    main: { temp: data.temperature, humidity: 50 },
    wind: { speed: data.windspeed },
    weather: [{ main: data.weathercode.toString() }],
    coord: { lat, lon },
  };
};

export const fetchAlerts = async (lat: number, lon: number): Promise<any[]> => {
  return [];
};