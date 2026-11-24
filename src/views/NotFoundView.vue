<template>
  <div class="container not-found">
    <div class="not-found__card">
      <span class="not-found__code" aria-hidden="true">404</span>
      <h1 class="not-found__title">找不到這個頁面</h1>
      <p class="not-found__text">網址可能輸入錯誤，或頁面已經移除。</p>
      <RouterLink class="not-found__button" to="/">回到首頁</RouterLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.not-found {
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

  &__code {
    display: block;
    color: var(--color-primary);
    font-size: var(--font-size-3xl);
    font-weight: var(--font-weight-bold);
    margin-bottom: var(--space-16);
  }

  &__title {
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-bold);
    margin-bottom: var(--space-8);
  }

  &__text {
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
