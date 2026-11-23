const BASE = import.meta.env.VITE_API_BASE
const PATH = import.meta.env.VITE_API_PATH

export async function clearCart() {
  const checkRes = await fetch(`${BASE}/v2/api/${PATH}/cart`)
  const checkJson = await checkRes.json()
  if (checkJson.data.carts.length === 0) return

  const res = await fetch(`${BASE}/v2/api/${PATH}/carts`, { method: 'DELETE' })
  const json = await res.json()
  if (!json.success) throw new Error(json.message)
}

export async function addToCart(product_id, qty) {
  const res = await fetch(`${BASE}/v2/api/${PATH}/cart`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: { product_id, qty } }),
  })
  const json = await res.json()
  if (!json.success) throw new Error(json.message)
}

export async function createOrder(user, message) {
  const res = await fetch(`${BASE}/v2/api/${PATH}/order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: { user, message } }),
  })
  const json = await res.json()
  if (!json.success) throw new Error(json.message)
  return json
}
