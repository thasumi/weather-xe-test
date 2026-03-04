<script setup lang="ts">
const cityEmojis: Record<string, string> = {
  Denver: "🗻",
  "Rio de Janeiro": "🏖️",
  Madrid: "💃",
  Japan: "🍣",
  Australia: "🐨",
};

const props = defineProps<{
  cities: string[];
  selectedCity: string;
}>();

const emit = defineEmits<{
  (e: "update:selectedCity", city: string): void;
  (e: "remove-city", city: string): void;
}>();

const handleClick = (city: string) => {
  emit("update:selectedCity", city);
};
</script>

<template>
  <div
    class="flex w-full gap-3 overflow-x-auto md:overflow-visible scrollbar-hide md:flex-wrap px-1 pb-1"
  >
    <button
      v-for="city in cities"
      :key="city"
      type="button"
      class="flex items-center gap-2 shrink-0 px-4 py-2 rounded-[10px] text-sm font-medium transition"
      :class="[
        city === selectedCity
          ? 'bg-[#C3E0FB] border-blue-300'
          : 'bg-white border-slate-200',
      ]"
      @click="handleClick(city)"
    >
      {{ city }} {{ cityEmojis[city] ?? "📍" }}
      <span
        v-if="cities.length > 1"
        class="text-xs text-slate-500 hover:text-blue-500 cursor-pointer"
        @click.stop="emit('remove-city', city)"
      >
        ✕
      </span>
    </button>
  </div>
</template>
