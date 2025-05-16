<script setup lang="ts">
type SortDirection = 'asc' | 'desc'
type SortBy = 'default' | 'alphabetical' | 'type' | 'length'
type Category = 'all' | 'general' | 'programming'

const props = defineProps<{
  selectedCategory: Category,
  sortBy: SortBy,
  sortDirection: SortDirection
}>()

const emit = defineEmits<{
  (e: 'filter-change', category: Category): void,
  (e: 'sort-change', sort: { by: SortBy, direction: SortDirection }): void
}>()

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'general', label: 'General' },
  { value: 'programming', label: 'Programming' },
] as const

const sortOptions = [
  { value: 'default', label: 'Default' },
  { value: 'alphabetical', label: 'Alphabetical' },
  { value: 'type', label: 'Category' },
  { value: 'length', label: 'Length' },
] as const

const handleCategoryChange = (category: Category) => {
  emit('filter-change', category)
}

const handleSortChange = (by: SortBy) => {
  emit('sort-change', { by, direction: props.sortDirection })
}

const toggleSortDirection = () => {
  if (props.sortBy === 'default') return
  const newDirection: SortDirection = props.sortDirection === 'asc' ? 'desc' : 'asc'
  emit('sort-change', { by: props.sortBy, direction: newDirection })
}
</script>

<template>
  <div class="p-4 rounded-lg shadow-sm sm:p-6">
    <div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
      <div class="flex flex-col w-full gap-4 sm:w-auto sm:flex-row">
        <div>
          <label for="category" class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            Category
          </label>
          <select
            id="category"
            :value="selectedCategory"
            @change="handleCategoryChange(($event.target as HTMLSelectElement).value as Category)"
            class="select"
          >
            <option v-for="category in categories" :key="category.value" :value="category.value">
              {{ category.label }}
            </option>
          </select>
        </div>

        <div>
          <label for="sortBy" class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            Sort By
          </label>
          <div class="flex space-x-2">
            <select
              id="sortBy"
              :value="sortBy"
              @change="handleSortChange(($event.target as HTMLSelectElement).value as SortBy)"
              class="select"
            >
              <option v-for="option in sortOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>

            <button
              @click="toggleSortDirection"
              class="px-3 btn btn-secondary"
              :disabled="sortBy === 'default'"
              :title="sortBy === 'default' ? 'Select a sort option first' : `Sort ${sortDirection === 'asc' ? 'descending' : 'ascending'}`"
              :aria-label="sortDirection === 'asc' ? 'Sort descending' : 'Sort ascending'"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="w-5 h-5 transition-transform duration-200"
                :class="{ 'transform rotate-180': sortDirection === 'desc' }"
              >
                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.select {
  @apply px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-gray-700 dark:text-gray-300;
}

.select:focus {
  @apply outline-none ring-2 ring-primary-500 border-primary-500;
}

.btn {
  @apply inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors;
}

.btn-secondary {
  @apply bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:ring-gray-500;
}

.btn-secondary:disabled {
  @apply opacity-50 cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800;
}
</style>
