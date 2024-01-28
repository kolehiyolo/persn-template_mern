const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming a reference to the User model
    required: true,
  },
  role: {
    type: String,
    trim: true,
  },
});

const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  priority: {
    type: String,
    trim: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
  start: {
    type: Date,
  },
  due: {
    type: Date,
  },
  members: [memberSchema],
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task', // Assuming a reference to the Task model
  }],
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
