<template>
  <div class="lg:mx-20">
    <div class="flex flex-col lg:flex-row gap-6 justify-center">
      <select class="border border-black rounded-md px-2 py-1" @change="handleOnSearchByChange">
        <option :value="JSON.stringify(item)" v-for="item in SEARCH_BY_LIST" :key="item.value">
          {{ item.name }}
        </option>
      </select>
      <div class="w-full lg:w-6/12 flex">
        <input
          type="text"
          class="border border-black px-4 py-3 rounded-tl-md rounded-bl-md w-3/4 lg:w-10/12"
          :placeholder="`Search ${searchBy.name}`"
          v-model="searchText"
          @keyup.enter="handleOnSearchClick"
        />
        <button
          class="bg-gray-500 rounded-tr-md rounded-br-md px-5 py-[0.8rem] text-white w-1/4 lg:w-2/12"
          @click="handleOnSearchClick"
        >
          Search
        </button>
      </div>
    </div>

    <div class="mt-16 overflow-x-scroll">
      <div class="mb-2 text-lg font-semibold">Users List</div>

      <div v-if="isLoader" class="flex flex-col gap-6">
        <ShimmerLoader height="10" />
        <ShimmerLoader height="96" />
      </div>
      <table
        v-else
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
      <div v-if="!userData.length" class="w-full py-10 flex flex-col items-center gap-4">
        <div>
          <img
            src="https://cdn-0.emojis.wiki/emoji-pics/whatsapp/man-shrugging-whatsapp.png"
            alt="no-search-results"
          />
        </div>
        <div class="font-semibold text-lg">No Search Results Found...</div>
      </div>
    </div>

    <fwb-pagination
      v-if="totalRecords > 10"
      v-model="currentPage"
      :total-items="totalRecords"
      :per-page="10"
      previous-label="<<"
      next-label=">>"
      @page-changed="handleOnPageChange"
    ></fwb-pagination>

    <SelectedUserDetails
      v-if="showUserSelectedDetails"
      :open-modal="showUserSelectedDetails"
      :user-data="selectedUserData"
      @close-modal="closeUserSelectedDetailsModal"
    />
  </div>
</template>
<script setup>
import { FwbPagination } from 'flowbite-vue'
import { onMounted, reactive, ref } from 'vue'
import { formatDDMMMYYYFromISOString } from '../utils/date'
import SelectedUserDetails from './SelectedUserDetails.vue'
import ShimmerLoader from './ShimmerLoader.vue'

const SEARCH_BY_LIST = [
  {
    name: 'User name',
    value: 'userName'
  },
  {
    name: 'Email',
    value: 'email'
  },
  {
    name: 'Phone number',
    value: 'phoneNumber'
  }
]

const searchBy = reactive({
  name: 'User name',
  value: 'userName'
})

const searchText = ref('')
const userData = ref([])
const isLoader = ref(false)
const showUserSelectedDetails = ref(false)
const selectedUserData = ref({})
const currentPage = ref(1)
const totalRecords = ref(0)

const handleOnSearchByChange = (e) => {
  const { name, value } = JSON.parse(e.target.value)
  searchBy.name = name
  searchBy.value = value
  searchText.value = ''
  fetchUsersList()
}

const handleOnSearchClick = () => {
  if (searchText.value.length < 3) return
  fetchUsersList()
}

onMounted(() => {
  fetchUsersList()
})

const fetchUsersList = async () => {
  isLoader.value = true
  try {
    const data = await fetch(
      `http://10.20.2.119:8099/user/get-user-details?searchBy=${searchBy.value}&searchText=${
        searchText.value
      }&page=${currentPage.value - 1}&size=10`
    )
    const json = await data.json()
    userData.value = json.usersList.map((item) => {
      return {
        ...item,
        createddate : formatDDMMMYYYFromISOString(item.createddate)
      }
    })

    totalRecords.value = json.totalUsersCount
    isLoader.value = false
  } catch (error) {
    isLoader.value = false
  }
}

const handleSeeDetailsClick = (item) => {
  selectedUserData.value = item
  showUserSelectedDetails.value = true
}

const closeUserSelectedDetailsModal = () => {
  showUserSelectedDetails.value = false
}

const handleOnPageChange = (page) => {
  currentPage.value = page
  fetchUsersList()
}
</script>
