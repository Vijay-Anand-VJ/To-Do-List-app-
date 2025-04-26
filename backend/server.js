const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Task = require('./models/Task');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/todolist', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

app.post('/tasks', async (req, res) => {
    const task = new Task({ text: req.body.text, completed: false });
    await task.save();
    res.json(task);
});

app.put('/tasks/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    task.text = req.body.text || task.text;
    task.completed = req.body.completed !== undefined ? req.body.completed : task.completed;
    await task.save();
    res.json(task);
});

app.delete('/tasks/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
