<script setup lang="ts">
import { getCircleColorClass, getTemperatureColorClass } from "@/utils/weatherColor";
import type { WeatherCondition } from "@/types/weather";

const props = defineProps<{
  city: string;
  condition: WeatherCondition;
  temperature: number;
}>();
</script>

<template>
  <div
    class="rounded-[36px] w-[220px] h-[400px] flex flex-col justify-between px-6 py-8"
    :class="getTemperatureColorClass(temperature)"
  >
    <div class="flex flex-col items-center gap-6">
      <div
        class="w-[100px] h-[100px] rounded-full flex items-center justify-center"
        :class="getCircleColorClass(temperature)"
      >
        <img :src="`https:${condition.icon}`" :alt="condition.text" class="w-10 h-10" />
      </div>

      <div class="text-center leading-tight">
        <h2 class="text-[30px] font-semibold text-text-primary">
          {{ city }}
        </h2>
        <p class="text-xs font-medium text-text-muted mt-1">
          {{ condition.text }}
        </p>
      </div>
    </div>

    <div class="mt-10 text-center">
      <p class="text-[64px] leading-none font-semibold text-text-primary">
        {{ Math.round(temperature) }}°C
      </p>
    </div>
  </div>
</template>
