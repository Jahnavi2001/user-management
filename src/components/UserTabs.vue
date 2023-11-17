<template>
  <div class="mx-4 lg:mx-24 mb-20 mt-36">
    <div class="bg-gray-100 rounded-xl p-4 flex gap-6">
      <RouterLink
          to="/"
          class="px-3 py-1"
          :class="currentRoutePath === '/' && 'bg-gray-500 rounded-xl text-white'"
        >
          Users Details
        </RouterLink>
        <RouterLink
          to="/create-user-account"
          class="px-3 py-1"
          :class="currentRoutePath === '/create-user-account' && 'bg-gray-500 rounded-xl text-white'"
        >
          Create User Account
        </RouterLink>

    </div>
    <div class="my-10">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { ref, onMounted, watch } from 'vue'

const route = useRoute()
const currentRoutePath = ref('')

const updateCurrentRoute = () => {
  currentRoutePath.value = route.path
}

watch(() => route.path, updateCurrentRoute)

onMounted(updateCurrentRoute)
</script>
