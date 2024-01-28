const router = require('express').Router();
const Project = require('../models/project.model.js');

// * Get all Projects
// GET http://localhost:5000/projects/
router.route('/').get(
  (req, res) => {
    console.log('GET /projects/');

    Project.find()
      .then(projects => {
        console.log(` - Success! ${projects.length} projects found`);
        console.log(`\n`);
        res.json(projects);
      })
      .catch(err => {
        console.log(` - Failure! Didn't find all Projects`);
        console.log(`\n`);
        res.status(400).json(`Error: ${err}`);
      });
  }
);

// * Get one Project by ID
// GET http://localhost:5000/projects/:id
router.route('/:id').get(
  (req,res) => {
    console.log('GET /projects/' + req.params.id);

    Project.findById(req.params.id)
      .then(project => {
        console.log(` - Success! Project '${project.name}' found`);
        console.log(`\n`);
        res.json(project);
      })
      .catch(err => {
        console.log(` - Failure! Didn't find Project by ID`);
        console.log(`\n`);
        res.status(400).json(`Error: ${err}`);
      });
  }
);

// * Add one new Project
// ! Can't Test with Postman
// POST http://localhost:5000/projects/add
router.route('/add').post(
  (req, res) => {
    console.log('POST /projects/add'); 

    // -* Sample accepted req.body data:
    const sample = {
      name: 'Project Name',
      description: 'This is a project',
      priority: 'High',
      done: false,
      start: "2000-01-01",
      due: "2000-01-31",
      members: [
        {
          id: 'userID-1',
          role: 'Team Leader'
        },
        {
          id: 'userID-2',
          role: 'Developer'
        },
        {
          id: 'userID-3',
          role: 'Artist'
        }
      ],
      tasks: [
        'taskID-1',
        'taskID-2',
        'taskID-3'
      ]
    };

    const name = req.body.name;
    const description = req.body.description;
    const priority = req.body.priority;
    const done = req.body.done;
    const start = Date.parse(req.body.start);
    const due = Date.parse(req.body.due);
    const members = req.body.members;
    const tasks = req.body.tasks;

    const newProject = new Project(
      {
        name,
        description,
        priority,
        done,
        start,
        due,
        members,
        tasks
      }
    );

    console.log(` - newProject: `)
    console.log(newProject);
    console.log(`\n`);

    newProject.save()
      .then((project) => {
        console.log(` - Success! Project added`);
        console.log(`\n`);
        res.json({ _id: project._id });
      })
      .catch(err => {
        console.log(` - Failure! Didn't add user`);
        console.log(`\n`);
        res.status(400).json(`Error: ${err}`);
      });
  }
);

// * Delete one Project by ID
// ! Can't Test with Postman
// DELETE http://localhost:5000/projects/:id
router.route('/:id').delete(
  (req,res) => {
    console.log('DELETE /projects/' + req.params.id);

    Project.findByIdAndDelete(req.params.id)
      .then(project => {
        console.log(` - Success! Project '${project.name}' deleted`);
        console.log(`\n`);
        res.json(`Success! Project '${project.name}' deleted`);
      })
      .catch(err => {
        console.log(` - Failure! Didn't delete Project`);
        console.log(`\n`);
        res.status(400).json(`Error: ${err}`);
      });
  }
);

// * Update one Project by ID
// ! Can't Test with Postman
// POST http://localhost:5000/projects/update/:id
router.route('/update/:id/:from').post(
  (req, res) => {
    console.log('POST /projects/update/' + req.params.id);
    
    // -* Sample accepted req.body data:
    const sample = {
      name: 'Project Name',
      description: 'This is a project',
      priority: 'High',
      done: false,
      start: "2000-01-01",
      due: "2000-01-31",
      members: [
        {
          id: 'userID-1',
          role: 'Team Leader'
        },
        {
          id: 'userID-2',
          role: 'Developer'
        },
        {
          id: 'userID-3',
          role: 'Artist'
        }
      ],
      tasks: [
        'taskID-1',
        'taskID-2',
        'taskID-3'
      ]
    };

    const timestamp = Date.now();

    Project.findById(req.params.id)
      .then(
        project => {
          console.log(`${timestamp} - Project "${project.name}" Found!`);

          project.name = req.body.name;
          project.description = req.body.description;
          project.priority = req.body.priority;
          project.done = req.body.done;
          project.start = Date.parse(req.body.start);
          project.due = Date.parse(req.body.due);
          project.members = req.body.members;
          project.tasks = req.body.tasks;


          console.log('req.body.tasks');
          console.log(req.body.tasks);

          console.log(`${timestamp} - updatedProject: `);
          console.log(project);
          console.log(`\n`);
          
          project.save()
            .then(() => {
              console.log(`${timestamp} - Success! Project updated ${req.params.from}`);
              console.log(`\n`);
              res.json(`Success! Project updated`);
            })
            .catch(err => {
              console.log(`${timestamp} - Failure! Didn't update Project ${req.params.from}`);
              console.log(`\n`);
              res.status(400).json(`Error: ${err}`);
            });
        }
      )
      .catch(err => {
        console.log(`${timestamp} - Failure! Didn't update Project since can't find Project by ID`);
        console.log(err);
        console.log(`\n`);
        res.status(400).json(`Error: ${err}`);
      });
  }
);

// * Update one Project's done state by ID
// ! Can't Test with Postman
// POST http://localhost:5000/projects/done/:id
router.route('/done/:id').post(
  (req, res) => {
    console.log('POST /projects/done/' + req.params.id);
    const done = req.body.done;

    // -* Sample accepted req.body data:
    const sample = {
      done: false
    };

    Project.findByIdAndUpdate(req.params.id, { done: done }, { new: true })
    .then(
      updatedProject => {
        console.log(` - Project ${updatedProject.name} Found! `);

        console.log(` - Success! Project's done value updated to ${done}`);
        console.log(`\n`);
        res.json(`Success! Project's done value updated`);
      }
    )
    .catch(err => {
      console.log(` - Failure! Didn't update Project's done value`);
      console.log(`\n`);
      res.status(400).json(`Error: ${err}`);
    });
  }
);

module.exports = router;