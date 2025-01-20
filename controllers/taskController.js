const Task = require('../models/taskModel'); // Import the Task model

// Create a new task
const createTask = async (req, res) => {
    try {
        // Create a new Task instance, using the data from the request body and attaching the user ID from the JWT
        const task = new Task({ ...req.body, owner: req.user._id });

        // Save the task to the database
        await task.save();

        // Send a response with the created task and a status code of 201 (created)
        res.status(201).json(task);
    } catch (error) {
        // If an error occurs, send a 400 status code with the error message
        res.status(400).json({ error: error.message });
    }
};

// Get all tasks of the authenticated user
const getAllTasks = async (req, res) => {
    try {
        // Find all tasks belonging to the authenticated user (using req.user._id)
        const tasks = await Task.find({ owner: req.user._id });

        // Send the tasks in the response as a JSON array
        res.json(tasks);
    } catch (error) {
        // If an error occurs, send a 500 status code with the error message
        res.status(500).json({ error: error.message });
    }
};

// Get a specific task by its ID
const getTaskById = async (req, res) => {
    try {
        // Find the task by ID and ensure it's owned by the authenticated user
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });

        // If the task is not found, send a 404 status code with a not found message
        if (!task) return res.status(404).json({ error: 'Task not found' });

        // Send the task in the response
        res.json(task);
    } catch (error) {
        // If an error occurs, send a 500 status code with the error message
        res.status(500).json({ error: error.message });
    }
};

// Update an existing task by its ID
const updateTask = async (req, res) => {
    try {
        // Find the task by its ID and owner, then update it with the data from the request body
        const task = await Task.findOneAndUpdate({ _id: req.params.id, owner: req.user._id }, req.body, { new: true });

        // Send the updated task in the response
        res.json(task);
    } catch (error) {
        // If an error occurs, send a 500 status code with the error message
        res.status(500).json({ error: error.message });
    }
};

// Delete a task by its ID
const deleteTask = async (req, res) => {
    try {
        // Find the task by its ID and owner, then delete it
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });

        // If the task is not found, send a 404 status code with a not found message
        if (!task) return res.status(404).json({ error: 'Task not found' });

        // Send a success message after deleting the task
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        // If an error occurs, send a 500 status code with the error message
        res.status(500).json({ error: error.message });
    }
};

// Export the functions so they can be used in other parts of the app
module.exports = { createTask, getAllTasks, getTaskById, updateTask, deleteTask };
