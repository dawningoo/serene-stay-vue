<script setup>
import { ref } from 'vue'
const showAlternate = ref(false)
function toggleText() {
  showAlternate.value = !showAlternate.value
}
</script>

<template>
  <section class="hero">
    <div class="container hero__inner">
      <div class="hero__content">
        <span class="hero__eyebrow">{{
          showAlternate ? 'HAVE A GOOD TIME' : 'A BETTER PLACE TO STAY'
        }}</span>
        <h1 class="hero__title" @click="toggleText">
          <template v-if="showAlternate">讓每一段旅程<br />都成為美好回憶</template>
          <template v-else>在山海之間<br />找到更好的自己</template>
        </h1>
        <p class="hero__subtitle">
          {{ showAlternate ? '享受當下・讓身心在旅途中自在放鬆' : '放慢腳步・享受舒適的住宿體驗' }}
        </p>
        <RouterLink class="hero__cta" to="/#contact">立即預訂 ➜</RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero {
  height: 480px;
  background-image: url('@/assets/images/hero.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  margin-bottom: var(--space-80);

  @include up(md) {
    height: 600px;
  }

  &__inner {
    width: 100%;
  }

  &__content {
    color: var(--color-text-light);

    @include up(sm) {
      padding-left: var(--space-64);
    }
  }

  &__title {
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-heading);
    cursor: pointer;

    @include up(sm) {
      font-size: var(--font-size-3xl);
    }
  }

  &__subtitle {
    font-size: var(--font-size-lg);
    margin: var(--space-16) 0;
  }

  &__cta {
    display: inline-block;
    background-color: var(--color-primary);
    padding: var(--space-8) var(--space-32);
    border-radius: var(--radius-full);
    transition:
      color 300ms ease,
      background-color 300ms ease;

    &:hover {
      color: var(--color-primary);
      background-color: var(--color-background-secondary);
    }
  }
}
</style>
