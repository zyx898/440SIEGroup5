<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'
const router = useRouter()

const goList = () => {
  router.push('/list')
}

const userStore = useUserStore()
</script>

<template>
  <hr />
  <router-view></router-view>

  <hr />
  <hr />
  <hr />

  <el-button @click="$router.push('/home')">main</el-button>
  <el-button @click="goList">main</el-button>
  <el-button type="primary">Primary</el-button>
  <el-button type="success">Success</el-button>
  <el-button type="info">Info</el-button>
  <el-button type="warning">Warning</el-button>
  <el-button type="danger">Danger</el-button>

  <p>{{ userStore.token }}</p>
  <el-button @click="userStore.setToken('sdfafsdaf')">login</el-button>
  <el-button @click="userStore.removeToken()">logout</el-button>
</template>

<style scoped></style>
