<template>
  <nav>
    <ul>
      <li><router-link to="/users">Users</router-link></li>
      <li><router-link to="/roles">Roles</router-link></li>
      <li class="user-info" style="color: white;">{{ authStore.user?.full_name }}</li>
      <button @click="logout">Logout</button>
    </ul>
  </nav>
  
</template>
  
<script lang="ts" setup>
import { useRouter } from 'vue-router';
import AuthService from '../services/AuthService';
import { useAuthStore } from '../stores/auth';
const authStore = useAuthStore();
// console.log(authStore.user);
const router = useRouter();

const logout = async () => {
  try {
    await AuthService.logout();  // Call logout from AuthService
    router.push('/');  // Redirect to the login page
  } catch (error) {
    console.error("Error logging out:", error);
  }
};
</script>

<style scoped>
  nav {
    background-color: #333;
    padding: 10px;
  }

  ul {
    display: flex;
    justify-content: space-between; /* Space between items */
    list-style: none;
    gap: 20px;
  }

  li {
    font-size: 18px;
  }

  a {
    color: white;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  button {
    background-color: rgb(142, 62, 62)(15, 13, 13);
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
  }

  button:hover {
    background-color: darkred;
  }

  /* Optional styling for the user info */
  .user-info {
    margin-left: auto; /* Push the user info to the right */
  }

</style>

  