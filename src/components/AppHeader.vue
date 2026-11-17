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

<style scoped lang="scss">
/* Header */
.header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--space-8);
  padding-bottom: var(--space-8);
  position: relative;
}

.header .logo {
  width: 200px;
}

.header nav ul {
  display: flex;
}

.header nav ul li a {
  font-weight: var(--font-weight-medium);
  padding: var(--space-8) var(--space-24);
  transition:
    color 300ms ease,
    background-color 300ms ease;
  border-radius: var(--radius-full);
}

.header nav ul li a:hover {
  color: var(--color-text-light);
  background-color: var(--color-primary);
}
.nav-hamburger {
  display: none;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
}

.nav-close {
  border: none;
  background: transparent;
  cursor: pointer;
  display: block;
  margin: 0 auto;
  padding-bottom: var(--space-8);
}

.nav-mobile {
  display: none;
}
@media (max-width: 799px) {
  .nav {
    display: none;
  }

  .nav-hamburger {
    display: block;
  }

  .nav-mobile {
    display: none;
    position: absolute;
    top: 100%;
    right: 0;
    width: 100%;
    background-color: var(--color-background-primary);
    z-index: 100;
  }

  .nav-mobile.active {
    display: block;
  }

  .nav-mobile ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: var(--space-24);
    gap: var(--space-16);
  }
}
</style>
