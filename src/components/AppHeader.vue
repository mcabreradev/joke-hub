<script setup lang="ts">
import { ref } from 'vue'
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline'

defineProps<{
  isDarkMode: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle-dark-mode'): void
}>()

const toggleDarkMode = () => {
  emit('toggle-dark-mode')
}
</script>

<template>
  <header class="sticky top-0 z-10 bg-white shadow-sm dark:bg-background">
    <div class="container flex items-center justify-between px-4 py-4 mx-auto">
      <div class="flex items-center">
        <div class="font-sans text-2xl font-bold text-primary dark:text-primary">JokeHub</div>
      </div>

      <div class="flex items-center space-x-4">
        <button
          @click="toggleDarkMode"
          class="p-2 transition-colors rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          aria-label="Toggle dark mode"
        >
          <SunIcon v-if="isDarkMode" class="w-5 h-5 text-yellow-400" />
          <MoonIcon v-else class="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  </header>
</template>
