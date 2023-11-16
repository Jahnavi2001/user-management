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
        />
        <button
          class="bg-gray-500 rounded-tr-md rounded-br-md px-5 py-[0.8rem] text-white w-1/4 lg:w-2/12"
        >
          Search
        </button>
      </div>
    </div>

    <div class="mt-10 overflow-x-scroll">
      <table class="rounded-lg w-[250%] lg:w-full table-fixed border-collapse border border-slate-400">
        <thead>
          <th
            class="rounded-lg border border-slate-300 text-left px-4 py-3 bg-gray-100 w-2/12"
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
          <th class="border border-slate-300 text-left px-4 py-3 bg-gray-100 w-2/12">Action</th>
        </thead>
        <tbody>
          <tr v-for="data in 5" :key="data">
            <td class="border border-slate-300 px-4 py-3">12345</td>
            <td class="border border-slate-300 px-4 py-3 break-all">Jahnavi Vuyyuru</td>
            <td class="border border-slate-300 px-4 py-3 break-all">jahnavi@gmail.com</td>
            <td class="border border-slate-300 px-4 py-3 break-all">983295783</td>
            <td class="border border-slate-300 px-4 py-3 text-gray-900 font-semibold">
              See details
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
import { reactive } from 'vue'

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

const handleOnSearchByChange = (e) => {
  const { name, value } = JSON.parse(e.target.value)
  searchBy.name = name
  searchBy.value = value
}
</script>
