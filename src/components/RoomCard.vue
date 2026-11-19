<script setup>
defineProps({
  room: { type: Object, required: true },
})
</script>

<template>
  <li class="room-card">
    <img class="room-card__image" :src="room.image" :alt="room.name" loading="lazy" />
    <div class="room-card__content">
      <h3>{{ room.name }}</h3>
      <p>{{ room.description }}</p>
      <div class="room-card__booking">
        <span>NT ${{ room.price.toLocaleString() }} 起</span>
        <RouterLink to="/#contact" :aria-label="`預訂${room.name}`">
          <img class="room-card__booking-icon" src="@/assets/images/icons/arrow-right.svg" alt="" />
        </RouterLink>
      </div>
    </div>
  </li>
</template>

<style scoped lang="scss">
.room-card {
  background-color: var(--color-background-secondary);
  border-radius: var(--radius-8);
  border: 1px solid var(--color-border);
  overflow: hidden;

  &__image {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
  }

  &__content {
    padding: var(--space-16);

    h3 {
      font-size: var(--font-size-xl);
      line-height: var(--line-height-heading);
    }

    p {
      color: var(--color-text-secondary);
      margin: var(--space-8) 0;
    }
  }

  &__booking {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--color-primary);
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-bold);
  }

  &__booking-icon {
    width: 32px;
    height: 32px;
  }
}
</style>
