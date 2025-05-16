<script setup lang="ts">
import { ref, onMounted, inject, computed } from 'vue'
import { useJokeStore } from '@/stores/jokeStore'
import JokeList from '@/components/JokeList.vue'
import Pagination from '@/components/Pagination.vue'
import JokeFilter from '@/components/JokeFilter.vue'
import AppHeader from '@/components/AppHeader.vue'

type SortDirection = 'asc' | 'desc'
type SortBy = 'default' | 'alphabetical' | 'type' | 'length'
type Category = 'all' | 'general' | 'programming'

const { isDarkMode, toggleDarkMode } = inject('darkMode') as { isDarkMode: any, toggleDarkMode: () => void }
const jokeStore = useJokeStore()

const isLoading = ref(true)
const error = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const selectedCategory = ref<Category>('all')
const sortBy = ref<SortBy>('default')
const sortDirection = ref<SortDirection>('asc')

const loadJokes = async () => {
  isLoading.value = true
  error.value = ''

  try {
    await jokeStore.fetchJokes()
    isLoading.value = false
  } catch (err) {
    error.value = 'Failed to load jokes. Please try again later.'
    isLoading.value = false
  }
}

const filteredJokes = computed(() => {
  let result = [...jokeStore.jokes]

  // Filter by category
  if (selectedCategory.value !== 'all') {
    result = result.filter(joke => joke.type === selectedCategory.value)
  }

  // Sort by selected criteria
  if (sortBy.value === 'type') {
    result.sort((a, b) => {
      return sortDirection.value === 'asc'
        ? a.type.localeCompare(b.type)
        : b.type.localeCompare(a.type)
    })
  } else if (sortBy.value === 'length') {
    result.sort((a, b) => {
      const aLength = (a.setup + a.punchline).length
      const bLength = (b.setup + b.punchline).length
      return sortDirection.value === 'asc' ? aLength - bLength : bLength - aLength
    })
  } else if (sortBy.value === 'alphabetical') {
    result.sort((a, b) => {
      return sortDirection.value === 'asc'
        ? a.setup.localeCompare(b.setup)
        : b.setup.localeCompare(a.setup)
    })
  }

  return result
})

const paginatedJokes = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value
  return filteredJokes.value.slice(startIndex, startIndex + pageSize.value)
})

const totalPages = computed(() => {
  return Math.ceil(filteredJokes.value.length / pageSize.value)
})

const handlePageChange = (page: number) => {
  currentPage.value = page
}

const handleFilterChange = (category: Category) => {
  selectedCategory.value = category
  currentPage.value = 1 // Reset to first page when filtering
}

const handleSortChange = (sort: { by: SortBy, direction: SortDirection }) => {
  sortBy.value = sort.by
  sortDirection.value = sort.direction
  currentPage.value = 1 // Reset to first page when sorting
}

const handlePageSizeChange = (size: number) => {
  pageSize.value = size
  currentPage.value = 1 // Reset to first page when changing page size
}

onMounted(loadJokes)
</script>

<template>
  <div class="min-h-screen">
    <AppHeader :isDarkMode="isDarkMode" @toggle-dark-mode="toggleDarkMode" />

    <main class="container px-4 py-8 mx-auto">
      <div class="mb-8 text-center">
        <h1 class="mb-4 text-4xl font-bold text-primary-600 dark:text-primary-400">
          Uncle Mike Joke Central
        </h1>
        <p class="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
          Enjoy our collection of dad jokes that will make you laugh, groan, or both.
          Sort, filter, and rate them to find your favorites!
        </p>
      </div>

      <div class="mb-8">
        <JokeFilter
          :selected-category="selectedCategory"
          :sort-by="sortBy"
          :sort-direction="sortDirection"
          @filter-change="handleFilterChange"
          @sort-change="handleSortChange"
        />
      </div>

      <div v-if="isLoading" class="flex justify-center my-12">
        <div class="w-12 h-12 border-t-2 border-b-2 rounded-full animate-spin border-primary-500"></div>
      </div>

      <div v-else-if="error" class="p-4 border-l-4 rounded-md bg-error-100 border-error-500 text-error-700" role="alert">
        <p>{{ error }}</p>
        <button @click="loadJokes" class="mt-2 btn btn-primary">Try Again</button>
      </div>

      <template v-else>
        <transition-group name="joke" tag="div">
          <JokeList
            :jokes="paginatedJokes"
            @rate-joke="jokeStore.rateJoke"
          />
        </transition-group>

        <div class="flex flex-col items-center justify-between gap-4 mt-8 sm:flex-row">
          <div class="flex items-center space-x-2">
            <label for="pageSize" class="text-sm text-gray-600 dark:text-gray-400">Jokes per page:</label>
            <select
              id="pageSize"
              v-model="pageSize"
              @change="handlePageSizeChange(pageSize)"
              class="w-auto px-2 py-1 text-sm select"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </div>

          <Pagination
            :current-page="currentPage"
            :total-pages="totalPages"
            @page-change="handlePageChange"
          />
        </div>
      </template>
    </main>

    <footer class="py-6 mt-12 bg-gray-100 dark:bg-gray-800">
      <div class="container px-4 mx-auto text-center">
        <p class="text-gray-600 dark:text-gray-400">
          Using the <a href="https://github.com/15Dkatz/official_joke_api" target="_blank" class="text-primary-500 hover:underline">Official Joke API</a>
        </p>
        <p class="mt-2 text-sm text-gray-500 dark:text-gray-500">
          Built with Vue 3, Tailwind CSS, and TypeScript
        </p>
      </div>
    </footer>
  </div>
</template>
