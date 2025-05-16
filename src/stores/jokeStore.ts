import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import { jokeApi } from '@/services/api'
import type { Joke, RatingsMap } from '@/types'

const STORAGE_KEY = 'jokeRatings' as const

export const useJokeStore = defineStore('jokes', () => {
  // State
  const jokes = ref<Joke[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Computed
  const sortedJokes = computed(() => [...jokes.value].sort((a, b) => (b.rating || 0) - (a.rating || 0)))
  const hasJokes = computed(() => jokes.value.length > 0)
  const topRatedJokes = computed(() => sortedJokes.value.slice(0, 5))

  // Methods
  const loadRatings = (): void => {
    try {
      const savedRatings = localStorage.getItem(STORAGE_KEY)
      if (!savedRatings) return

      const ratingsMap = JSON.parse(savedRatings) as RatingsMap
      jokes.value = jokes.value.map(joke => ({
        ...joke,
        rating: ratingsMap[joke.id] ?? 0
      }))
    } catch (err) {
      console.error('Error loading ratings:', err)
      error.value = 'Failed to load ratings from storage'
    }
  }

  const saveRatings = (): void => {
    try {
      const ratingsMap = jokes.value.reduce<RatingsMap>((acc, joke) => {
        if (joke.rating) {
          acc[joke.id] = joke.rating
        }
        return acc
      }, {})

      localStorage.setItem(STORAGE_KEY, JSON.stringify(ratingsMap))
    } catch (err) {
      console.error('Error saving ratings:', err)
      error.value = 'Failed to save ratings to storage'
    }
  }

  const generateUniqueId = (): number => {
    const timestamp = Date.now()
    const random = Math.floor(Math.random() * 10000)
    return timestamp + random
  }

  const fetchJokes = async (): Promise<void> => {
    isLoading.value = true
    error.value = null

    try {
      const [generalResponse, programmingResponse] = await Promise.all([
        jokeApi.getGeneralJokes(),
        jokeApi.getProgrammingJokes()
      ])

      const allJokes = [...generalResponse.data, ...programmingResponse.data]
      const uniqueJokes = allJokes.map(joke => ({
        ...joke,
        id: generateUniqueId(),
        rating: 0
      }))

      jokes.value = uniqueJokes
      await loadRatings()
    } catch (err) {
      console.error('Error fetching jokes:', err)
      error.value = 'Failed to fetch jokes. Please try again later.'
    } finally {
      isLoading.value = false
    }
  }

  const rateJoke = (jokeId: number, rating: number): void => {
    if (rating < 0 || rating > 5) {
      console.error('Invalid rating value')
      return
    }

    const jokeIndex = jokes.value.findIndex(joke => joke.id === jokeId)
    if (jokeIndex === -1) {
      console.error('Joke not found')
      return
    }

    jokes.value[jokeIndex] = {
      ...jokes.value[jokeIndex],
      rating
    }

    saveRatings()
  }

  const clearRatings = (): void => {
    jokes.value = jokes.value.map(joke => ({ ...joke, rating: 0 }))
    localStorage.removeItem(STORAGE_KEY)
  }

  return {
    // State
    jokes,
    isLoading,
    error,
    // Computed
    sortedJokes,
    hasJokes,
    topRatedJokes,
    // Methods
    fetchJokes,
    rateJoke,
    clearRatings
  }
})
