<template>
  <div>
    <table
      class="rounded-lg w-[250%] lg:w-full table-fixed border-collapse border border-slate-400"
    >
      <thead>
        <th
          class="rounded-lg border border-slate-300 text-left px-4 py-3 bg-gray-100 w-3/12"
          id="user-id"
        >
          ID
        </th>
        <th class="border border-slate-300 text-left px-4 py-3 bg-gray-100 w-3/12" id="user-name">
          User Name
        </th>
        <th class="border border-slate-300 text-left px-4 py-3 bg-gray-100 w-3/12" id="email">
          Email
        </th>
        <th
          class="border border-slate-300 text-left px-4 py-3 bg-gray-100 w-2/12"
          id="phone-number"
        >
          Contact Number
        </th>
        <th
          id="created-date"
          class="border border-slate-300 text-left px-4 py-3 bg-gray-100 w-2/12"
        >
          Created Date
        </th>
        <th class="border border-slate-300 px-4 py-3 bg-gray-100 w-2/12">Action</th>
      </thead>
      <tbody v-if="userData.length">
        <tr v-for="item in userData" :key="item.id">
          <td class="border border-slate-300 px-4 py-3 break-all">{{ item.id }}</td>
          <td class="border border-slate-300 px-4 py-3 break-all">{{ item.userName }}</td>
          <td class="border border-slate-300 px-4 py-3 break-all">{{ item.emailId }}</td>
          <td class="border border-slate-300 px-4 py-3 break-all">{{ item.phoneNo }}</td>
          <td class="border border-slate-300 px-4 py-3">{{ item.createddate }}</td>
          <td class="border border-slate-300 px-4 py-3 text-center">
            <button
              class="px-2 py-1 bg-gray-400 text-white rounded-md"
              @click="handleSeeDetailsClick(item)"
            >
              See details
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <SingleUserInfo
      v-if="showSingleUserInfo"
      :user-data="selectedUserData"
      @close-modal="closeUserSelectedDetailsModal"
    />
  </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import { useUserStore } from '../stores/user'
import SingleUserInfo from './SingleUserInfo.vue'

const userStore = useUserStore()
const userData = ref(userStore.getUserDetails)

const showSingleUserInfo = ref(false)
const selectedUserData = ref({})

watch(
  () => userStore.getUserDetails,
  (newValue) => {
    userData.value = newValue
  }
)

const handleSeeDetailsClick = (item) => {
  selectedUserData.value = item
  showSingleUserInfo.value = true
}

const closeUserSelectedDetailsModal = () => {
  showSingleUserInfo.value = false
}

</script>
