<template>
  <div class="md:mx-12">
    <!-- Filters -->
    <div class="flex flex-col items-center md:flex-row lg:flex-row gap-6 justify-center">
      <select class="border border-black rounded-md px-2 py-1" @change="handleOnSearchByChange">
        <option :value="JSON.stringify(item)" v-for="item in SEARCH_BY_LIST" :key="item.value">
          {{ item.name }}
        </option>
      </select>
      <div class="w-full md:5/12 lg:w-6/12 flex">
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
      <div v-if="searchText.length">
        <button class="text-gray-500 hover:text-gray-950" @click="onHandleReset">Reset</button>
      </div>
    </div>

    <!-- Details -->
    <div class="mt-16">
      <div v-if="isLoader" class="flex flex-col gap-6">
        <ShimmerLoader height="10" />
        <ShimmerLoader height="96" />
      </div>
      <div v-else>
        <div class="overflow-x-scroll">
          <UserDetailsTable />
        </div>

        <div v-if="!userData.length" class="w-full py-10 flex flex-col items-center gap-4">
          <div>
            <img
              src="https://cdn-0.emojis.wiki/emoji-pics/whatsapp/man-shrugging-whatsapp.png"
              alt="no-search-results"
              width="220"
              height="200"
            />
          </div>
          <div class="font-semibold text-lg">No Search Results Found...</div>
        </div>
        <div v-else>
          <fwb-pagination
            class="text-right mt-6 mr-4"
            v-if="totalRecords > 10"
            v-model="currentPage"
            :total-items="totalRecords"
            :per-page="10"
            previous-label="<<"
            next-label=">>"
            @page-changed="handleOnPageChange"
          >
          </fwb-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { FwbPagination } from 'flowbite-vue'
import { onMounted, reactive, ref } from 'vue'
import { formatDDMMMYYYFromISOString } from '../utils/date'
import { useUserStore } from '../stores/user'
import ShimmerLoader from './ShimmerLoader.vue'
import UserDetailsTable from './UserDetailsTable.vue'


const SEARCH_BY_LIST = [
  {
    name: 'User name',
    value: 'userName'
  },
  {
    name: 'Email',
    value: 'emailId'
  },
  {
    name: 'Phone number',
    value: 'phoneNo'
  }
]

const userStore = useUserStore()

const searchBy = reactive({
  name: 'User name',
  value: 'userName'
})

const searchText = ref('')
const userData = ref(userStore.getUserDetails)
const isLoader = ref(false)
const currentPage = ref(1)
const totalRecords = ref(0)

onMounted(() => {
  fetchUsersList()
})

const handleOnSearchByChange = (e) => {
  const { name, value } = JSON.parse(e.target.value)
  searchBy.name = name
  searchBy.value = value
  if (searchText.value.length) {
    searchText.value = ''
    fetchUsersList()
  }
}

const handleOnSearchClick = () => {
  currentPage.value = 1
  fetchUsersList()
}

const handleOnPageChange = (page) => {
  currentPage.value = page
  fetchUsersList()
}

const onHandleReset = () => {
  searchText.value = ''
  currentPage.value = 1
  fetchUsersList()
}

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
        createddate: formatDDMMMYYYFromISOString(item.createddate)
      }
    })

    userStore.setUserDetails(userData.value)

    totalRecords.value = json.totalUsersCount
    isLoader.value = false
  } catch (error) {
    isLoader.value = false
  }
}
</script>
