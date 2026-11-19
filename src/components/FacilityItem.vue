<script setup>
defineProps({
  item: { type: Object, required: true },
})
</script>

<template>
  <li class="facility-item">
    <img class="facility-item__icon" :src="item.icon" alt="" />
    <div>
      <h3>{{ item.title }}</h3>
      <p>{{ item.description }}</p>
    </div>
  </li>
</template>

<style scoped lang="scss">
.facility-item {
  background-color: var(--color-background-secondary);
  border-radius: var(--radius-8);
  border: 1px solid var(--color-border);
  padding: var(--space-8) var(--space-16);
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  gap: var(--space-8);

  &__icon {
    height: 48px;
    width: 48px;
    background-color: var(--color-background-primary);
    padding: var(--space-8);
  }

  h3 {
    font-size: var(--font-size-lg);
  }

  p {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    display: none;
  }

  @include up(sm) {
    p {
      display: block;
    }
  }

  @include up(lg) {
    flex-direction: row;
    text-align: left;

    p {
      font-size: var(--font-size-md);
    }
  }
}
</style>
