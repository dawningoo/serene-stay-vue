<script setup>
import { ref } from 'vue'
import { navLinks } from '@/data/navLinks'

const isMenuOpen = ref(false)
</script>

<template>
  <header class="header">
    <div class="container header__inner">
      <RouterLink to="/">
        <img class="header__logo" src="@/assets/images/logo.webp" alt="Serene Stay" />
      </RouterLink>
      <nav class="header__nav">
        <ul class="header__nav-list">
          <li v-for="link in navLinks" :key="link.label">
            <RouterLink class="header__link" :to="link.to">{{ link.label }}</RouterLink>
          </li>
        </ul>
      </nav>
      <button
        class="header__menu-toggle"
        type="button"
        :aria-label="isMenuOpen ? '關閉選單' : '開啟選單'"
        :aria-expanded="isMenuOpen"
        @click="isMenuOpen = !isMenuOpen"
      >
        <img src="@/assets/images/icons/hamburger.svg" alt="" />
      </button>
      <nav
        class="header__mobile-menu"
        :class="{ 'header__mobile-menu--open': isMenuOpen }"
        @click="isMenuOpen = false"
      >
        <ul class="header__mobile-list">
          <li v-for="link in navLinks" :key="link.label">
            <RouterLink class="header__link" :to="link.to">{{ link.label }}</RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  &__inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: var(--space-8);
    padding-bottom: var(--space-8);
    position: relative;
  }

  &__logo {
    width: 200px;
  }

  &__nav {
    display: none;

    @include up(md) {
      display: block;
    }
  }

  &__nav-list {
    display: flex;
  }

  &__link {
    font-weight: var(--font-weight-medium);
    padding: var(--space-8) var(--space-24);
    transition:
      color 300ms ease,
      background-color 300ms ease;
    border-radius: var(--radius-full);

    &:hover {
      color: var(--color-text-light);
      background-color: var(--color-primary);
    }
  }

  &__menu-toggle {
    display: block;
    border: none;
    background: transparent;
    padding: 0;
    cursor: pointer;

    @include up(md) {
      display: none;
    }
  }

  &__mobile-menu {
    display: none;
    position: absolute;
    top: 100%;
    right: 0;
    width: 100%;
    background-color: var(--color-background-primary);
    z-index: 100;

    &--open {
      display: block;
    }

    @include up(md) {
      display: none;
    }
  }

  &__mobile-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: var(--space-24);
    gap: var(--space-16);
  }
}
</style>
