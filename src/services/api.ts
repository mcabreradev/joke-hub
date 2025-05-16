import axios, { AxiosInstance, AxiosResponse } from 'axios'
import type { Joke } from '@/types'

const API_CONFIG = {
  baseURL: 'https://official-joke-api.appspot.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
} as const

class JokeApiService {
  private api: AxiosInstance

  constructor() {
    this.api = axios.create(API_CONFIG)
    this.setupInterceptors()
  }

  private setupInterceptors(): void {
    // Response interceptor
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        const errorMessage = error.response?.data?.message || 'An error occurred'
        console.error('API Error:', errorMessage)
        return Promise.reject(error)
      }
    )
  }

  async getGeneralJokes(): Promise<AxiosResponse<Joke[]>> {
    try {
      return await this.api.get<Joke[]>('/jokes/ten')
    } catch (error) {
      console.error('Failed to fetch general jokes:', error)
      throw error
    }
  }

  async getProgrammingJokes(): Promise<AxiosResponse<Joke[]>> {
    try {
      return await this.api.get<Joke[]>('/jokes/programming/ten')
    } catch (error) {
      console.error('Failed to fetch programming jokes:', error)
      throw error
    }
  }
}

export const jokeApi = new JokeApiService()
