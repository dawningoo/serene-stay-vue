<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { addDays, calculateBooking, getToday } from '@/utils/pricing'
import { useRoom } from '@/composables/useRoom'

const route = useRoute()
const router = useRouter()
const today = getToday()
const checkIn = ref('')
const checkOut = ref('')
const guests = ref(1)

const roomId = computed(() => String(route.params.id ?? ''))
const { room, isLoading } = useRoom(roomId)

watch(room, (newRoom) => {
  if (newRoom) guests.value = Math.min(2, newRoom.maxGuests || 1)
})

const facts = computed(() => {
  if (!room.value) return []
  return [
    { label: '可住人數', value: `最多 ${room.value.maxGuests} 人` },
    { label: '房間大小', value: `${room.value.size} m²` },
    { label: '床型', value: room.value.bed },
  ]
})

// 退房日最早是入住日的隔天；還沒選入住日時，以明天為下限
const minCheckOut = computed(() => addDays(checkIn.value || today, 1))

// 人數選項：1 到這間房的可住人數上限
const guestOptions = computed(() => {
  const max = room.value?.maxGuests || 1
  return Array.from({ length: max }, (_, index) => index + 1)
})

// 住幾晚、總價都由純函式算出來，這裡只負責把表單的值傳進去
const booking = computed(() =>
  calculateBooking({
    checkIn: checkIn.value,
    checkOut: checkOut.value,
    basePrice: room.value?.price ?? 0,
  }),
)

// 使用者還沒填完時不提示錯誤，只有「已經填了但不合理」才顯示
const errorMessage = computed(() => {
  if (checkIn.value && checkIn.value < today) return '入住日期不能早於今天'
  if (checkIn.value && checkOut.value && booking.value.error === 'INVALID_RANGE') {
    return '退房日期必須晚於入住日期'
  }
  return ''
})
const canSubmit = computed(() => booking.value.error === null && !errorMessage.value)

// 入住日改到比退房日還晚時，清掉退房日，避免留著不合理的組合
watch(checkIn, (value) => {
  if (checkOut.value && checkOut.value <= value) checkOut.value = ''
})

function handleSubmit() {
  if (!canSubmit.value) return
  router.push({
    name: 'booking',
    query: {
      roomId: room.value.id,
      checkIn: checkIn.value,
      checkOut: checkOut.value,
      guests: guests.value,
    },
  })
}
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
          <li><RouterLink to="/#rooms">房型</RouterLink></li>
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

          <form class="room-detail__form" novalidate @submit.prevent="handleSubmit">
            <div class="room-detail__dates">
              <div class="room-detail__field">
                <label class="room-detail__label" for="check-in">入住日期</label>
                <input
                  id="check-in"
                  v-model="checkIn"
                  class="room-detail__input"
                  type="date"
                  :min="today"
                />
              </div>
              <div class="room-detail__field">
                <label class="room-detail__label" for="check-out">退房日期</label>
                <input
                  id="check-out"
                  v-model="checkOut"
                  class="room-detail__input"
                  type="date"
                  :min="minCheckOut"
                />
              </div>
            </div>

            <div class="room-detail__field">
              <label class="room-detail__label" for="guests">入住人數</label>
              <select id="guests" v-model="guests" class="room-detail__input">
                <option v-for="count in guestOptions" :key="count" :value="count">
                  {{ count }} 位
                </option>
              </select>
            </div>

            <p v-if="errorMessage" class="room-detail__error" role="alert">{{ errorMessage }}</p>

            <div v-else-if="booking.nights" class="room-detail__summary" aria-live="polite">
              <p class="room-detail__summary-row">
                <span>住宿 {{ booking.nights }} 晚</span>
              </p>
              <p v-if="booking.weekendNights" class="room-detail__summary-note">
                含 {{ booking.weekendNights }} 晚週五、週六加價 20%
              </p>
              <p class="room-detail__total">
                <span>總價</span>
                <strong>NT$ {{ booking.total.toLocaleString() }}</strong>
              </p>
            </div>

            <button class="room-detail__submit" type="submit" :disabled="!canSubmit">
              前往填寫訂房資料
            </button>
          </form>
        </aside>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.room-detail {
  margin-bottom: var(--space-80);

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
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-bold);
    cursor: pointer;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &__error {
    font-size: var(--font-size-sm);
    color: var(--color-error);
  }

  &__summary {
    display: grid;
    gap: var(--space-8);
    padding-top: var(--space-16);
    border-top: 1px solid var(--color-border);
  }

  &__summary-row,
  &__total {
    display: flex;
    justify-content: space-between;
  }

  &__summary-note {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
  }

  &__total {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-bold);
    color: var(--color-primary);
  }

  &__status {
    text-align: center;
    padding-block: var(--space-48);
  }
}
</style>
