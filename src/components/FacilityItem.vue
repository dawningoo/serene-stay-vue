<script setup>
defineProps({
  item: Object,
})
</script>

<template>
  <li>
    <img :src="item.icon" alt="" />
    <div>
      <h3>{{ item.title }}</h3>
      <p>{{ item.description }}</p>
    </div>
  </li>
</template>

<style scoped lang="scss">
.facilities-left ul li {
  width: calc((100% - var(--space-24)) / 2);
  background-color: var(--color-background-secondary);
  border-radius: var(--radius-8);
  border: 1px solid var(--color-border);
  padding: var(--space-8) var(--space-16);
  display: flex;
  align-items: center;
  gap: var(--space-8);
}

.facilities-left ul li img {
  height: 48px;
  width: 48px;
  background-color: var(--color-background-primary);
  padding: var(--space-8);
}

.facilities-left ul li h3 {
  font-size: var(--font-size-lg);
}

.facilities-left ul li p {
  color: var(--color-text-secondary);
}
@media (max-width: 1249px) {
  .facilities-left ul li {
    flex-direction: column;
    text-align: center;
  }

  .facilities-left ul li p {
    font-size: var(--font-size-sm);
  }
}
@media (max-width: 499px) {
  .facilities-left ul li p {
    display: none;
  }
}
</style>
