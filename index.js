
const express = require('express');

const app = express();
app.use(express.json()); // Middleware to parse JSON

const port = 3000;

// In-memory student storage (Replace with a database in real applications)
let students = [];

// Register Student (POST)
app.post('/register', (req, res) => {
    const { sid, sname, semail, spass } = req.body;

    if (!sid || !sname || !semail || !spass) {
        return res.status(400).json({ error: 'All fields are required (sid, sname, semail, spass)' });
    }

    students.push({ sid, sname, semail, spass });
    res.status(201).json({ message: 'Student registered successfully' });
});

// Student Login (POST) - Uses Student ID and Password
app.post('/login', (req, res) => {
    const { sid, spass } = req.body;

    if (!sid || !spass) {
        return res.status(400).json({ error: 'Student ID and Password are required' });
    }

    const student = students.find(s => s.sid === sid && s.spass === spass);

    if (student) {
        res.json({ message: 'Login successful' });
    } else {
        res.status(401).json({ error: 'Invalid Student ID or Password' });
    }
});

// Search Student by ID (GET)
app.get('/search', (req, res) => {
    const { sid } = req.query;

    if (!sid) {
        return res.status(400).json({ error: 'Student ID is required' });
    }

    const student = students.find(s => s.sid === sid);

    if (student) {
        res.json({ sid: student.sid, sname: student.sname, semail: student.semail });
    } else {
        res.status(404).json({ error: 'Student not found' });
    }
});

// Update Student Profile (PUT)
app.put('/update-profile', (req, res) => {
    const { sid, sname, semail, spass } = req.body;

    if (!sid) {
        return res.status(400).json({ error: 'Student ID is required' });
    }

    const student = students.find(s => s.sid === sid);

    if (student) {
        if (sname) student.sname = sname;
        if (semail) student.semail = semail;
        if (spass) student.spass = spass;

        res.json({ message: 'Profile updated successfully' });
    } else {
        res.status(404).json({ error: 'Student not found' });
    }
});

// Delete User (DELETE)
app.delete('/delete-student', (req, res) => {
  const { sname } = req.body;

  if (!sname) {
      return res.status(400).json({ error: 'Student name is required' });
  }

  const initialLength = students.length;
  students = students.filter(s => s.sname !== sname);

  if (students.length < initialLength) {
      res.json({ message: 'Student deleted successfully' });
  } else {
      res.status(404).json({ error: 'Student not found' });
  }
});


// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
