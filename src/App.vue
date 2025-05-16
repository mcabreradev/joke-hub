<script setup lang="ts">
import { provide, ref } from 'vue'
import { useColorMode } from '@vueuse/core'

const colorMode = useColorMode({
  attribute: 'class',
  modes: {
    light: '',
    dark: 'dark',
  }
})

const isDarkMode = ref(colorMode.value === 'dark')

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  colorMode.value = isDarkMode.value ? 'dark' : 'light'
}

provide('darkMode', {
  isDarkMode,
  toggleDarkMode
})
</script>

<template>
  <div class="min-h-screen">
    <router-view v-slot="{ Component }">
      <transition name="page-fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>