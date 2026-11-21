<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getRoomById } from '@/api/rooms'

const route = useRoute()
const room = ref(null)
const isLoading = ref(true)

const checkIn = ref('')
const checkOut = ref('')
const guests = ref(2)

// TODO: 暫時寫死，之後換成每間房自己的資料
const facts = [
  { label: '可住人數', value: '最多 2 人' },
  { label: '房間大小', value: '22 m²' },
  { label: '床型', value: '一張雙人床' },
]
onMounted(async () => {
  room.value = await getRoomById(route.params.id)
  isLoading.value = false
})
</script>

<template>
  <div class="container room-detail">
    <p v-if="isLoading" class="room-detail__status" role="status">載入中…</p>

    <div v-else-if="!room" class="room-detail__status">
      <p>找不到這間房型</p>
      <RouterLink to="/#rooms">回到房型列表</RouterLink>
    </div>

    <template v-else>
      <nav class="room-detail__breadcrumb" aria-label="麵包屑">
        <ol>
          <li><RouterLink to="/">首頁</RouterLink></li>
          <li><RouterLink to="/#rooms">房型介紹</RouterLink></li>
          <li aria-current="page">{{ room.name }}</li>
        </ol>
      </nav>

      <div class="room-detail__layout">
        <article class="room-detail__main">
          <img class="room-detail__image" :src="room.image" :alt="room.name" />
          <h1 class="room-detail__title">{{ room.name }}</h1>
          <p class="room-detail__subtitle">{{ room.description }}</p>
          <p v-if="room.content" class="room-detail__content">{{ room.content }}</p>

          <ul class="room-detail__facts">
            <li v-for="fact in facts" :key="fact.label" class="room-detail__fact">
              <span class="room-detail__fact-label">{{ fact.label }}</span>
              <span class="room-detail__fact-value">{{ fact.value }}</span>
            </li>
          </ul>
        </article>

        <aside class="room-detail__booking">
          <p class="room-detail__price">
            NT$ {{ room.price.toLocaleString() }}
            <span class="room-detail__price-unit">起 / {{ room.unit }}</span>
          </p>
          <p class="room-detail__price-note">週五、週六入住加價 20%</p>

          <form class="room-detail__form" @submit.prevent>
            <div class="room-detail__dates">
              <div class="room-detail__field">
                <label class="room-detail__label" for="check-in">入住日期</label>
                <input id="check-in" v-model="checkIn" class="room-detail__input" type="date" />
              </div>
              <div class="room-detail__field">
                <label class="room-detail__label" for="check-out">退房日期</label>
                <input id="check-out" v-model="checkOut" class="room-detail__input" type="date" />
              </div>
            </div>

            <div class="room-detail__field">
              <label class="room-detail__label" for="guests">入住人數</label>
              <select id="guests" v-model="guests" class="room-detail__input">
                <option :value="1">1 位</option>
                <option :value="2">2 位</option>
              </select>
            </div>

            <button class="room-detail__submit" type="submit">前往填寫訂房資料</button>
          </form>
        </aside>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.room-detail {
  &__breadcrumb ol {
    display: flex;
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    margin: var(--space-16) 0 var(--space-16);

    @include up(lg) {
      margin: var(--space-24) 0 var(--space-24);
    }

    & li + li::before {
      content: '/';
      margin: 0 var(--space-8);
    }
  }

  &__layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-24);

    @include up(lg) {
      grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
      gap: var(--space-32);
      align-items: start;
    }
  }

  &__image {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    border-radius: var(--radius-8);
  }

  &__title {
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-heading);
    margin: var(--space-24) 0 var(--space-8);
  }

  &__subtitle {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-medium);
    color: var(--color-primary);
    margin-bottom: var(--space-16);
  }

  &__content {
    font-size: var(--font-size-md);
    color: var(--color-text-secondary);
    line-height: var(--line-height-default);
    margin-bottom: var(--space-24);
  }

  &__facts {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-16);

    @include up(md) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  &__fact {
    display: flex;
    justify-content: space-between;
    background-color: var(--color-background-secondary);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-8);
    padding: var(--space-16);

    @include up(md) {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  &__fact-label {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
  }

  &__fact-value {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-medium);
  }

  &__booking {
    background-color: var(--color-background-secondary);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-8);
    padding: var(--space-24);

    @include up(lg) {
      position: sticky;
      top: var(--space-24);
    }
  }

  &__price {
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-heading);
    color: var(--color-primary);
  }

  &__price-unit {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-secondary);
  }

  &__price-note {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    margin: var(--space-8) 0 var(--space-24);
  }

  &__label {
    display: block;
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-secondary);
  }

  &__form {
    display: grid;
    gap: var(--space-16);
  }

  &__dates {
    display: grid;
    gap: var(--space-16);

    @include up(lg) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  &__input {
    width: 100%;
    height: 44px;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-8);
    padding: 0 var(--space-8);
    font-size: var(--font-size-md);
  }
  &__submit {
    width: 100%;
    height: 48px;
    border: 0;
    border-radius: var(--radius-full);
    background-color: var(--color-primary);
    color: var(--color-text-light);
    font-weight: var(--font-weight-bold);
    cursor: pointer;
  }

  &__status {
    text-align: center;
    padding-block: var(--space-48);
  }
}
</style>
