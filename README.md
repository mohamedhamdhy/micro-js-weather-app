# Weather API Backend 🌤️

A robust Express.js backend API for fetching real-time weather data using the Open-Meteo API. This server provides current weather conditions, hourly forecasts, and daily forecasts with comprehensive weather parameters.

![Express](https://img.shields.io/badge/Express-4.x-green?style=for-the-badge&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Weather Data](#weather-data)
- [Error Handling](#error-handling)
- [Configuration](#configuration)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

- 🌍 **Real-time Weather Data** - Fetches current weather from Open-Meteo API
- 📊 **Comprehensive Forecasts** - 24-hour hourly and 7-day daily forecasts
- 🔒 **CORS Enabled** - Ready for cross-origin requests from frontend
- ✅ **Parameter Validation** - Validates latitude and longitude inputs
- 🛡️ **Error Handling** - Comprehensive error handling with proper status codes
- 📝 **TypeScript** - Type-safe development with interfaces
- 🚀 **No API Key Required** - Uses free Open-Meteo API
- ⚡ **Fast & Lightweight** - Minimal dependencies, maximum performance
- 🌐 **Auto Timezone** - Automatic timezone detection based on coordinates

---

## 🚀 Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **Express.js** | Web server framework | 4.x |
| **TypeScript** | Type-safe JavaScript | 5.x |
| **Axios** | HTTP client for API requests | 1.x |
| **CORS** | Cross-Origin Resource Sharing | 2.x |
| **Node.js** | Runtime environment | 18+ |
| **Open-Meteo API** | Weather data provider | Free |

---

## 📁 Project Structure

```
weather-api-backend/
├── server.ts                 # Main Express server
├── weather.ts                # Weather API helper functions
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── .env                      # Environment variables (optional)
└── README.md                 # Documentation
```

---

## 🛠️ Installation

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- Internet connection for API requests

### Steps

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/weather-api-backend.git
cd weather-api-backend
```

2. **Install dependencies**

```bash
npm install
```

Or with yarn:

```bash
yarn install
```

3. **Install required packages** (if starting fresh)

```bash
npm install express axios cors
npm install --save-dev typescript @types/express @types/node @types/cors ts-node nodemon
```

4. **Configure TypeScript** (tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["*.ts"],
  "exclude": ["node_modules"]
}
```

5. **Add scripts to package.json**

```json
{
  "scripts": {
    "dev": "nodemon server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  }
}
```

---

## 🚀 Usage

### Development Mode

Start the server with hot-reload:

```bash
npm run dev
```

Server will start on `http://localhost:4000`

### Production Mode

Build and run:

```bash
npm run build
npm start
```

---

## 📡 API Reference

### Base URL

```
http://localhost:4000
```

### Endpoints

#### Get Weather Data

```http
GET /api/weather
```

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `lat` | number | Yes | Latitude coordinate (-90 to 90) |
| `lon` | number | Yes | Longitude coordinate (-180 to 180) |

**Example Request:**

```bash
curl "http://localhost:4000/api/weather?lat=25.2048&lon=55.2708"
```

```javascript
// JavaScript/TypeScript
const response = await fetch('http://localhost:4000/api/weather?lat=25.2048&lon=55.2708');
const data = await response.json();
```

**Success Response (200 OK):**

```json
{
  "latitude": 25.2048,
  "longitude": 55.2708,
  "current_weather": {
    "temperature": 28.5,
    "windspeed": 12.3,
    "winddirection": 180,
    "weathercode": 0,
    "time": "2024-03-17T14:00"
  },
  "hourly": {
    "time": ["2024-03-17T00:00", "2024-03-17T01:00", ...],
    "temperature_2m": [25.2, 24.8, ...],
    "relativehumidity_2m": [65, 67, ...],
    "apparent_temperature": [26.1, 25.7, ...],
    "precipitation": [0, 0, ...],
    "weathercode": [0, 1, ...],
    "windspeed_10m": [10.5, 11.2, ...],
    "winddirection_10m": [180, 185, ...]
  },
  "daily": {
    "time": ["2024-03-17", "2024-03-18", ...],
    "temperature_2m_max": [32.5, 33.1, ...],
    "temperature_2m_min": [22.3, 23.1, ...],
    "apparent_temperature_max": [34.2, 35.1, ...],
    "apparent_temperature_min": [21.5, 22.3, ...],
    "sunrise": ["2024-03-17T06:30", ...],
    "sunset": ["2024-03-17T18:45", ...],
    "uv_index_max": [8.5, 9.1, ...],
    "precipitation_sum": [0, 0, ...],
    "windspeed_10m_max": [15.2, 16.3, ...]
  }
}
```

**Error Responses:**

```json
// 400 Bad Request - Missing Parameters
{
  "error": "Missing lat/lon"
}

// 500 Internal Server Error - API Failure
{
  "error": "Failed to fetch weather",
  "details": { ... }
}
```

---

## 🌤️ Weather Data

### Current Weather

| Field | Type | Description |
|-------|------|-------------|
| `temperature` | number | Current temperature in °C |
| `windspeed` | number | Wind speed in km/h |
| `winddirection` | number | Wind direction in degrees (0-360) |
| `weathercode` | number | WMO weather code |
| `time` | string | ISO 8601 timestamp |

### Hourly Forecast (24 hours)

| Field | Description |
|-------|-------------|
| `temperature_2m` | Temperature at 2 meters above ground (°C) |
| `relativehumidity_2m` | Relative humidity at 2 meters (%) |
| `apparent_temperature` | Feels-like temperature (°C) |
| `precipitation` | Precipitation amount (mm) |
| `weathercode` | WMO weather code |
| `windspeed_10m` | Wind speed at 10 meters (km/h) |
| `winddirection_10m` | Wind direction at 10 meters (degrees) |

### Daily Forecast (7 days)

| Field | Description |
|-------|-------------|
| `temperature_2m_max` | Maximum daily temperature (°C) |
| `temperature_2m_min` | Minimum daily temperature (°C) |
| `apparent_temperature_max` | Maximum feels-like temperature (°C) |
| `apparent_temperature_min` | Minimum feels-like temperature (°C) |
| `sunrise` | Sunrise time (ISO 8601) |
| `sunset` | Sunset time (ISO 8601) |
| `uv_index_max` | Maximum UV index |
| `precipitation_sum` | Total precipitation (mm) |
| `windspeed_10m_max` | Maximum wind speed (km/h) |

### Weather Codes (WMO)

| Code | Description |
|------|-------------|
| 0 | Clear sky |
| 1, 2, 3 | Mainly clear, partly cloudy, overcast |
| 45, 48 | Fog and depositing rime fog |
| 51, 53, 55 | Drizzle: Light, moderate, dense |
| 61, 63, 65 | Rain: Slight, moderate, heavy |
| 71, 73, 75 | Snow fall: Slight, moderate, heavy |
| 77 | Snow grains |
| 80, 81, 82 | Rain showers: Slight, moderate, violent |
| 85, 86 | Snow showers: Slight, heavy |
| 95, 96, 99 | Thunderstorm |

---

## 🛡️ Error Handling

The API implements comprehensive error handling:

### Parameter Validation

```typescript
if (!lat || !lon) {
  return res.status(400).json({ error: "Missing lat/lon" });
}
```

### API Request Errors

```typescript
try {
  // API request
} catch (err: any) {
  console.error(err.response?.data || err.message);
  res.status(500).json({ 
    error: "Failed to fetch weather", 
    details: err.response?.data 
  });
}
```

### Error Status Codes

| Code | Meaning | Cause |
|------|---------|-------|
| 400 | Bad Request | Missing lat or lon parameters |
| 500 | Internal Server Error | Open-Meteo API failure or network error |

---

## ⚙️ Configuration

### Environment Variables (Optional)

Create a `.env` file:

```env
PORT=4000
NODE_ENV=development
```

Update `server.ts` to use environment variables:

```typescript
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

### CORS Configuration

Default configuration allows all origins:

```typescript
app.use(cors());
```

For production, restrict origins:

```typescript
app.use(cors({
  origin: 'https://your-frontend-domain.com',
  credentials: true
}));
```

---

## 🔧 Development

### File: server.ts

Main Express server with weather endpoint.

```typescript
import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/api/weather", async (req, res) => {
  // Weather endpoint implementation
});

app.listen(4000, () => console.log("Server running on port 4000"));
```

### File: weather.ts

Helper functions and TypeScript interfaces.

```typescript
export interface WeatherApiResponse {
  main: { temp: number; humidity: number };
  wind: { speed: number };
  weather: { main: string }[];
  coord: { lat: number; lon: number };
}

export const fetchWeather = async (lat: number, lon: number) => {
  // Fetch weather implementation
};

export const fetchAlerts = async (lat: number, lon: number) => {
  return []; // Placeholder for alerts
};
```

### Running Tests

```bash
# Install testing dependencies
npm install --save-dev jest @types/jest ts-jest supertest @types/supertest

# Run tests
npm test
```

---

## 🚢 Deployment

### Deploy to Heroku

```bash
# Login to Heroku
heroku login

# Create app
heroku create your-weather-api

# Push to Heroku
git push heroku main

# Open app
heroku open
```

### Deploy to Vercel

Create `vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.ts"
    }
  ]
}
```

Deploy:

```bash
vercel --prod
```

### Deploy to Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy
railway up
```

