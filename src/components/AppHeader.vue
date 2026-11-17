<script setup>
import { ref } from 'vue'
const isMenuOpen = ref(false)
</script>

<template>
  <header class="header">
    <div class="container">
      <RouterLink to="/">
        <img src="@/assets/images/logo.png" alt="Serene Stay" class="logo" />
      </RouterLink>
      <nav class="nav">
        <ul>
          <li><RouterLink to="/">Home</RouterLink></li>
          <li><RouterLink to="/#rooms">Rooms</RouterLink></li>
          <li><RouterLink to="/#facilities">Facilities</RouterLink></li>
          <li><RouterLink to="/#contact">Contact</RouterLink></li>
        </ul>
      </nav>
      <button class="nav-hamburger" type="button" aria-label="開啟" @click="isMenuOpen = true">
        <img src="@/assets/images/icons/hamburger.svg" alt="" />
      </button>
      <nav class="nav-mobile" :class="{ active: isMenuOpen }" @click="isMenuOpen = false">
        <ul>
          <li><RouterLink to="/">Home</RouterLink></li>
          <li><RouterLink to="/#rooms">Rooms</RouterLink></li>
          <li><RouterLink to="/#facilities">Facilities</RouterLink></li>
          <li><RouterLink to="/#contact">Contact</RouterLink></li>
        </ul>
        <button class="nav-close" type="button" aria-label="關閉" @click="isMenuOpen = false">
          <img src="@/assets/images/icons/x.svg" alt="" />
        </button>
      </nav>
    </div>
  </header>
</template>
