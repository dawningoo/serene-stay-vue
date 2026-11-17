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