---

## 📚 API Documentation

### Helper Functions

#### fetchWeather(lat, lon)

Fetches current weather data for given coordinates.

**Parameters:**
- `lat` (number): Latitude
- `lon` (number): Longitude

**Returns:**
- Promise<WeatherApiResponse>

**Example:**

```typescript
const weather = await fetchWeather(25.2048, 55.2708);
console.log(weather.main.temp); // 28.5
```

#### fetchAlerts(lat, lon)

Placeholder for weather alerts (empty array for free API).

**Parameters:**
- `lat` (number): Latitude
- `lon` (number): Longitude

**Returns:**
- Promise<any[]>

---

## 🔗 External Resources

- [Open-Meteo API Documentation](https://open-meteo.com/en/docs)
- [Express.js Documentation](https://expressjs.com/)
- [Axios Documentation](https://axios-http.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🙏 Acknowledgments

- Open-Meteo: https://open-meteo.com - for providing free weather API
- Express.js: https://expressjs.com - for the awesome framework
- TypeScript: https://www.typescriptlang.org - for type safety

---

## 📧 Contact

For questions or feedback:

- GitHub: https://github.com/mohamedhamdhy
- Email: mohamedalhamdhy@gmail.com

---

<p>Made with ❤️ and ☕</p>
<p>⭐ Star this repo if you found it helpful!</p>
