<script setup>
// import { useRouter } from 'vue-router'
// import { useUserStore } from '@/stores'
// const router = useRouter()

// const goList = () => {
//   router.push('/list')
// }

// const userStore = useUserStore()
//
</script>

<template>
  <div>
    <header>
      <nav class="top-nav">
        <div class="left-nav">
          <div class="logo">
            <img src="logo.png" alt="Logo" />
          </div>
          <ul class="nav-links">
            <li><router-link to="/Gadget/Home">Home</router-link></li>
            <li><router-link to="/Gadget/Market">Market</router-link></li>
            <li><router-link to="/Gadget/Ranking">Ranking</router-link></li>
          </ul>
        </div>
        <div class="login-register">
          <router-link to="/Login">Login/Register</router-link>
        </div>
      </nav>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <!-- Add banner content here -->
    </footer>
  </div>
</template>

<style scoped>
.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
}

.left-nav {
  display: flex;
  align-items: center;
}

.logo img {
  width: 100px; /* Adjust the logo width as needed */
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 20px;
  margin-left: 20px; /* Add some margin to separate links from the logo */
}

.nav-links li {
  font-size: 18px;
}

.nav-links li a {
  color: #fff;
  text-decoration: none;
}

.login-register {
  font-size: 18px;
}

.login-register a {
  color: #fff;
  text-decoration: none;
}

main {
  /* Add styling for your main content area here */
}

footer {
  /* Add styling for your banner here */
}
</style>
