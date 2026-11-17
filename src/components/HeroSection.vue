<script setup>
import { ref } from 'vue'
const isChanged = ref(false)
function changeText() {
  isChanged.value = !isChanged.value
}
</script>

<template>
  <section class="hero">
    <div class="container">
      <div class="hero-content">
        <span>{{ isChanged ? 'HAVE A GOOD TIME' : 'A BETTER PLACE TO STAY' }}</span>
        <h1 @click="changeText">
          <template v-if="isChanged">讓每一段旅程<br />都成為美好回憶</template>
          <template v-else>在山海之間<br />找到更好的自己</template>
        </h1>
        <p>{{ isChanged ? '享受當下・讓身心在旅途中自在放鬆' : '放慢腳步・享受舒適的住宿體驗' }}</p>
        <RouterLink to="/#contact">立即預訂 ➜</RouterLink>
      </div>
    </div>
  </section>
</template>
