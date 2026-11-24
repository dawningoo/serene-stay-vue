import { ref, onMounted } from 'vue'
import { getRoomById } from '@/api/rooms'

export function useRoom(roomId) {
  const room = ref(null)
  const isLoading = ref(true)

  onMounted(async () => {
    room.value = await getRoomById(roomId.value)
    isLoading.value = false
  })

  return { room, isLoading }
}
