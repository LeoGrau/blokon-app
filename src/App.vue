<template>
  <PrimeDynamicDialog></PrimeDynamicDialog>
  <BlokonNavbar></BlokonNavbar>
  <div class="p-5">
    <router-view></router-view>
  </div>
</template>
<script setup lang="ts">
import BlokonNavbar from './components/BlokonNavbar.vue'
</script>
<style></style>
