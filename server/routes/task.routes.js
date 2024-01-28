const router = require('express').Router();
const Task = require('../models/task.model.js');

// * Get all Tasks
// GET http://localhost:5000/tasks/
router.route('/').get(
  (req, res) => {
    console.log('GET /tasks/');

    Task.find()
    .then(users => {
      console.log(` - Success! ${tasks.length} tasks found`);
      console.log(`\n`);
      res.json(users);
    })
    .catch(err => {
      console.log(` - Failure! Didn't find all Tasks`);
      console.log(`\n`);
      res.status(400).json(`Error: ${err}`);
    });
  }
);

// * Get one Task by ID
// GET http://localhost:5000/tasks/:id
router.route('/:id').get(
  (req,res) => {
    console.log('GET /tasks/'+req.params.id);
  
    Task.findById(req.params.id)
      .then(task => {
        console.log(` - Success! Task "${task.name}" found`);
        console.log(`\n`);
        res.json(task);
      })
      .catch(err => {
        console.log(` - Failure! Didn't find Task by ID`);
        console.log(`\n`);
        res.status(400).json(`Error: ${err}`);
      });
  }
);

// * Add one new Task
// POST http://localhost:5000/tasks/add
router.route('/add').post(
  (req, res) => {
    console.log('POST /tasks/add'); 

    // -* Sample accepted req.body data:
    const sample = {
      name: 'Task 1',
      start: '2000-01-01',
      due: '2000-01-31',
      done: false,
      owner: 'userID-1',
      project: 'projectID-1',
      priority: 'High',
      description: ''
    };

    const name = req.body.name;
    // const start = Date.parse(req.body.start);
    // const due = Date.parse(req.body.due);
    const start = req.body.start;
    const due = req.body.due;
    const done = req.body.done;
    const owner = req.body.owner;
    const project = req.body.project;
    const priority = req.body.priority;
    const description = req.body.description;

    const newTask = new Task(
      {
        name,
        start,
        due,
        done,
        owner,
        project,
        priority,
        description
      }
    );

    console.log(` - newTask: `)
    console.log(newTask);
    console.log(`\n`);

    newTask.save()
      .then(task => {
        console.log(` - Success! Task added`);
        console.log(`\n`);
        res.json({ _id: task._id });
      })
      // .catch(err => {
      //   console.log(` - Failure! Didn't add Task`);
      //   console.log(`\n`);
      //   res.status(400).json(`Error: ${err}`);
      // });
  }
);

// * Delete one Task by ID
// DELETE http://localhost:5000/tasks/:id
router.route('/:id').delete(
  (req,res) => {
    console.log('DELETE /tasks/' + req.params.id);

    Task.findByIdAndDelete(req.params.id)
      .then(task => {
        console.log(` - Success! Task '${task.name}' deleted`);
        console.log(`\n`);
        res.json(`Success! Task '${task.name}' deleted`);
      })
      .catch(err => {
        console.log(` - Failure! Didn't delete Task`);
        console.log(`\n`);
        res.status(400).json(`Error: ${err}`);
      });
  }
);

// * Update one Task by ID
// POST http://localhost:5000/tasks/update/:id
router.route('/update/:id').post(
  (req, res) => {
    console.log('POST /tasks/update/' + req.params.id);

    // -* Sample accepted req.body data:
    const sample = {
      name: 'Task 1',
      start: '2000-01-01',
      due: '2000-01-31',
      done: false,
      owner: 'userID-1',
      project: 'projectID-1',
      priority: 'High',
      description: ''
    };

    Task.findById(req.params.id)
    .then(
      task => {
        console.log(` - Task "${task.name}" Found! `);

        task.name = req.body.name;
        // task.start = Date.parse(req.body.start);
        task.start = req.body.start;
        // task.due = Date.parse(req.body.due);
        task.due = req.body.due;
        task.done = req.body.done;
        task.owner = req.body.owner;
        task.project = req.body.project;
        task.priority = req.body.priority;
        task.description = req.body.description;

        console.log(` - updatedTask: `)
        console.log(task);
        console.log(`\n`);
        
        task.save()
          .then(() => {
            console.log(` - Success! Task updated`);
            console.log(`\n`);
            res.json(`Success! Task updated`);
          })
          .catch(err => {
            console.log(` - Failure! Didn't update Task`);
            console.log(`\n`);
            res.status(400).json(`Error: ${err}`);
          });
      }
    )
    .catch(err => {
      console.log(` - Failure! Didn't update Task since can't find Task by ID`);
      console.log(`\n`);
      res.status(400).json(`Error: ${err}`);
    });
  }
);

// * Update one Task's done value by ID
// POST http://localhost:5000/tasks/check/:id
router.route('/check/:id').post(
  (req, res) => {
    console.log('POST /tasks/check/'+ req.params.id);
    const done = req.body.done;

    // -* Sample accepted req.body data:
    const sample = {
      done: false
    };

    Task.findByIdAndUpdate(req.params.id, { done: done }, { new: true })
      .then(
        updatedTask => {
          console.log(` - Task ${updatedTask.name} Found! `);

          console.log(` - Success! Task's done value updated to ${done}`);
          console.log(`\n`);
          res.json(`Success! Task's done value updated`);
        }
      )
      .catch(err => {
        console.log(` - Failure! Didn't update Task's done value`);
        console.log(`\n`);
        res.status(400).json(`Error: ${err}`);
      });
  }
);

module.exports = router;