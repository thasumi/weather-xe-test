<script setup lang="ts">
import { ref, watch } from "vue";
import { searchCities } from "@/services/weatherService";
import type { CitySuggestion } from "@/types/weather";

const emit = defineEmits<{
  (e: "add-city", city: string): void;
}>();

const input = ref("");
const suggestions = ref<CitySuggestion[]>([]);
const loading = ref(false);
const open = ref(false);

const sanitize = (value: string) => value.replace(/[^\p{L}\s'-]/gu, "");

let timer: number | undefined;

watch(input, (value) => {
  const clean = sanitize(value);
  if (clean !== value) input.value = clean;

  window.clearTimeout(timer);

  const query = clean.trim();
  if (query.length < 2) {
    suggestions.value = [];
    open.value = false;
    return;
  }

  timer = window.setTimeout(async () => {
    try {
      loading.value = true;
      const list = await searchCities(query);
      suggestions.value = list.slice(0, 6);
      open.value = suggestions.value.length > 0;
    } catch {
      suggestions.value = [];
      open.value = false;
    } finally {
      loading.value = false;
    }
  }, 250);
});

const selectSuggestion = (s: CitySuggestion) => {
  emit("add-city", s.name);
  input.value = "";
  open.value = false;
  suggestions.value = [];
};

const addManual = () => {
  const q = input.value.trim();
  if (q.length < 2) return;
  emit("add-city", q);
  input.value = "";
  open.value = false;
  suggestions.value = [];
};

const closeLater = () => {
  window.setTimeout(() => {
    open.value = false;
  }, 120);
};

const props = defineProps<{
  isWelcomePage?: boolean;
}>();
</script>

<template>
  <div class="relative w-full max-w-[420px]">
    <div class="flex items-center gap-3">
      <input
        v-model="input"
        type="text"
        inputmode="text"
        autocomplete="off"
        placeholder="Search city..."
        class="w-full rounded-full border border-slate-200 px-5 py-3 text-sm outline-none focus:border-slate-300"
        @keydown.enter.prevent="addManual"
        @focus="open = suggestions.length > 0"
        @blur="closeLater()"
      />

      <button
        v-if="!isWelcomePage"
        type="button"
        class="rounded-full px-5 py-3 text-sm font-semibold bg-[#1E90FF] text-white"
        @click="addManual"
      >
        Add
      </button>
    </div>

    <div
      v-if="open"
      class="absolute z-10 mt-2 w-full rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden"
    >
      <div v-if="loading" class="px-4 py-3 text-sm text-slate-500">Searching...</div>

      <button
        v-for="s in suggestions"
        :key="s.id"
        type="button"
        class="w-full px-4 py-3 text-left text-sm hover:bg-slate-50"
        @mousedown.prevent="selectSuggestion(s)"
      >
        <div class="font-medium text-slate-900">
          {{ s.name }}
        </div>
        <div class="text-xs text-slate-500">{{ s.region }} · {{ s.country }}</div>
      </button>
    </div>
  </div>
</template>
