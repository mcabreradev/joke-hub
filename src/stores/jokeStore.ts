import { defineStore } from 'pinia'
import { ref } from 'vue'
import { jokeApi } from '@/services/api'
import { Joke } from '@/types'

export const useJokeStore = defineStore('jokes', () => {
  const jokes = ref<Joke[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Load ratings from localStorage if available
  const loadRatings = () => {
    const savedRatings = localStorage.getItem('jokeRatings')
    if (savedRatings) {
      const ratingsMap = JSON.parse(savedRatings) as Record<number, number>

      jokes.value = jokes.value.map(joke => ({
        ...joke,
        rating: ratingsMap[joke.id] || 0
      }))
    }
  }

  // Save ratings to localStorage
  const saveRatings = () => {
    const ratingsMap = jokes.value.reduce((acc, joke) => {
      if (joke.rating) {
        acc[joke.id] = joke.rating
      }
      return acc
    }, {} as Record<number, number>)

    localStorage.setItem('jokeRatings', JSON.stringify(ratingsMap))
  }

  // Fetch jokes from the API
  const fetchJokes = async () => {
    isLoading.value = true
    error.value = null
    
    try {
      // We'll use multiple API calls to get a diverse set of jokes
      const [generalResponse, programmingResponse] = await Promise.all([
        jokeApi.getGeneralJokes(),
        jokeApi.getProgrammingJokes()
      ])
      
      const allJokes = [...generalResponse.data, ...programmingResponse.data]

      const uniqueJokes = allJokes.map((joke, index) => ({
        ...joke,
        id: index + Math.floor(Math.random() * 10000)
      }))

      jokes.value = uniqueJokes
      loadRatings()
      isLoading.value = false
    } catch (err) {
      console.error('Error fetching jokes:', err)
      error.value = 'Failed to fetch jokes. Please try again later.'
      isLoading.value = false
    }
  }

  // Rate a joke
  const rateJoke = (jokeId: number, rating: number) => {
    const jokeIndex = jokes.value.findIndex(joke => joke.id === jokeId)

    if (jokeIndex !== -1) {
      jokes.value[jokeIndex] = {
        ...jokes.value[jokeIndex],
        rating
      }

      saveRatings()
    }
  }

  return {
    jokes,
    isLoading,
    error,
    fetchJokes,
    rateJoke
  }
})
