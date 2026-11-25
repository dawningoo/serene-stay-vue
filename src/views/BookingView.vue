<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { calculateBooking } from '@/utils/pricing'
import { clearCart, addToCart, createOrder } from '@/api/orders'
import { useRoom } from '@/composables/useRoom'

const route = useRoute()
const router = useRouter()
const isSubmitting = ref(false)
const submitError = ref('')

const roomId = computed(() => String(route.query.roomId ?? ''))
const { room, isLoading } = useRoom(roomId)

// 網址上的值一律當成不可信的輸入：價格不從網址帶，而是用房型資料重新計算
const checkIn = computed(() => String(route.query.checkIn ?? ''))
const checkOut = computed(() => String(route.query.checkOut ?? ''))
const guests = computed(() => Number(route.query.guests) || 1)

const isGuestsValid = computed(
  () =>
    Number.isInteger(guests.value) && guests.value >= 1 && guests.value <= room.value?.maxGuests,
)

const booking = computed(() =>
  calculateBooking({
    checkIn: checkIn.value,
    checkOut: checkOut.value,
    basePrice: room.value?.price ?? 0,
  }),
)

// 聯絡資料（v-model 綁定到表單欄位）
const name = ref('')
const email = ref('')
const tel = ref('')

// 簡單驗證：回傳錯誤訊息，沒錯就回傳空字串
const formError = computed(() => {
  if (!name.value.trim()) return '請填寫姓名'
  if (!/^\S+@\S+\.\S+$/.test(email.value)) return 'Email 格式不正確'
  if (!/^09\d{8}$/.test(tel.value)) return '手機請填寫 09 開頭的 10 位數字'
  return ''
})

const submitted = ref(false)

async function handleSubmit() {
  submitted.value = true
  if (formError.value) return

  isSubmitting.value = true
  submitError.value = ''
  try {
    await clearCart()
    await addToCart(room.value.id, booking.value.nights)
    const result = await createOrder(
      {
        name: name.value,
        email: email.value,
        tel: tel.value,
        address: '無需地址', // 練習用 API 要求此欄位且不可為空
      },
      `期間 ${checkIn.value} ~ ${checkOut.value}・人數 ${guests.value}・總計 ${booking.value.total.toLocaleString()}`,
    )
    router.replace({
      name: 'booking-success',
      query: {
        orderId: result.orderId,
      },
    })
  } catch (error) {
    submitError.value = error.message
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="container booking">
    <p v-if="isLoading" class="booking__status" role="status">載入中…</p>

    <div v-else-if="!room || booking.error || !isGuestsValid" class="booking__status">
      <p>預訂資料不完整，請重新選擇房型與日期。</p>
      <RouterLink to="/#rooms">回到房型列表</RouterLink>
    </div>

    <template v-else>
      <h1 class="booking__title">確認預訂資訊</h1>
      <div class="booking__layout">
        <section>
          <h2 class="booking__subtitle">預訂明細</h2>
          <dl class="booking__summary">
            <div class="booking__row">
              <dt>房型</dt>
              <dd>{{ room.name }}</dd>
            </div>
            <div class="booking__row">
              <dt>入住日期</dt>
              <dd>{{ checkIn }}</dd>
            </div>
            <div class="booking__row">
              <dt>退房日期</dt>
              <dd>{{ checkOut }}</dd>
            </div>
            <div class="booking__row">
              <dt>住宿晚數</dt>
              <dd>{{ booking.nights }} 晚</dd>
            </div>
            <div class="booking__row">
              <dt>入住人數</dt>
              <dd>{{ guests }} 位</dd>
            </div>
            <div class="booking__row booking__row--total">
              <dt>總計</dt>
              <dd>NT$ {{ booking.total.toLocaleString() }}</dd>
            </div>
          </dl>
        </section>
        <section>
          <h2 class="booking__subtitle">聯絡資料</h2>
          <form class="booking__form" novalidate @submit.prevent="handleSubmit">
            <div class="booking__field">
              <label for="name">姓名</label>
              <input id="name" v-model="name" type="text" autocomplete="name" />
            </div>
            <div class="booking__field">
              <label for="email">Email</label>
              <input id="email" v-model="email" type="email" autocomplete="email" />
            </div>
            <div class="booking__field">
              <label for="tel">手機</label>
              <input id="tel" v-model="tel" type="tel" autocomplete="tel" />
            </div>

            <p v-if="submitted && formError" class="booking__error" role="alert">
              {{ formError }}
            </p>
            <p v-if="submitError" class="booking__error" role="alert">
              {{ submitError }}
            </p>

            <button :disabled="isSubmitting" class="booking__submit" type="submit">
              {{ isSubmitting ? '送出中…' : '送出訂單' }}
            </button>
          </form>
        </section>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.booking {
  margin: var(--space-24) auto var(--space-80);

  &__layout {
    display: grid;
    gap: var(--space-24);

    @include up(md) {
      grid-template-columns: 1fr 1fr;
    }
  }

  &__title {
    font-size: var(--font-size-2xl);
    line-height: var(--line-height-heading);
    margin-bottom: var(--space-24);
  }

  &__summary {
    background-color: var(--color-background-secondary);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-8);
    padding: var(--space-24);
  }

  &__row {
    display: flex;
    justify-content: space-between;
    padding-block: var(--space-8);

    &--total {
      margin-top: var(--space-8);
      border-top: 1px solid var(--color-border);
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-bold);
      color: var(--color-primary);
    }
  }

  &__status {
    text-align: center;
    padding-block: var(--space-48);
  }

  &__subtitle {
    font-size: var(--font-size-xl);
    margin-bottom: var(--space-16);
  }

  &__form {
    display: grid;
    gap: var(--space-16);
  }

  &__field {
    display: grid;
    gap: var(--space-8);

    input {
      padding: var(--space-8) var(--space-16);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-8);
      font: inherit;
    }
  }

  &__error {
    color: var(--color-error);
  }

  &__submit {
    padding: var(--space-16);
    border: 0;
    border-radius: var(--radius-8);
    background-color: var(--color-primary);
    color: var(--color-text-light);
    font: inherit;
    font-weight: var(--font-weight-bold);
    cursor: pointer;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}
</style>
