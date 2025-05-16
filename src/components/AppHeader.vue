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
  <header class="bg-white dark:bg-background shadow-sm sticky top-0 z-10">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <div class="flex items-center">
        <div class="text-2xl font-bold text-primary-600 dark:text-primary-400">JokeHub</div>
      </div>

      <div class="flex items-center space-x-4">
        <button 
          @click="toggleDarkMode" 
          class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle dark mode"
        >
          <SunIcon v-if="isDarkMode" class="h-5 w-5 text-yellow-400" />
          <MoonIcon v-else class="h-5 w-5 text-gray-600" />
        </button>
      </div>
    </div>
  </header>
</template>
