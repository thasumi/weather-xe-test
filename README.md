# Weather App

A small weather web application built with **Vue 3** that displays weather forecasts for selected cities using the **WeatherAPI REST API**.

The interface was implemented based on the provided **Figma design**, showing the weather forecast for the next hours and upcoming days.
<img width="1915" height="604" alt="image" src="https://github.com/user-attachments/assets/5fbd2093-79a5-4ad6-a54a-9e41755a1bc2" />

<img width="1907" height="931" alt="image" src="https://github.com/user-attachments/assets/ac0695e8-9d81-4937-98b3-f7dd3d40ef97" />

<img width="730" height="977" alt="image" src="https://github.com/user-attachments/assets/6e127c08-764e-42e0-8af2-f57c872c54d0" />



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

Mobile version
- All features were adapted for the mobile version, following the Figma design.

