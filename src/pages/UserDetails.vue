<template>
  <div>
    <UserHeader />
    <div class="mx-24 my-10">
      <div class="bg-gray-100 rounded-xl p-4 flex gap-6">
        <RouterLink
          to="/"
          class="px-3 py-1"
          :class="currentRoutePath === '/' && 'bg-gray-500 rounded-xl text-white'"
        >
          Users List
        </RouterLink>
        <RouterLink
          to="/create-user"
          class="px-3 py-1"
          :class="currentRoutePath === '/create-user' && 'bg-gray-500 rounded-xl text-white'"
        >
          Create User
        </RouterLink>
      </div>
      <div class="my-10">
        <RouterView />
      </div>
      
    </div>
  </div>
</template>
<script setup>
import UserHeader from '../components/UserHeader.vue';
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { onMounted, ref, watch } from 'vue'
const route = useRoute()
const currentRoutePath = ref('')
watch(
  () => route.path,
  (newPath) => {
    currentRoutePath.value = newPath
  }
)

onMounted(() => {
  currentRoutePath.value = route.path
})
</script>
