<template>
  <form
    @submit="(e) => e.preventDefault()"
    class="p-10 shadow rounded-md w-full lg:w-4/12 lg:mx-auto border flex flex-col gap-4"
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
        autocomplete=""
      />
      <div class="text-xs pl-2 opacity-60">
        Use a password with a minimum of 8 characters, including at least one uppercase letter, one
        lowercase letter, and one number.
      </div>
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
        @click="handleCreateUserAccountClick"
        :disabled="disableCreateUserAccount"
      >
        Create User Account
      </button>
    </div>

    <div class="bg-lime-500 rounded-lg px-4 py-2 fixed left-10 bottom-10" v-if="showSuccessToast">
      User Account created successfully.
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

const showSuccessToast = ref(false)

const disableCreateUserAccount = computed(() => {
  return [userName, email, password, phoneNumber].some((field) => !field.value)
})

const handleCreateUserAccountClick = async () => {
  isEmailError.value = checkValidEmail(email.value)
  isPasswordError.value = checkValidPassword(password.value)
  isPhoneNumberError.value = checkValidPhoneNumber(phoneNumber.value)

  if (!isEmailError.value || !isPasswordError.value || !isPhoneNumberError.value) return

  try {
    const data = await fetch(
      `http://10.20.2.119:8099/user/user-details?userName=${userName.value}&emailId=${email.value}&password=${password.value}&phoneNumber=${phoneNumber.value}`,
      {
        method: 'POST'
      }
    )

    const json = await data.json()

    if (json.userName) {
      showSuccessToast.value = true
      setTimeout(() => {
        showSuccessToast.value = false
      }, 3000)

      userName.value = ''
      email.value = ''
      password.value = ''
      phoneNumber.value = ''
    }
  } catch (error) {
    console.error('error', error)
  }
}
</script>
