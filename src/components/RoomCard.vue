<script setup>
defineProps({
  room: Object,
})
</script>

<template>
  <li>
    <img :src="room.image" :alt="room.name" />
    <div class="room-content">
      <h3>{{ room.name }}</h3>
      <p>{{ room.description }}</p>
      <div class="room-booking">
        <span>NT ${{ room.price.toLocaleString() }} 起</span>
        <RouterLink to="/#contact" :aria-label="`預訂${room.name}`">
          <img src="@/assets/images/icons/arrow-right.svg" alt="" />
        </RouterLink>
      </div>
    </div>
  </li>
</template>

<style scoped lang="scss">
.rooms ul li {
  width: calc((100% - (var(--space-24) * 3)) / 4);
  background-color: var(--color-background-secondary);
  border-radius: var(--radius-8);
  border: 1px solid var(--color-border);
  overflow: hidden;
}

.rooms ul > li > img {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.room-content {
  padding: var(--space-16);
}

.room-content h3 {
  font-size: var(--font-size-xl);
  line-height: var(--line-height-heading);
}

.room-content p {
  color: var(--color-text-secondary);
  margin: var(--space-8) 0;
}

.room-booking {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--color-primary);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
}

.room-booking a img {
  width: 32px;
  height: 32px;
}

@media (max-width: 1249px) {
  .rooms ul li {
    width: calc((100% - (var(--space-24))) / 2);
  }
}
@media (max-width: 499px) {
  .rooms ul li {
    width: 100%;
  }
}
</style>
