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

<style scoped lang="scss">
/* Hero */
.hero {
  height: 600px;
  background-image: url('@/assets/images/hero.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  margin-bottom: var(--space-80);
}
.hero .container {
  width: 100%;
}
.hero-content {
  color: var(--color-text-light);
  padding-left: var(--space-64);
}

.hero-content h1 {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-heading);
  cursor: pointer;
}

.hero-content p {
  font-size: var(--font-size-lg);
  margin: var(--space-16) 0;
}

.hero-content a {
  display: inline-block;
  background-color: var(--color-primary);
  padding: var(--space-8) var(--space-32);
  border-radius: var(--radius-full);
  transition:
    color 300ms ease,
    background-color 300ms ease;
}

.hero-content a:hover {
  color: var(--color-primary);
  background-color: var(--color-background-secondary);
}
@media (max-width: 799px) {
  .hero {
    height: 480px;
  }
}

@media (max-width: 499px) {
  .hero-content {
    padding-left: 0;
  }
  .hero-content h1 {
    font-size: var(--font-size-2xl);
  }
}
</style>
