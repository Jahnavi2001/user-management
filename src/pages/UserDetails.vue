<template>
  <div>
    <UserHeader/>
    User Detail Page
   <RouterView/>
  </div>
</template>
<script setup>
import UserHeader from '../components/UserHeader.vue';
</script>