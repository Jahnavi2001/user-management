<template>
  <div
    class="fixed inset-0 bg-[rgba(0,0,0,.64)] flex items-center justify-center"
    @click="$emit('close-modal')"
  >
    <div class="bg-white p-8 rounded-lg shadow-md relative w-4/12" @click.stop>
      <button @click="$emit('close-modal')" class="absolute -top-7 right-0 text-white font-bold">
        <svg
          data-v-0e03718a=""
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          preserveAspectRatio="xMidYMid meet"
          width="24"
          height="24"
          viewBox="0 0 18 18"
          style="vertical-align: middle"
        >
          <path
            transform="translate(-524 -217) translate(524 217) translate(3 3)"
            d="M2.236.385L6 4.15 9.764.385c.514-.513 1.337-.513 1.85 0 .514.514.514 1.337 0 1.85L7.85 6l3.765 3.764c.513.514.513 1.337 0 1.85-.257.258-.591.386-.925.386-.335 0-.669-.128-.926-.385L6 7.85l-3.764 3.765c-.257.257-.591.385-.926.385-.334 0-.668-.128-.925-.385-.513-.514-.513-1.337 0-1.85L4.15 6 .385 2.236c-.513-.514-.513-1.337 0-1.85.514-.514 1.337-.514 1.85 0z"
          ></path>
        </svg>
      </button>
      <div class="text-center text-lg font-bold">User Data</div>
      <div class="flex flex-col gap-4 mt-6">
        <div class="flex">
          <div class="w-4/12">User name:</div>
          <div class="opacity-60">{{ userData.userName }}</div>
        </div>
        <div class="flex w-full">
          <div class="w-4/12">Email:</div>
          <div class="opacity-60">{{ userData.emailId }}</div>
        </div>
        <div class="flex w-full">
          <div class="w-4/12">Contact number:</div>
          <div class="opacity-60">{{ userData.phoneNo }}</div>
        </div>
        <div class="flex w-full">
          <div class="w-4/12">User name:</div>
          <div class="opacity-60">{{ userData.userName }}</div>
        </div>
        <div class="flex w-full">
          <div class="w-4/12">Created date:</div>
          <div class="opacity-60">{{ userData.createddate }}</div>
        </div>
      </div>
      <div class="w-full flex justify-center">
        <button @click="downloadReport" class="mt-8 px-4 py-2 rounded bg-gray-500 text-white">
          Download User Data
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>

import { ref } from 'vue'

const props = defineProps({
  userData: {
    type: Object,
    default: () => {}
  }
})
const propsData = ref(props.userData)

const downloadReport = async () => {
  const data = await fetch(`http://10.20.2.119:8099/user/download-report?id=${propsData.value.id}`)
  const blob = await data.blob()
  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(blob)
  link.download = 'user-report.pdf'
  link.click()
}
</script>
