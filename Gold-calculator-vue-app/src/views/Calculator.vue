<template>
  <div class="page-container">
    <h1 class="page-title">Gold Calculator</h1>
    <div class="container">
      <div class="wrapper">
        <!-- BOX 1 : CALCULATOR -->
        <div class="card">
          <h2 class="title">Calculator</h2>

          <select v-model="karat">
            <option disabled value="">Select Karat</option>
            <option>24K</option>
            <option>22K</option>
            <option>18K</option>
            <option>14K</option>
          </select>

          <select v-model="type">
            <option disabled value="">Gold Type</option>
            <option>Yellow Gold</option>
            <option>White Gold</option>
            <option>Rose Gold</option>
          </select>

          <input v-model.number="rate" type="number" placeholder="Gold Rate" />
          <input v-model.number="grams" type="number" placeholder="Grams" />
          <input v-model.number="making" type="number" placeholder="Making Charge" />

          <button @click="calc">Calculate</button>
          <button class="logout" @click="logout">Logout</button>
        </div>

        <!-- BOX 2 : INFO + RESULT -->
        <div class="card info">
          <h2 class="title">Instructions</h2>
          <ul>
            <li>Select Karat and Gold Type</li>
            <li>Enter gold rate</li>
            <li>Enter grams</li>
            <li>Add making charge</li>
            <li>Press Calculate</li>
          </ul>

          <div class="divider"></div>

          <div v-if="final !== null" class="result">
            <h3>Total Computation</h3>
            <p>Karat: {{ karat }}</p>
            <p>Type: {{ type }}</p>
            <p>Gold Rate: ₱{{ rate.toFixed(2) }}</p>
            <p>Grams: {{ grams }}</p>
            <p>Making Charge: ₱{{ making.toFixed(2) }}</p>
            <p>Subtotal: ₱{{ subtotal.toFixed(2) }}</p>
            <p>Tax (12%): ₱{{ tax.toFixed(2) }}</p>
            <p class="price">Final Price: ₱{{ final.toFixed(2) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from '../services/api'

export default {
  data() {
    return {
      karat: '',
      type: '',
      rate: null,
      grams: null,
      making: null,
      final: null,
      subtotal: 0,
      tax: 0,
    }
  },
  methods: {
    async calc() {
      // Validate inputs
      if (!this.karat || !this.type || !this.rate || !this.grams || !this.making) {
        alert('Please fill all fields')
        return
      }

      const res = await api.calculate({
        rate: this.rate,
        grams: this.grams,
        making: this.making,
        karat: this.karat,
        type: this.type,
      })

      console.log('Response:', res)

      // Calculate breakdown
      this.subtotal = this.rate * this.grams + this.making
      this.tax = this.subtotal * 0.12
      this.final = res.final
    },
    logout() {
      this.$router.push('/')
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

.page-container {
  min-height: 100vh;
  width: 100vw;
  background: radial-gradient(circle, #1a1a1a, #000);
  padding: 30px 20px 20px;
  overflow-x: hidden;
}

.page-title {
  font-family: 'Playfair Display', serif;
  color: silver;
  font-size: 48px;
  text-align: center;
  margin-bottom: 30px;
  text-shadow: 0 0 20px rgba(192, 192, 192, 0.3);
}

.container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  width: 100%;
  max-width: 950px;
}

.card {
  background: #111;
  border: 1px solid silver;
  border-radius: 22px;
  padding: 30px;
  color: silver;
  box-shadow: 0 0 25px rgba(192, 192, 192, 0.25);
}

.title {
  margin-bottom: 20px;
  margin-top: 0;
  font-family: 'Playfair Display', serif;
}

input,
select {
  width: 100%;
  margin-bottom: 15px;
  padding: 14px;
  background: black;
  border: 1px solid silver;
  color: white;
  border-radius: 10px;
  font-size: 14px;
  font-family: inherit;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='silver' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 20px;
  padding-right: 40px;
}

select {
  cursor: pointer;
}

input:focus,
select:focus {
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
  margin-top: 5px;
  cursor: pointer;
  border: none;
  font-size: 14px;
}

button:hover {
  background: white;
}

.logout {
  background: #333;
  color: silver;
  border: 1px solid silver;
}

.logout:hover {
  background: #444;
}

.info ul {
  padding-left: 20px;
  line-height: 1.8;
  margin-bottom: 0;
}

.info li {
  margin-bottom: 8px;
}

.divider {
  width: 80%;
  height: 1px;
  background: silver;
  margin: 25px auto;
}

.result {
  padding-top: 10px;
}

.result h3 {
  margin-top: 0;
  margin-bottom: 15px;
  text-align: center;
}

.result p {
  margin: 8px 0;
  font-size: 15px;
}

.price {
  font-size: 24px;
  font-weight: bold;
  color: white;
  margin-top: 15px;
  text-align: center;
  padding-top: 10px;
  border-top: 2px solid silver;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 36px;
  }

  .wrapper {
    grid-template-columns: 1fr;
  }
}
</style>
