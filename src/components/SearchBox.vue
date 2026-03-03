<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{
  (e: "add-city", city: string): void;
}>();

const input = ref("");

const handleSubmit = () => {
  const city = input.value.trim();
  if (!city) return;

  emit("add-city", city);
  input.value = "";
};
</script>

<template>
  <form
    @submit.prevent="handleSubmit"
    class="flex gap-2"
  >
    <input
      v-model="input"
      type="text"
      placeholder="Search city..."
      class="px-4 py-2 rounded-full border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
    />

    <button
      type="submit"
      class="px-4 py-2 rounded-full bg-sky-500 text-white text-sm font-medium hover:bg-sky-400 transition"
    >
      Add
    </button>
  </form>
</template>