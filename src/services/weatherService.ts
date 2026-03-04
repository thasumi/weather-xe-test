import type { CitySuggestion, WeatherForecastResponse } from "@/types/weather";

const API_KEY = "17a0ea6d3af24151a23170312240403";
const BASE_URL = "http://api.weatherapi.com/v1";

export async function getForecastByCity(
  city: string,
  days = 3
): Promise<WeatherForecastResponse> {
  const url = new URL(`${BASE_URL}/forecast.json`);
  url.searchParams.set("key", API_KEY);
  url.searchParams.set("q", city);
  url.searchParams.set("days", String(days));
  url.searchParams.set("aqi", "no");
  url.searchParams.set("alerts", "no");

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  return (await response.json()) as WeatherForecastResponse;
}

export const searchCities = async (query: string): Promise<CitySuggestion[]> => {
  const searchTerm = query.trim();
  if (searchTerm.length < 2) return [];

  const res = await fetch(
    `${BASE_URL}/search.json?key=${API_KEY}&q=${encodeURIComponent(searchTerm)}`
  );

  if (!res.ok) throw new Error("Failed to search cities");
  return res.json();
};