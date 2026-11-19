<script setup>
import RoomCard from './RoomCard.vue'
import { rooms } from '@/data/rooms'
</script>

<template>
  <section id="rooms" class="rooms">
    <div class="container">
      <div class="rooms__heading">
        <span>OUR ROOMS</span>
        <h2>精選房型</h2>
        <p>不同的旅程，同樣的舒適，找到最適合您的房間。</p>
      </div>
      <ul class="rooms__list">
        <RoomCard v-for="room in rooms" :key="room.id" :room="room" />
      </ul>
    </div>
  </section>
</template>

<style scoped lang="scss">
.rooms {
  margin-bottom: var(--space-80);

  &__heading {
    text-align: center;
    margin-bottom: var(--space-24);

    span,
    p {
      font-weight: var(--font-weight-bold);
      color: var(--color-text-secondary);
    }

    h2 {
      font-size: var(--font-size-2xl);
      font-weight: var(--font-weight-bold);
    }
  }

  &__list {
    display: grid;
    gap: var(--space-24);
    grid-template-columns: minmax(0, 1fr);

    @include up(sm) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @include up(lg) {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }
}
</style>
