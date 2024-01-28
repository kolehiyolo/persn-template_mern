const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  start: {
    type: Date,
    // required: true,
  },
  due: {
    type: Date,
    required: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming a reference to the User model
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project', // Assuming a reference to the User model
    required: true,
    trim: true,
  },
  priority: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;