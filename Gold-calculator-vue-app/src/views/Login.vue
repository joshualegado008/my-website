<template>
  <div class="container">
    <h1 class="page-title">Gold Calculator</h1>
    <div class="card">
      <h2 class="title">{{ isLogin ? 'Login' : 'Register' }}</h2>

      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />

      <!-- Additional fields for registration -->
      <template v-if="!isLogin">
        <input v-model="gmail" type="email" placeholder="Gmail Address" />
        <input v-model="phoneNumber" type="tel" placeholder="Phone Number" />
      </template>

      <button @click="submit">{{ isLogin ? 'Login' : 'Register' }}</button>

      <p class="switch" @click="isLogin = !isLogin">
        {{ isLogin ? 'No account? Register' : 'Have account? Login' }}
      </p>
    </div>
  </div>
</template>

<script>
import User from '../models/User'
import { api } from '../services/api'

export default {
  data() {
    return {
      email: '',
      password: '',
      gmail: '',
      phoneNumber: '',
      isLogin: true,
    }
  },
  methods: {
    async submit() {
      if (this.isLogin) {
        const res = await api.login(this.email, this.password)
        if (res.success) this.$router.push('/calculator')
        else alert('Invalid credentials')
      } else {
        // Validate registration fields
        if (!this.email || !this.password || !this.gmail || !this.phoneNumber) {
          alert('Please fill all fields')
          return
        }

        const user = new User(this.email, this.password, this.gmail, this.phoneNumber)
        const res = await api.register(user)
        if (res.success) {
          alert('Registered successfully!')
          // Clear registration fields
          this.gmail = ''
          this.phoneNumber = ''
          this.isLogin = true
        } else {
          alert(res.message)
        }
      }
    },
  },
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle, #1a1a1a, #000);
  padding: 20px;
  overflow-x: hidden;
}

.page-title {
  font-family: 'Playfair Display', serif;
  color: silver;
  font-size: 48px;
  margin-bottom: 30px;
  text-align: center;
  text-shadow: 0 0 20px rgba(192, 192, 192, 0.3);
}

.card {
  background: #111;
  border: 1px solid silver;
  border-radius: 22px;
  padding: 40px;
  width: 95%;
  max-width: 420px;
  color: silver;
  box-shadow: 0 0 25px rgba(192, 192, 192, 0.25);
}

.title {
  margin-bottom: 20px;
  margin-top: 0;
  font-family: 'Playfair Display', serif;
  text-align: center;
}

input {
  width: 100%;
  margin-bottom: 18px;
  padding: 14px;
  background: black;
  border: 1px solid silver;
  color: white;
  border-radius: 10px;
  font-size: 14px;
}

input:focus {
  outline: none;
  border-color: white;
}

input::placeholder {
  color: #888;
}

button {
  width: 100%;
  padding: 14px;
  background: silver;
  color: black;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
  border: none;
  font-size: 14px;
}

button:hover {
  background: white;
}

.switch {
  text-align: center;
  cursor: pointer;
  margin-top: 15px;
  margin-bottom: 0;
}

.switch:hover {
  color: white;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 36px;
  }
}
</style>
