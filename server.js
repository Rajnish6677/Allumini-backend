const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Aluminai',)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Define schemas and models
const AdminSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Pass: { type: String, required: true }
});

const Admin = mongoose.model('Admin', AdminSchema);

const AlumniSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Pass: { type: String, required: true },
  Phone: { type: Number, required: true },
  RollNo: { type: Number, required: true },
  Year: { type: String, required: true },
  Branch: { type: String, required: true }
});

const Alumni = mongoose.model('Alumni', AlumniSchema);

// Routes
app.post('/register/admin', async (req, res) => {
  const { Name, Email, Pass } = req.body;
  try {
    const admin = new Admin({ Name, Email, Pass });
    await admin.save();
    res.status(201).json(admin);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.post('/register/alumni', async (req, res) => {
  const { Name, Email, Pass, Phone, RollNo, Year, Branch } = req.body;
  try {
    const alumni = new Alumni({ Name, Email, Pass, Phone, RollNo, Year, Branch });
    await alumni.save();
    res.status(201).json(alumni);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.get('/admins', async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/alumni', async (req, res) => {
  try {
    const alumni = await Alumni.find();
    res.json(alumni);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
