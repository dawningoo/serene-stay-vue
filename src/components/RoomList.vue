<script setup>
import RoomCard from './RoomCard.vue'
import { rooms } from '@/data/rooms'
</script>

<template>
  <section id="rooms" class="rooms">
    <div class="container">
      <div class="rooms-heading">
        <span>OUR ROOMS</span>
        <h2>精選房型</h2>
        <p>不同的旅程，同樣的舒適，找到最適合您的房間。</p>
      </div>
      <ul>
        <RoomCard v-for="room in rooms" :key="room.id" :room="room" />
      </ul>
    </div>
  </section>
</template>

<style scoped lang="scss">
/* Rooms */
.rooms {
  margin-bottom: var(--space-80);
}

.rooms-heading {
  text-align: center;
  margin-bottom: var(--space-24);
}

.rooms-heading span,
.rooms-heading p {
  font-weight: var(--font-weight-bold);
  color: var(--color-text-secondary);
}

.rooms-heading h2 {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
}

.rooms ul {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-24);
}
</style>
