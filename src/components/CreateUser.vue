<template>
  <form
    @submit="(e) => e.preventDefault()"
    class="p-10 shadow rounded-md w-4/12 mx-auto border flex flex-col gap-4"
  >
    <h1 class="text-2xl text-center font-semibold">Create User</h1>
    <div>
      <div class="pb-1">Username</div>
      <input
        type="text"
        v-model="userName"
        class="border border-black px-4 py-2 rounded-md w-full"
      />
    </div>
    <div>
      <div class="pb-1">Email</div>
      <input
        type="text"
        v-model="email"
        class="border border-black px-4 py-2 rounded-md w-full"
        :class="!isEmailError && 'border-red-600'"
      />
      <div class="text-sm pl-2 text-red-600" v-if="!isEmailError">Invalid email</div>
    </div>
    <div>
      <div class="pb-1">Password</div>
      <input
        type="password"
        v-model="password"
        :class="!isPasswordError && 'border-red-600'"
        class="border border-black px-4 py-2 rounded-md w-full"
      />
      <div class="text-xs pl-2 opacity-60">Password must meet the criteria.</div>
      <div class="text-sm pl-2 text-red-600" v-if="!isPasswordError">Invalid Password</div>
    </div>
    <div>
      <div class="pb-1">Mobile Number</div>
      <input
        type="number"
        v-model="phoneNumber"
        class="border border-black px-4 py-2 rounded-md w-full"
        :class="!isPhoneNumberError && 'border-red-600'"
      />
      <div class="text-sm pl-2 text-red-600" v-if="!isPhoneNumberError">Invalid phoneNumber</div>
    </div>
    <div>
      <button
        class="bg-gray-500 text-white px-4 py-2 rounded-md w-full mt-6 disabled:opacity-25"
        @click="handleCreateUserClick"
        :disabled="disableCreateUser"
      >
        Create an User
      </button>
    </div>
  </form>
</template>

<script setup>
import { computed, ref } from 'vue'
import { checkValidEmail, checkValidPassword, checkValidPhoneNumber } from '../utils/validate'

const userName = ref('')

const email = ref('')
const isEmailError = ref(true)

const password = ref('')
const isPasswordError = ref(true)

const phoneNumber = ref('')
const isPhoneNumberError = ref(true)

const disableCreateUser = computed(() => {
  return [userName, email, password, phoneNumber].some((field) => !field.value)
})

const handleCreateUserClick = async () => {
  isEmailError.value = checkValidEmail(email.value)
  isPasswordError.value = checkValidPassword(password.value)
  isPhoneNumberError.value = checkValidPhoneNumber(phoneNumber.value)

  if (!isEmailError.value || !isPasswordError.value || !isPhoneNumberError.value) return

  try {
    const data = await fetch(
      `http://localhost:8099/user/user-details?userName=${userName.value}&email=${email.value}&password=${password.value}&phoneNumber=${phoneNumber.value}`
    )

    const json = await data.json()
    console.log('🚀 > handleCreateUserClick > json:', json)
  } catch (error) {
    console.error('error', error)
  }
}
</script>
