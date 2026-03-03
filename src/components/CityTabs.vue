<script setup lang="ts">
const props = defineProps<{
  cities: string[];
  selectedCity: string;
}>();

const emit = defineEmits<{
  (e: "update:selectedCity", city: string): void;
}>();

const handleClick = (city: string) => {
  emit("update:selectedCity", city);
};
</script>

<template>
  <div class="flex flex-wrap gap-3 margin-4">
    <button
      v-for="city in cities"
      :key="city"
      type="button"
      @click="handleClick(city)"
      class="px-5 py-2 rounded-full text-sm font-medium transition border"
      :class="
        city === selectedCity
          ? 'bg-[#A5C7FF] text-slate-900 border-transparent shadow-sm'
          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
      "
    >
      {{ city }}
    </button>
  </div>
</template>
