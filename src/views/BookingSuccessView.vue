<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const orderId = computed(() => String(route.query.orderId ?? ''))
</script>

<template>
  <div class="container success">
    <div v-if="orderId" class="success__card">
      <span class="success__icon" aria-hidden="true">✓</span>
      <h1 class="success__title">訂房成功</h1>
      <p class="success__order">訂單編號：{{ orderId }}</p>
      <RouterLink class="success__button" to="/">回到首頁</RouterLink>
    </div>

    <div v-else class="success__card">
      <h1 class="success__title">找不到訂單資訊</h1>
      <RouterLink class="success__button" to="/">回到首頁</RouterLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.success {
  margin: var(--space-48) auto var(--space-80);
  display: flex;
  justify-content: center;

  &__card {
    max-width: 480px;
    width: 100%;
    background-color: var(--color-background-secondary);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-8);
    padding: var(--space-32);
    text-align: center;
  }

  &__icon {
    width: 64px;
    height: 64px;
    font-size: var(--font-size-2xl);
    color: var(--color-text-light);
    background-color: var(--color-primary);
    border-radius: var(--radius-full);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto var(--space-16);
  }

  &__title {
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-bold);
    margin-bottom: var(--space-8);
  }

  &__order {
    color: var(--color-text-secondary);
    margin-bottom: var(--space-24);
  }

  &__button {
    display: inline-block;
    color: var(--color-text-light);
    background-color: var(--color-primary);
    padding: var(--space-8) var(--space-32);
    border-radius: var(--radius-full);
  }
}
</style>
