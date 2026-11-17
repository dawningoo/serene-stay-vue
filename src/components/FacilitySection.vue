<script setup>
import FacilityItem from './FacilityItem.vue'
import { facilities } from '@/data/facilities'
</script>

<template>
  <section id="facilities" class="facilities">
    <div class="facilities-left">
      <div class="facilities-heading">
        <span>FACILITIES</span>
        <h2>完善設施</h2>
        <p>讓您的旅程更加舒適愜意</p>
      </div>
      <ul>
        <FacilityItem v-for="item in facilities" :key="item.id" :item="item" />
      </ul>
    </div>
    <div class="facilities-right"></div>
  </section>
</template>
