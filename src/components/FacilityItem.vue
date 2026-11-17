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
