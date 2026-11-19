<script setup>
import FacilityItem from './FacilityItem.vue'
import { facilities } from '@/data/facilities'
</script>

<template>
  <section id="facilities" class="facilities">
    <div class="facilities__content">
      <div class="facilities__heading">
        <span>FACILITIES</span>
        <h2>完善設施</h2>
        <p>讓您的旅程更加舒適愜意</p>
      </div>
      <ul class="facilities__list">
        <FacilityItem v-for="item in facilities" :key="item.id" :item="item" />
      </ul>
    </div>
    <div class="facilities__image" aria-hidden="true"></div>
  </section>
</template>

<style scoped lang="scss">
.facilities {
  display: flex;
  flex-wrap: wrap;

  &__content {
    width: 100%;
    background-color: var(--color-background-secondary);
    padding: var(--space-64) var(--space-24) var(--space-64)
      max(
        calc((100vw - var(--container-max)) / 2 + var(--container-gutter)),
        var(--container-gutter)
      );

    @include up(md) {
      width: 50%;
    }
  }

  &__heading {
    margin-bottom: var(--space-24);
    text-align: center;

    span,
    p {
      font-weight: var(--font-weight-bold);
      color: var(--color-text-secondary);
    }

    h2 {
      font-size: var(--font-size-2xl);
      font-weight: var(--font-weight-bold);
    }

    @include up(md) {
      text-align: left;
    }
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-24);
  }

  &__image {
    display: none;
    background-image: url('@/assets/images/facility.png');
    background-size: cover;
    background-position: right center;
    background-repeat: no-repeat;

    @include up(md) {
      display: block;
      width: 50%;
    }
  }
}
</style>
