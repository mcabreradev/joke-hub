<script setup lang="ts">
import { computed } from 'vue'
import JokeCard from './JokeCard.vue'
import { Joke } from '../types'

const props = defineProps<{
  jokes: Joke[]
}>()

const emit = defineEmits<{
  (e: 'rate-joke', jokeId: number, rating: number): void
}>()

const handleRateJoke = (jokeId: number, rating: number) => {
  emit('rate-joke', jokeId, rating)
}

const hasJokes = computed(() => props.jokes.length > 0)
</script>

<template>
  <div v-if="hasJokes" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <JokeCard 
      v-for="joke in jokes" 
      :key="joke.id" 
      :joke="joke" 
      @rate-joke="handleRateJoke"
      class="animate-fade-in"
    />
  </div>
  <div v-else class="text-center py-12">
    <p class="text-gray-500 dark:text-gray-400 text-lg">No jokes match your filters. Try adjusting your criteria.</p>
  </div>
</template>