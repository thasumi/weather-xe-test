<script setup lang="ts">
import type { WeatherDay } from "@/types/weather";
import { getTemperatureColorClass } from "@/utils/weatherColor";
import WeatherIcon from "@/components/WeatherIcon.vue";
const props = defineProps<{
  days: WeatherDay[];
}>();

const getTitle = (index: number, iso: string) => {
  if (index === 0) return "Today";
  if (index === 1) return "Tomorrow";

  const date = new Date(iso);
  return date.toLocaleDateString(undefined, {
    weekday: "long",
  });
};

const getSubtitle = (day: WeatherDay["day"]) => {
  return day.condition.text;
};
</script>

<template>
  <section>
    <div class="flex gap-6 flex-wrap items-end">
      <div
        v-for="(item, index) in days"
        :key="item.date"
        class="w-[230px] h-[180px] rounded-[32px] px-8 py-6 flex flex-col items-center justify-between"
        :class="getTemperatureColorClass(item.day.maxtemp_c)"
      >
        <div class="w-10 h-10">
          <img
            :src="`https:${item.day.condition.icon}`"
            :alt="item.day.condition.text"
            class="w-full h-full object-contain"
          />
        </div>

        <div class="text-center leading-tight">
          <h3 class="text-base font-semibold text-text-primary">
            {{ getTitle(index, item.date) }}
          </h3>
          <p class="text-xs text-text-muted mt-1">
            {{ getSubtitle(item.day) }}
          </p>
        </div>

        <p class="text-base font-semibold text-text-primary">
          {{ Math.round(item.day.maxtemp_c) }}°C
        </p>
      </div>
    </div>
  </section>
</template>
