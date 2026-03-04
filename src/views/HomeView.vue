<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import CityTabs from "@/components/CityTabs.vue";
import MainWeatherCard from "@/components/MainWeatherCard.vue";
import ForecastHours from "@/components/ForecastHours.vue";
import ForecastDays from "@/components/ForecastDays.vue";
import SearchBox from "@/components/SearchBox.vue";
import {
  getUserPreferences,
  setUserPreferences,
  clearUserPreferences,
} from "@/utils/userPreferences";

import { getForecastByCity } from "@/services/weatherService";
import type { WeatherForecastResponse, WeatherHour, WeatherDay } from "@/types/weather";
import { useRouter } from "vue-router";
const router = useRouter();

const preferences = getUserPreferences();

const userName = ref(preferences?.name ?? "");
const selectedCity = ref(preferences?.city ?? "Denver");

const cities = ref<string[]>([
  "Denver",
  "Rio de Janeiro",
  "Madrid",
  "Japan",
  "Australia",
]);

const loading = ref(false);
const error = ref<string | null>(null);
const forecast = ref<WeatherForecastResponse | null>(null);

onMounted(() => {
  const preferences = getUserPreferences();

  if (!preferences) {
    router.replace("/welcome");
    return;
  }

  userName.value = preferences.name;

  if (!cities.value.includes(preferences.city)) {
    cities.value.unshift(preferences.city);
  }
  selectedCity.value = preferences.city;
});

const todayHours = computed<WeatherHour[]>(() => {
  const value = forecast.value;
  if (!value) return [];

  const today = value.forecast.forecastday[0]?.hour ?? [];
  const tomorrow = value.forecast.forecastday[1]?.hour ?? [];
  const allHours = [...today, ...tomorrow];
  const now = new Date(value.location.localtime.replace(" ", "T")).getHours();

  const startIndex = allHours.findIndex(
    (h) => new Date(h.time.replace(" ", "T")).getHours() === now
  );

  if (startIndex === -1) return allHours.slice(0, 5);

  return allHours.slice(startIndex, startIndex + 5);
});

const nextDays = computed<WeatherDay[]>(() => {
  const value = forecast.value;
  if (!value) return [];

  return value.forecast.forecastday
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3)
    .map((day) => ({
      date: day.date,
      day: day.day,
    }));
});

const fetchWeather = async (city: string) => {
  try {
    loading.value = true;
    error.value = null;
    forecast.value = await getForecastByCity(city, 4);
  } catch (err) {
    console.error(err);
    error.value = "Could not load weather data. Please try again.";
  } finally {
    loading.value = false;
  }
};

const lastFetchedCity = ref("");
watch(
  selectedCity,
  (city) => {
    if (city === lastFetchedCity.value) return;

    lastFetchedCity.value = city;

    const preferences = getUserPreferences();
    if (preferences) setUserPreferences({ ...preferences, city });

    fetchWeather(city);
  },
  { immediate: true }
);

const handleAddCity = async (city: string) => {
  const normalized = city.trim();
  if (!normalized) return;

  try {
    await getForecastByCity(normalized, 1);

    const exists = cities.value.some((c) => c.toLowerCase() === normalized.toLowerCase());
    if (!exists) cities.value.push(normalized);

    selectedCity.value = normalized;
  } catch {
    alert("City not found.");
  }
};

const handleRemoveCity = (city: string) => {
  if (cities.value.length <= 1) return;

  const next = cities.value.filter((c) => c !== city);
  cities.value = next;

  if (selectedCity.value === city) {
    selectedCity.value = next[0] ?? "Denver";
  }
};

const greeting = computed(() => {
  const localtime = forecast.value?.location.localtime;
  if (!localtime) return { text: "Hello", emoji: "👋" };

  const hour = new Date(localtime.replace(" ", "T")).getHours();

  if (hour >= 5 && hour < 12) return { text: "Good morning", emoji: "🌅" };
  if (hour >= 12 && hour < 18) return { text: "Good afternoon", emoji: "☀️" };
  return { text: "Good evening", emoji: "🌙" };
});

const resetApp = () => {
  clearUserPreferences();
  router.replace("/welcome");
};
</script>

<template>
  <main class="min-h-dvh bg-white">
    <div class="mx-auto w-full max-w-[1200px] px-4 py-10 sm:px-4 lg:px-8">
      <header class="space-y-4">
        <div class="flex justify-between">
          <h1 class="text-2xl md:text-4xl font-semibold text-text-primary">
            {{ greeting.text }}, {{ userName }} <span>{{ greeting.emoji }}</span>
          </h1>
          <button class="text-sm text-slate-500 hover:text-slate-800" @click="resetApp">
            Reset
          </button>
        </div>
        <SearchBox @add-city="handleAddCity" :isWelcomePage="false" />

        <CityTabs
          :cities="cities"
          v-model:selectedCity="selectedCity"
          @remove-city="handleRemoveCity"
        />
      </header>

      <section v-if="loading" class="py-10 text-center text-slate-500">
        Loading weather...
      </section>

      <section v-else-if="error" class="py-10 text-center text-red-500">
        {{ error }}
      </section>

      <section
        v-else-if="forecast"
        class="mt-6 w-full md:grid gap-6 md:gap-8 md:grid-cols-[240px,1fr] items-stretch overflow-x-auto"
      >
        <div class="md:justify-start w-full">
          <MainWeatherCard
            :city="forecast.location.name"
            :condition="forecast.current.condition"
            :temperature="forecast.current.temp_c"
          />
        </div>

        <div class="flex flex-col justify-between">
          <ForecastHours :hours="todayHours" />
          <ForecastDays :days="nextDays" :localtime="forecast.location.localtime" />
        </div>
      </section>
    </div>
  </main>
</template>
