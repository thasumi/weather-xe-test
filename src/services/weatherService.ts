import { environment } from "@/environment";
import type { CitySuggestion, WeatherForecastResponse } from "@/types/weather";

const apiKey = environment.apiKey;
const BASE_URL = "http://api.weatherapi.com/v1";

export async function getForecastByCity(
  city: string,
  days = 3
): Promise<WeatherForecastResponse> {
  const url = new URL(`${BASE_URL}/forecast.json`);
  url.searchParams.set("key", apiKey);
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
    `${BASE_URL}/search.json?key=${apiKey}&q=${encodeURIComponent(searchTerm)}`
  );

  if (!res.ok) throw new Error("Failed to search cities");
  return res.json();
};