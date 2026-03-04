# Weather App

A small weather web application built with **Vue 3** that displays weather forecasts for selected cities using the **WeatherAPI REST API**.

The interface was implemented based on the provided **Figma design**, showing the weather forecast for the next hours and upcoming days.
<img width="1903" height="786" alt="image" src="https://github.com/user-attachments/assets/7b3495e3-842f-47ca-87fb-77342f071513" />
<img width="1890" height="841" alt="image" src="https://github.com/user-attachments/assets/64d68bf1-3ae8-425f-98b0-61361ee69bf1" />


## Live Demo
https://weather-xe-test-deploy.vercel.app/

---

## Technologies

- Vue 3
- TypeScript
- Vite
- TailwindCSS
- WeatherAPI

---

## Environment Configuration

Clone the repository:

```bash
git clone https://github.com/thasumi/weather-xe-test.git 
```
Install dependencies:
```bash
npm install
```
Run the development server:
```bash
npm run dev
```
Open the browser at:
```bash
http://localhost:5173
```
---
## Project Features
Weather forecast by city:
Displays weather information for the selected city including:
- Current temperature
- Weather condition
- Forecast for the next hours
- Forecast for the following days

City navigation
- The application includes a list of cities that the user can navigate between.
- Selecting a city updates the forecast data displayed in the interface.
- Search for cities (Bonus)
- Users can remove cities from the list.
- Users can search for a city using the WeatherAPI search endpoint.
When a city is selected:
- It is added to the list of cities
- The forecast for that city is loaded automatically

User preferences
Basic user preferences are stored locally:
- User name
- Selected city

API
- Weather data is retrieved from WeatherAPI.
Documentation:
- https://www.weatherapi.com/docs/


