// * Core Dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// * Fetching dotenv Data
require('dotenv').config();
const PORT = process.env.PORT || 5000;

// * Initializing Passport.js
const passport = require('passport');
const session = require('express-session');
require('./config/passport')(passport);

// * Initializing Express
const app = express();
app.use(cors());
app.use(express.json());
app.use(session({
  secret: 'your session secret',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
// app.use(express.urlencoded({ extended: true }));

// * MongoDB Connection
const uri = 'mongodb://0.0.0.0:27017/connect_co';
mongoose.connect(uri, {
  useNewUrlParser: true,
  // useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once('open', 
  () => {
    console.log(`MongoDB database connection established successfully`); 
  }
);

// * Routes
const projectRoutes = require('./routes/project.routes');
const taskRoutes = require('./routes/task.routes');
const userRoutes = require('./routes/user.routes');

app.use('/projects', projectRoutes);
app.use('/tasks', taskRoutes);
app.use('/users', userRoutes);

// * Start Server
app.listen(PORT, () => {
  console.clear();
  console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
  console.log(`\n`);
});

