// 週五、週六住宿加價 20%
const WEEKEND_RATE = 1.2
const EMPTY = { nights: 0, total: 0, weekendNights: 0 }

// 使用者本地時區的今天，格式 'YYYY-MM-DD'（'sv-SE' 這個語系剛好是這個格式）
export function getToday() {
  return new Date().toLocaleDateString('sv-SE')
}

// 在 'YYYY-MM-DD' 上加天數，回傳 'YYYY-MM-DD'
export function addDays(dateString, days) {
  const date = new Date(dateString)
  date.setUTCDate(date.getUTCDate() + days)
  return date.toISOString().slice(0, 10)
}

export function calculateBooking({ checkIn, checkOut, basePrice }) {
  if (!checkIn || !checkOut) return { ...EMPTY, error: 'MISSING_DATE' }

  const start = new Date(checkIn)
  const end = new Date(checkOut)
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()))
    return { ...EMPTY, error: 'INVALID_DATE' }
  if (end <= start) return { ...EMPTY, error: 'INVALID_RANGE' }

  let nights = 0
  let weekendNights = 0
  let total = 0

  // 從入住日走到退房日的前一天，每一晚判斷是不是週五、週六
  const day = new Date(start)
  while (day < end) {
    const weekday = day.getUTCDay() // 週日 = 0 … 週六 = 6
    if (weekday === 5 || weekday === 6) {
      weekendNights++
      total += Math.round(basePrice * WEEKEND_RATE)
    } else {
      total += basePrice
    }
    nights++
    day.setUTCDate(day.getUTCDate() + 1)
  }

  return { nights, total, weekendNights, error: null }
}
