const express = require('express');
const { createTask, getAllTasks, getTaskById, updateTask, deleteTask } = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createTask); // Create Task
router.get('/', authMiddleware, getAllTasks); // Get all Tasks
router.get('/:id', authMiddleware, getTaskById); // Get Task by ID
router.put('/:id', authMiddleware, updateTask); // Update Task
router.delete('/:id', authMiddleware, deleteTask); // Delete Task

module.exports = router;
