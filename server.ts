import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/api/weather", async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) return res.status(400).json({ error: "Missing lat/lon" });

  try {
    const hourly = [
      "temperature_2m",
      "relativehumidity_2m",
      "apparent_temperature",
      "precipitation",
      "weathercode",
      "windspeed_10m",
      "winddirection_10m",
    ].join(",");

    const daily = [
      "temperature_2m_max",
      "temperature_2m_min",
      "apparent_temperature_max",
      "apparent_temperature_min",
      "sunrise",
      "sunset",
      "uv_index_max",
      "precipitation_sum",
      "windspeed_10m_max",
    ].join(",");

    const response = await axios.get("https://api.open-meteo.com/v1/forecast", {
      params: {
        latitude: lat,
        longitude: lon,
        hourly,
        daily,
        current_weather: true,
        timezone: "auto",
      },
    });

    res.json(response.data);
  } catch (err: any) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch weather", details: err.response?.data });
  }
});

app.listen(4000, () => console.log("Server running on port 4000"));