<script setup lang="ts">
import type { WeatherHour } from "@/types/weather";
import { getTemperatureColorClass } from "@/utils/weatherColor";

const props = defineProps<{
  hours: WeatherHour[];
}>();

const formatLabel = (index: number, iso: string) => {
  if (index === 0) return "Now";

  const date = new Date(iso);
  return date.toLocaleTimeString([], {
    hour: "numeric",
    hour12: true,
  });
};
</script>

<template>
  <section class="space-y-4 mt-[5%]">
    <div class="flex justify-between">
      <div
        v-for="(hour, index) in hours"
        :key="hour.time"
        class="flex flex-col items-center gap-2"
      >
        <span class="text-text-muted text-xs md:text-sm font-medium">
          {{ formatLabel(index, hour.time) }}
        </span>

        <div
          class="w-[64px] h-[64px] rounded-full flex items-center justify-center"
          :class="getTemperatureColorClass(hour.temp_c)"
        >
          <img
            :src="`https:${hour.condition.icon}`"
            :alt="hour.condition.text"
            class="w-7 h-7"
          />
        </div>

        <span class="text-text-primary text-xs md:text-sm font-semibold">
          {{ Math.round(hour.temp_c) }}°C
        </span>
      </div>
    </div>
  </section>
</template>
