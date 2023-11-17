import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const userDetails = ref([])

  const getUserDetails = computed(() => userDetails)

  function setUserDetails(data) {
    userDetails.value = data
  }

  return { userDetails, getUserDetails, setUserDetails }
})
