<script setup lang="ts">
import { ref, computed, watch } from "vue";
import CityTabs from "@/components/CityTabs.vue";
import MainWeatherCard from "@/components/MainWeatherCard.vue";
import ForecastHours from "@/components/ForecastHours.vue";
import ForecastDays from "@/components/ForecastDays.vue";
import SearchBox from "@/components/SearchBox.vue";

import { getForecastByCity } from "@/services/weatherService";
import type { WeatherForecastResponse, WeatherHour, WeatherDay } from "@/types/weather";

const cities = ref<string[]>([
  "Denver",
  "Rio de Janeiro",
  "Madrid",
  "Japan",
  "Australia",
]);

const selectedCity = ref<string>("Denver");
const loading = ref(false);
const error = ref<string | null>(null);
const forecast = ref<WeatherForecastResponse | null>(null);

const todayHours = computed<WeatherHour[]>(() => {
  if (!forecast.value) return [];

  const allHours = forecast.value.forecast.forecastday[0]?.hour ?? [];

  const localtime = forecast.value.location.localtime;
  const currentHour = Number(localtime.split(" ")[1].split(":")[0]);

  const startIndex = allHours.findIndex((hourEntry) => {
    const hour = Number(hourEntry.time.split(" ")[1].split(":")[0]);
    return hour === currentHour;
  });

  if (startIndex === -1) return [];

  return allHours.slice(startIndex, startIndex + 5);
});

const nextDays = computed<WeatherDay[]>(() => {
  if (!forecast.value) return [];

  return forecast.value.forecast.forecastday.map((fd) => ({
    date: fd.date,
    day: fd.day,
  }));
});

const fetchWeather = async (city: string) => {
  try {
    loading.value = true;
    error.value = null;
    forecast.value = await getForecastByCity(city, 5);
  } catch (err) {
    console.error(err);
    error.value = "Could not load weather data. Please try again.";
  } finally {
    loading.value = false;
  }
};

watch(
  selectedCity,
  (city) => {
    fetchWeather(city);
  },
  { immediate: true }
);

const handleAddCity = async (city: string) => {
  try {
    await getForecastByCity(city, 1);

    if (!cities.value.includes(city)) {
      cities.value.push(city);
    }

    selectedCity.value = city;
  } catch {
    alert("City not found.");
  }
};
</script>

<template>
  <main class="min-h-screen bg-[#FFFF] px-4 py-10 flex">
    <div class="mx-auto max-w-[1536px]">
      <header class="space-y-4">
        <h1 class="text-3xl md:text-4xl font-semibold">
          Good afternoon, Thais <span>🌞</span>
        </h1>

        <SearchBox @add-city="handleAddCity" />

        <CityTabs :cities="cities" v-model:selectedCity="selectedCity" />
      </header>

      <section v-if="loading" class="py-10 text-center text-slate-500">
        Loading weather...
      </section>

      <section v-else-if="error" class="py-10 text-center text-red-500">
        {{ error }}
      </section>

      <section
        v-else-if="forecast"
        class="mt-8 grid gap-8 md:grid-cols-[240px,1fr] items-stretch"
      >
        <div class="flex justify-center md:justify-start items-stretch">
          <MainWeatherCard
            :city="forecast.location.name"
            :condition="forecast.current.condition"
            :temperature="forecast.current.temp_c"
          />
        </div>

        <div class="flex flex-col justify-between">
          <ForecastHours :hours="todayHours" />
          <ForecastDays :days="nextDays" />
        </div>
      </section>
    </div>
  </main>
</template>
