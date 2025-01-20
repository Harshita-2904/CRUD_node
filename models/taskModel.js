const mongoose = require('mongoose'); // Import mongoose to interact with MongoDB

// Define the task schema structure
const taskSchema = new mongoose.Schema({
    // Title of the task (required field)
    title: { type: String, required: true },

    // Description of the task (optional field)
    description: { type: String },

    // Completed status of the task (default is false)
    completed: { type: Boolean, default: false },

    // Due date for the task (optional field)
    dueDate: { type: Date },

    // Priority level of the task (can be 'low', 'medium', or 'high')
    priority: { type: String, enum: ['low', 'medium', 'high'] },

    // Tags associated with the task (optional field, can be an array of strings)
    tags: { type: [String] },

    // Reference to the user who owns the task (required field, should be an ObjectId from the 'User' model)
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

// Export the model for 'Task' using the schema defined above
module.exports = mongoose.model('Task', taskSchema);
