<script setup lang="ts">
import { ref, computed } from 'vue'
import StarRating from './StarRating.vue'
import { Joke } from '../types'

const props = defineProps<{
  joke: Joke
}>()

const emit = defineEmits<{
  (e: 'rate-joke', jokeId: number, rating: number): void
}>()

const isFlipped = ref(false)
const isHighlighted = ref(false)

const toggleFlip = () => {
  isFlipped.value = !isFlipped.value
}

const highlight = () => {
  isHighlighted.value = true
}

const unhighlight = () => {
  isHighlighted.value = false
}

const handleRate = (rating: number) => {
  emit('rate-joke', props.joke.id, rating)
}

const categoryClasses = computed(() => {
  switch(props.joke.type.toLowerCase()) {
    case 'programming':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    case 'general':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
  }
})

const cardClasses = computed(() => {
  return [
    'card p-6 h-full flex flex-col',
    isHighlighted.value ? 'ring-2 ring-primary transform scale-[1.02]' : '',
    isFlipped.value ? 'bg-accent-50 dark:bg-accent-900' : ''
  ].join(' ')
})

</script>

<template>
  <div
    :class="cardClasses"
    @mouseenter="highlight"
    @mouseleave="unhighlight"
    @touchstart="highlight"
    @touchend="unhighlight"
    @touchcancel="unhighlight"
  >
    <div class="flex items-start justify-between mb-3">
      <span
        :class="['text-xs font-medium px-2 py-1 rounded-full capitalize', categoryClasses]"
      >
        {{ joke.type }}
      </span>
      <StarRating :value="joke.rating || 0" @update:value="handleRate" />
    </div>

    <div class="flex-grow">
      <div class="mb-3 text-lg font-medium text-gray-800 dark:text-gray-200">
        {{ joke.setup }}
      </div>

      <div v-if="isFlipped" class="mt-3 text-base font-light text-accent-700 dark:text-accent-400 animate-fade-in">
        {{ joke.punchline }}
      </div>
    </div>

    <div class="flex justify-center mt-4">
      <button
        @click="toggleFlip"
        class="flex items-center text-sm btn btn-secondary"
      >
        {{ isFlipped ? 'Hide Answer' : 'Reveal Punchline' }}
      </button>
    </div>
  </div>
</template>
