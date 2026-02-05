const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let users = []; 

// REGISTER
app.post("/api/register", (req, res) => {
  const { email, password, gmail, phoneNumber } = req.body;
  const exists = users.find((u) => u.email === email);

  if (exists) {
    return res.json({ success: false, message: "User already exists" });
  }

  users.push({ email, password, gmail, phoneNumber });
  console.log("New user registered:", { email, gmail, phoneNumber });
  res.json({ success: true });
});

// LOGIN
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.json({ success: false });
  }

  res.json({ success: true });
});

// GOLD CALCULATOR
app.post("/api/calc", (req, res) => {
  const { rate, grams, making } = req.body;

  const subtotal = rate * grams + making;
  const final = subtotal + subtotal * 0.12;

  res.json({ final });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
