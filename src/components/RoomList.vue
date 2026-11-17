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
