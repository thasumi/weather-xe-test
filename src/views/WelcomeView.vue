<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import SearchBox from "@/components/SearchBox.vue";
import { setUserPreferences } from "@/utils/userPreferences";

const router = useRouter();

const name = ref("");
const city = ref("");

const handlePickedCity = (picked: string) => {
  city.value = picked;
};

const start = () => {
  const n = name.value.trim();
  const c = city.value.trim();

  if (n.length < 2) {
    alert("Please enter your name.");
    return;
  }
  if (c.length < 2) {
    alert("Please choose a city.");
    return;
  }

  setUserPreferences({ name: n, city: c });
  router.push("/");
};
</script>

<template>
  <main class="min-h-screen bg-white px-4 py-10 flex overflow-x-hidden">
    <div class="mx-auto w-full max-w-[520px]">
      <h1 class="text-3xl font-semibold text-text-primary">Welcome!</h1>
      <p class="text-text-muted mt-2">Tell us how would you like to be called.</p>

      <div class="mt-8 space-y-4">
        <div>
          <label class="block text-sm font-medium text-text-primary mb-2"
            >Your name</label
          >
          <input
            v-model="name"
            type="text"
            placeholder="e.g. Thais"
            class="w-full rounded-2xl border border-slate-200 px-5 py-3 text-sm outline-none focus:border-slate-300"
            maxlength="25"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-text-primary mb-2"
            >Start city</label
          >
          <SearchBox @add-city="handlePickedCity" :isWelcomePage="true" />
          <p v-if="city" class="mt-2 text-sm text-text-muted">
            Selected: <span class="font-semibold text-text-primary">{{ city }}</span>
          </p>
        </div>

        <button
          type="button"
          class="w-full rounded-2xl py-3 text-sm font-semibold bg-[#1E90FF] text-white"
          @click="start"
        >
          Continue
        </button>
      </div>
    </div>
  </main>
</template>
