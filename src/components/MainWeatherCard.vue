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
    class="rounded-[36px] max-w-[520px] h-[120px] md:h-[400px] flex flex-row md:flex-col items-center md:items-stretch justify-between px-5 py-4 md:px-6 md:py-8"
    :class="getTemperatureColorClass(temperature)"
  >
    <div class="flex items-center gap-4 md:flex-col md:items-center md:gap-6">
      <div
        class="w-[56px] h-[56px] md:w-[80px] md:h-[80px] rounded-full flex items-center justify-center"
        :class="getCircleColorClass(temperature)"
      >
        <img
          :src="`https:${condition.icon}`"
          :alt="condition.text"
          class="w-9 h-9 md:w-10 md:h-10"
        />
      </div>

      <div class="text-left md:text-center leading-tight semibold">
        <h2 class="text-[20px] md:text-[32px] text-text-primary">
          {{ city }}
        </h2>
        <p class="text-xs font-medium text-text-muted mt-1">
          {{ condition.text }}
        </p>
      </div>
    </div>

    <div class="text-center md:mt-10">
      <div class="flex justify-center font-semibold">
        <div class="text-[32px] md:text-[64px] leading-none text-text-primary">
          {{ Math.round(temperature) }}
        </div>
        <div>°C</div>
      </div>
    </div>
  </div>
</template>
