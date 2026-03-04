<script setup lang="ts">
import type { WeatherDay } from "@/types/weather";
import { getTemperatureColorClass } from "@/utils/weatherColor";

const props = defineProps<{
  days: WeatherDay[];
  localtime: string;
}>();

const parseISODateLocal = (isoDate: string) => {
  const [y, m, d] = isoDate.split("-").map(Number) as [number, number, number];
  return new Date(y, m - 1, d);
};

const getTitle = (isoDate: string) => {
  const today = new Date(props.localtime.replace(" ", "T"));
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const date = parseISODateLocal(isoDate);

  if (date.toDateString() === today.toDateString()) return "Today";
  if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";

  return date.toLocaleDateString(undefined, { weekday: "long" });
};

const getSubtitle = (day: WeatherDay["day"]) => day.condition.text;
</script>

<template>
  <section>
    <div class="flex gap-6 flex-wrap justify-between">
      <div
        v-for="item in days"
        :key="item.date"
        class="w-full md:w-[230px] h-[72px] md:h-[180px] rounded-[24px] md:rounded-[32px] px-5 md:px-8 py-4 md:py-6 flex flex-row md:flex-col items-center md:items-center justify-between md:justify-between gap-4 md:gap-0"
        :class="getTemperatureColorClass(item.day.maxtemp_c)"
      >
        <div class="w-8 h-8 md:w-10 md:h-10">
          <img
            :src="`https:${item.day.condition.icon}`"
            :alt="item.day.condition.text"
            class="w-full h-full object-contain"
          />
        </div>

        <div class="text-left md:text-center leading-tight flex-1 md:flex-none">
          <h3 class="text-base font-semibold text-text-primary">
            {{ getTitle(item.date) }}
          </h3>
          <p class="text-xs text-text-muted mt-1">
            {{ getSubtitle(item.day) }}
          </p>
        </div>

        <p class="text-base font-semibold text-text-primary md:mt-0">
          {{ Math.round(item.day.maxtemp_c) }} °C
        </p>
      </div>
    </div>
  </section>
</template>
