import { describe, expect, it } from 'vitest'
import { addDays, calculateBooking } from './pricing'

describe('addDays', () => {
  it('addDays 可以跨月、跨年', () => {
    expect(addDays('2026-11-30', 1)).toBe('2026-12-01')
    expect(addDays('2026-12-31', 1)).toBe('2027-01-01')
  })
})

describe('calculateBooking', () => {
  const basePrice = 2800

  it('入住日格式錯誤', () => {
    const result = calculateBooking({ checkIn: 'abc', checkOut: '2026-11-24', basePrice })
    expect(result).toMatchObject({ nights: 0, total: 0, error: 'INVALID_DATE' })
  })

  it('退房日格式錯誤', () => {
    const result = calculateBooking({ checkIn: '2026-11-01', checkOut: 'abc', basePrice })
    expect(result).toMatchObject({ nights: 0, total: 0, error: 'INVALID_DATE' })
  })

  it('平日住一晚：不加價', () => {
    const result = calculateBooking({ checkIn: '2026-11-23', checkOut: '2026-11-24', basePrice })
    expect(result).toMatchObject({ nights: 1, total: 2800, error: null })
  })

  it('週五住一晚：加價 20%', () => {
    const result = calculateBooking({ checkIn: '2026-11-27', checkOut: '2026-11-28', basePrice })
    expect(result).toMatchObject({ nights: 1, total: 3360, error: null })
    expect(result.weekendNights).toBe(1)
  })

  it('週五加週六：兩晚都加價', () => {
    const result = calculateBooking({ checkIn: '2026-11-27', checkOut: '2026-11-29', basePrice })
    expect(result).toMatchObject({ nights: 2, total: 6720 })
  })

  it('週四到週日：只有週五、週六加價', () => {
    const result = calculateBooking({ checkIn: '2026-11-26', checkOut: '2026-11-29', basePrice })
    expect(result).toMatchObject({ nights: 3, total: 9520 })
    expect(result.weekendNights).toBe(2)
  })

  it('週日住一晚：不加價', () => {
    const result = calculateBooking({ checkIn: '2026-11-29', checkOut: '2026-11-30', basePrice })
    expect(result).toMatchObject({ nights: 1, total: 2800 })
  })

  it('可以跨月、跨年', () => {
    expect(
      calculateBooking({ checkIn: '2026-11-30', checkOut: '2026-12-02', basePrice }),
    ).toMatchObject({ nights: 2, total: 5600 })
    // 2026-12-31 是週四、2027-01-01 是週五
    expect(
      calculateBooking({ checkIn: '2026-12-31', checkOut: '2027-01-02', basePrice: 1000 }),
    ).toMatchObject({ nights: 2, total: 2200 })
  })

  it('每晚加價後四捨五入成整數', () => {
    const result = calculateBooking({
      checkIn: '2026-11-27',
      checkOut: '2026-11-28',
      basePrice: 2999,
    })
    expect(result.total).toBe(3599)
  })

  it('退房不晚於入住：INVALID_RANGE', () => {
    const same = calculateBooking({ checkIn: '2026-11-27', checkOut: '2026-11-27', basePrice })
    const reversed = calculateBooking({ checkIn: '2026-11-28', checkOut: '2026-11-27', basePrice })
    expect(same).toMatchObject({ nights: 0, total: 0, error: 'INVALID_RANGE' })
    expect(reversed).toMatchObject({ nights: 0, total: 0, error: 'INVALID_RANGE' })
  })

  it('沒填日期：MISSING_DATE', () => {
    expect(calculateBooking({ checkIn: '', checkOut: '2026-11-28', basePrice }).error).toBe(
      'MISSING_DATE',
    )
    expect(calculateBooking({ checkIn: '2026-11-27', checkOut: '', basePrice }).error).toBe(
      'MISSING_DATE',
    )
  })
})
