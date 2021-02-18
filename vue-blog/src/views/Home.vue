<template>
  <div class="home">
    <input v-model="username" />
    <input v-model="password" />
    <button @click="submit">登陆</button>
  </div>
</template>

<script>
import { login } from "@/api/blog";
export default {
  data() {
    return {
      username: "zhangsan",
      password: "123"
    };
  },
  methods: {
    submit() {
      console.log("password:", this.password);
      console.log("username:", this.username);
      login({
        username: this.username,
        password: this.password
      }).then(data => {
        console.log(data);
      });
    }
  }
};
</script>
