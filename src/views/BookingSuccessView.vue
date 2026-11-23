<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const orderId = computed(() => String(route.query.orderId ?? ''))
</script>

<template>
  <div class="container success">
    <div v-if="orderId" class="success__content">
      <h1>訂房成功</h1>
      <p>訂單編號：{{ orderId }}</p>
      <RouterLink to="/">回到首頁</RouterLink>
    </div>

    <div v-else class="success__content">
      <p>找不到訂單資訊</p>
      <RouterLink to="/">回到首頁</RouterLink>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
