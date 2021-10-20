<template>
  <div>vuex中的count:{{ count }}</div>
</template>
<script setup lang="ts">
import { useStore } from 'vuex'
const store = useStore()
const count = store.state.count
</script>
