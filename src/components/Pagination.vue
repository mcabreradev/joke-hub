<script setup lang="ts">
import { computed } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/solid'

const props = defineProps<{
  currentPage: number,
  totalPages: number,
  maxVisibleButtons?: number
}>()

const emit = defineEmits<{
  (e: 'page-change', page: number): void
}>()

const maxVisibleButtons = props.maxVisibleButtons || 5

const isFirstPage = computed(() => props.currentPage === 1)
const isLastPage = computed(() => props.currentPage === props.totalPages)

const startPage = computed(() => {
  if (props.totalPages <= maxVisibleButtons) {
    return 1
  }
  
  const halfButtons = Math.floor(maxVisibleButtons / 2)
  
  if (props.currentPage <= halfButtons) {
    return 1
  }
  
  if (props.currentPage + halfButtons >= props.totalPages) {
    return Math.max(1, props.totalPages - maxVisibleButtons + 1)
  }
  
  return props.currentPage - halfButtons
})

const endPage = computed(() => {
  if (props.totalPages <= maxVisibleButtons) {
    return props.totalPages
  }
  
  return Math.min(startPage.value + maxVisibleButtons - 1, props.totalPages)
})

const pages = computed(() => {
  const range = []
  for (let i = startPage.value; i <= endPage.value; i++) {
    range.push(i)
  }
  return range
})

const hasPages = computed(() => props.totalPages > 1)

const changePage = (page: number) => {
  if (page === props.currentPage) return
  if (page < 1) page = 1
  if (page > props.totalPages) page = props.totalPages
  
  emit('page-change', page)
}
</script>

<template>
  <nav v-if="hasPages" aria-label="Pagination">
    <ul class="flex items-center -space-x-px">
      <!-- Previous button -->
      <li>
        <button 
          @click="changePage(currentPage - 1)" 
          :disabled="isFirstPage"
          :class="[
            'flex items-center justify-center px-3 h-9 rounded-l-md border',
            isFirstPage 
              ? 'text-gray-400 bg-gray-100 cursor-not-allowed border-gray-300 dark:bg-gray-800 dark:border-gray-700' 
              : 'text-gray-600 bg-white hover:bg-gray-100 border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700'
          ]"
        >
          <span class="sr-only">Previous</span>
          <ChevronLeftIcon class="w-5 h-5" />
        </button>
      </li>
      
      <!-- Page numbers -->
      <li v-for="page in pages" :key="page">
        <button 
          @click="changePage(page)" 
          :class="[
            'flex items-center justify-center px-4 h-9 border',
            page === currentPage 
              ? 'z-10 bg-primary-50 border-primary-500 text-primary-600 dark:bg-primary-900/30 dark:border-primary-500 dark:text-primary-400' 
              : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700'
          ]"
        >
          {{ page }}
        </button>
      </li>
      
      <!-- Next button -->
      <li>
        <button 
          @click="changePage(currentPage + 1)" 
          :disabled="isLastPage"
          :class="[
            'flex items-center justify-center px-3 h-9 rounded-r-md border',
            isLastPage 
              ? 'text-gray-400 bg-gray-100 cursor-not-allowed border-gray-300 dark:bg-gray-800 dark:border-gray-700' 
              : 'text-gray-600 bg-white hover:bg-gray-100 border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700'
          ]"
        >
          <span class="sr-only">Next</span>
          <ChevronRightIcon class="w-5 h-5" />
        </button>
      </li>
    </ul>
  </nav>
</template>