const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mock student data (for simplicity; in a real app, this would be from a database)
let students = [
    { id: 1, name: 'John Doe', age: 20 },
    { id: 2, name: 'Jane Smith', age: 22 }
];

// Routes
app.get('/students', (req, res) => {
    res.json(students);
});

app.get('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const student = students.find(student => student.id === studentId);
    if (!student) {
        res.status(404).send('Student not found');
    } else {
        res.json(student);
    }
});

app.post('/students', (req, res) => {
    const { name, age } = req.body;
    const id = students.length + 1; // In a real app, use a unique ID generation method
    const newStudent = { id, name, age };
    students.push(newStudent);
    res.status(201).json(newStudent);
});

app.put('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const { name, age } = req.body;
    const index = students.findIndex(student => student.id === studentId);
    if (index === -1) {
        res.status(404).send('Student not found');
    } else {
        students[index] = { id: studentId, name, age };
        res.json(students[index]);
    }
});

app.delete('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    students = students.filter(student => student.id !== studentId);
    res.status(204).send();
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
