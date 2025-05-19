<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  value: number,
  max?: number
}>()

const emit = defineEmits<{
  (e: 'update:value', value: number): void
}>()

const maxStars = props.max || 5
const hoverRating = ref(0)
const stars = ref(Array.from({ length: maxStars }, (_, i) => i + 1))

watch(() => props.value, (newVal) => {
  if (newVal < 0) emit('update:value', 0)
  if (newVal > maxStars) emit('update:value', maxStars)
})

const setHoverRating = (rating: number) => {
  hoverRating.value = rating
}

const resetHoverRating = () => {
  hoverRating.value = 0
}

const setRating = (rating: number) => {
  emit('update:value', rating)
}
</script>

<template>
  <div
    class="flex items-center space-x-1"
    @mouseleave="resetHoverRating"
  >
    <template v-for="star in stars" :key="star">
      <button
        type="button"
        @click="setRating(star)"
        @mouseenter="setHoverRating(star)"
        class="focus:outline-none"
      >
        <!-- Full star -->
        <svg
          v-if="(hoverRating || props.value) >= star"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          :class="[
            'w-5 h-5',
            hoverRating >= star
              ? 'text-accent-400 animate-pulse'
              : 'text-accent-500'
          ]"
          fill="currentColor"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>

        <!-- Empty star -->
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          class="w-5 h-5 text-gray-400"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </button>
    </template>
  </div>
</template>
