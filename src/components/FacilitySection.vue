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

<style scoped lang="scss">
/* Facilities */
.facilities {
  display: flex;
  flex-wrap: wrap;
}

.facilities-left {
  width: 50%;
  background-color: var(--color-background-secondary);
  padding: var(--space-64) var(--space-24) var(--space-64)
    max(calc((100vw - var(--container-max)) / 2 + var(--container-gutter)), var(--container-gutter));
}

.facilities-heading {
  margin-bottom: var(--space-24);
}

.facilities-heading span,
.facilities-heading p {
  font-weight: var(--font-weight-bold);
  color: var(--color-text-secondary);
}

.facilities-heading h2 {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
}

.facilities-left ul {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-24);
}
.facilities-right {
  width: 50%;
  background-image: url('@/assets/images/facility.png');
  background-size: cover;
  background-position: right center;
  background-repeat: no-repeat;
}
@media (max-width: 799px) {
  .facilities-heading {
    text-align: center;
  }

  .facilities-left {
    width: 100%;
  }

  .facilities-right {
    display: none;
  }
}
</style>
