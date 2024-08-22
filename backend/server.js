require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// DB Cnx
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'karriery_timesheet'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database.');
});

// Signup
app.post('/signup', async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  
  if (!firstname) return res.status(400).json({ code: 'MISSING_FIELD', message: 'First name is required' });
  if (!lastname) return res.status(400).json({ code: 'MISSING_FIELD', message: 'Last name is required' });
  if (!email) return res.status(400).json({ code: 'MISSING_FIELD', message: 'Email is required' });
  if (!password) return res.status(400).json({ code: 'MISSING_FIELD', message: 'Password is required' });

  // mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ code: 'INVALID_EMAIL', message: 'Invalid email address' });
  }

  //pass
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({ code: 'WEAK_PASSWORD', message: 'Password must be at least 8 characters long, contain at least one special character, and one uppercase letter' });
  }

  // email ? 
  const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkEmailQuery, [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ code: 'DB_ERROR', message: 'Database query error' });
    }
    if (results.length > 0) {
      return res.status(400).json({ code: 'EMAIL_EXISTS', message: 'Email already exists' });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      // User ++
      const query = 'INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)';
      db.query(query, [firstname, lastname, email, hashedPassword], (err, result) => {
        if (err) {
          return res.status(500).json({ code: 'DB_ERROR', message: 'Error registering user' });
        }
        res.status(201).json({ message: 'User registered successfully' });
      });
    } catch (error) {
      res.status(500).json({ code: 'INTERNAL_ERROR', message: 'Internal server error' });
    }
  });
});

// Login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  
  if (!email) return res.status(400).json({ code: 'MISSING_FIELD', message: 'Email is required' });
  if (!password) return res.status(400).json({ code: 'MISSING_FIELD', message: 'Password is required' });

  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ code: 'INVALID_EMAIL', message: 'Invalid email address' });
  }

  //user ? 
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ code: 'DB_ERROR', message: 'Database query error' });
    }
    if (results.length === 0) {
      return res.status(401).json({ code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' });
    }

    const user = results[0];

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' });
    }

    // jwt 
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.status(200).json({ token });
  });
});


const PORT = process.env.PORT || 7050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
