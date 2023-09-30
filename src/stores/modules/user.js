import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'big-user',
  () => {
    const token = ref('')
    const setToken = (t) => (token.value = t)
    const removeToken = () => {
      token.value = ''
    }

    return { token, setToken, removeToken }
  },
  {
    persist: true
  }
)
