<template>
  <div>
    login
    <el-button type="primary" @click="handleClickIncrement">累加</el-button>
    <router-link to="/">去首页</router-link>
  </div>
</template>
<script setup lang="ts">
import { useStore } from 'vuex'
const store = useStore()
function handleClickIncrement() {
  store.commit('increment')
}

</script>