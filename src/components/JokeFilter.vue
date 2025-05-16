<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  selectedCategory: string,
  sortBy: string,
  sortDirection: string
}>()

const emit = defineEmits<{
  (e: 'filter-change', category: string): void,
  (e: 'sort-change', sort: { by: string, direction: string }): void
}>()

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'general', label: 'General' },
  { value: 'programming', label: 'Programming' },
]

const sortOptions = [
  { value: 'default', label: 'Default' },
  { value: 'alphabetical', label: 'Alphabetical' },
  { value: 'type', label: 'Category' },
  { value: 'length', label: 'Length' },
]

const handleCategoryChange = (category: string) => {
  emit('filter-change', category)
}

const handleSortChange = (by: string) => {
  emit('sort-change', { by, direction: props.sortDirection })
}

const toggleSortDirection = () => {
  const newDirection = props.sortDirection === 'asc' ? 'desc' : 'asc'
  emit('sort-change', { by: props.sortBy, direction: newDirection })
}
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-6">
    <div class="flex flex-col sm:flex-row gap-4 items-center justify-between">
      <div class="w-full sm:w-auto flex flex-col sm:flex-row gap-4">
        <div>
          <label for="category" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Category
          </label>
          <select 
            id="category" 
            :value="selectedCategory" 
            @change="handleCategoryChange(($event.target as HTMLSelectElement).value)"
            class="select"
          >
            <option v-for="category in categories" :key="category.value" :value="category.value">
              {{ category.label }}
            </option>
          </select>
        </div>
        
        <div>
          <label for="sortBy" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Sort By
          </label>
          <div class="flex space-x-2">
            <select 
              id="sortBy" 
              :value="sortBy" 
              @change="handleSortChange(($event.target as HTMLSelectElement).value)"
              class="select"
            >
              <option v-for="option in sortOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
            
            <button 
              @click="toggleSortDirection" 
              class="btn btn-secondary px-3"
              :disabled="sortBy === 'default'"
              :aria-label="sortDirection === 'asc' ? 'Sort descending' : 'Sort ascending'"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor" 
                class="w-5 h-5"
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