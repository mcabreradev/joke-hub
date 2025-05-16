import axios from 'axios'
import { Joke } from '@/types'

const api = axios.create({
  baseURL: 'https://official-joke-api.appspot.com',
})

export const jokeApi = {
  getGeneralJokes: () => api.get<Joke[]>('/jokes/ten'),
  getProgrammingJokes: () => api.get<Joke[]>('/jokes/programming/ten'),
}

export default api
