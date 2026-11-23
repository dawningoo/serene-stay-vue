import { rooms as mockRooms } from '@/data/rooms'

const BASE = import.meta.env.VITE_API_BASE
const PATH = import.meta.env.VITE_API_PATH

// 把 API 的欄位轉成頁面用的格式
function normalize(product) {
  return {
    category: product.category,
    content: product.content,
    description: product.description,
    id: product.id,
    image: product.imageUrl,
    originPrice: product.origin_price,
    price: product.price,
    name: product.title,
    unit: product.unit,
    maxGuests: product.maxGuests,
    size: product.size,
    bed: product.bed,
  }
}

const fallbackRooms = mockRooms.map((room) => ({
  category: '',
  content: '',
  description: room.description,
  id: room.id,
  image: room.image,
  originPrice: room.price,
  price: room.price,
  name: room.name,
  unit: '晚',
  maxGuests: 2,
  size: 0,
  bed: '',
}))

export async function getRooms() {
  try {
    const res = await fetch(`${BASE}/v2/api/${PATH}/products/all`)
    if (!res.ok) throw new Error('API error')
    const json = await res.json()
    if (!json.success) throw new Error(json.message)
    return json.products.map(normalize)
  } catch (error) {
    console.warn('API 失敗，改用本地資料', error)
    return fallbackRooms
  }
}

export async function getRoomById(id) {
  try {
    const res = await fetch(`${BASE}/v2/api/${PATH}/product/${id}`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const json = await res.json()
    if (!json.success) return null
    return normalize(json.product)
  } catch (error) {
    console.warn('API 失敗，改用本地資料', error)
    return fallbackRooms.find((room) => String(room.id) === String(id)) ?? null
  }
}
