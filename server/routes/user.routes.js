// * Core Dependencies
const router = require('express').Router();
const User = require('../models/user.model.js');

// * All possible routes complete
// * Will add if needed

// * Get all Users
// GET http://localhost:5000/users/
router.route('/').get(
  (req, res) => {
    console.log('GET /users/');

    User.find()
      .then(users => {
        console.log(` - Success! ${users.length} users found`);
        console.log(`\n`);
        res.json(users);
      })
      .catch(err => {
        console.log(` - Failure! Didn't find all Users`);
        console.log(`\n`);
        res.status(400).json(`Error: ${err}`);
      });
  }
);

// * Get one User by ID
// GET http://localhost:5000/users/:id
router.route('/:id').get(
  (req,res) => {
    console.log('GET /users/' + req.params.id);

    User.findById(req.params.id)
      .then(user => {
        console.log(` - Success! ${user.name.first} ${user.name.last} (${user.username}) found`);
        console.log(`\n`);
        res.json(user);
      })
      .catch(err => {
        console.log(` - Failure! Didn't find User by ID`);
        console.log(`\n`);
        res.status(400).json(`Error: ${err}`);
      });
  }
);

// * Get one User by Username
// GET http://localhost:5000/users/username/:username
router.route('/username/:username').get(
  (req,res) => {
    console.log('GET /users/username/' + req.params.username);

    User.findOne({username: req.params.username})
      .then(user => {
        console.log(` - Success! ${user.name.first} ${user.name.last} (${user._id}) found`);
        console.log(`\n`);
        res.json(user);
      })
      .catch(err => {
        console.log(` - Failure! Didn't find User by username`);
        console.log(`\n`);
        res.status(400).json(`Error: ${err}`);
      });
  }
);

// * Get one User by Email
// GET http://localhost:5000/users/email/:email_encoded
router.route('/email/:email_encoded').get(
  (req,res) => {
    console.log('GET /users/email/' + req.params.email_encoded);

    // -* Unencode email_encoded
    const email_decoded = decodeURIComponent(req.params.email_encoded.replace(/\+/g, ' '));

    User.findOne({email: email_decoded})
    .then(user => {
      console.log(` - Success! ${user.name.first} ${user.name.last} (${user._id}) found`);
      console.log(`\n`);
      res.json(user);
    })
    .catch(err => {
      console.log(` - Failure! Didn't find User by email`);
      console.log(`\n`);
      res.status(400).json(`Error: ${err}`);
    });
  }
);

// * Delete one User by ID
// ! Not allowed to have API access
// ! If deleting user, must be done via direct MongoDB access
// router.route('/:id').delete(
//   (req,res) => {
//     console.log('DELETE /users/' + req.params.id);

//     User.findByIdAndDelete(req.params.id)
//       .then(() => res.json('User deleted.'))
//       .catch(err => res.status(400).json(`Error: ${err}`));
//   }
// );

// * Add one new User
// ! Can't Test with Postman
// POST http://localhost:5000/users/add
router.route('/add').post(
  (req, res) => {
    console.log('POST /users/add'); 

    // -* Sample accepted req.body data:
    const sample = {
      name_first: 'Juan',
      name_last: 'Dela Cruz',
      main_role: 'Developer',
      username: "johnWitDaCross01",
      password: "password1234",
      email: "email@email.com",
    };

    const name = {
      first: req.body.name_first,
      last: req.body.name_last
    };
    const main_role = req.body.main_role;
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const profile_picture = 'https://pasrc.princeton.edu/sites/g/files/toruqf431/files/styles/freeform_750w/public/2021-03/blank-profile-picture-973460_1280.jpg';

    const newUser = new User(
      {
        name,
        main_role,
        username,
        password,
        email,
        profile_picture
      }
    );

    console.log(` - newUser: `)
    console.log(newUser);
    console.log(`\n`);

    newUser.save()
      .then(() => {
        console.log(` - Success! User added`);
        console.log(`\n`);
        res.json(`Success! User added`);
      })
      .catch(err => {
        console.log(` - Failure! Didn't add user`);
        console.log(`\n`);
        res.status(400).json(`Error: ${err}`);
      });
  }
);

// * Update one User by ID
// ! Can't Test with Postman
// POST http://localhost:5000/users/update/:id
router.route('/update/:id').post(
  (req, res) => {
    console.log('POST /users/update/' + req.params.id);

    // -* Sample accepted req.body data:
    const sample = {
      name_first: 'Juan',
      name_last: 'Dela Cruz',
      main_role: 'Developer',
      profile_picture: 'profileUrl',
      username: "johnWitDaCross01",
      password: "password1234",
      email: "email@email.com"
    };

    User.findById(req.params.id)
      .then(
        user => {
          console.log(` - User ${req.body.name_first} ${req.body.name_last} Found! `);

          user.name = {
            first: req.body.name_first,
            last: req.body.name_last
          };
          user.main_role = req.body.main_role;
          user.profile_picture = req.body.profile_picture;
          user.username = req.body.username;
          user.password = (req.body.password != null) ? req.body.password : user.password;
          user.email = req.body.email;      
          
          console.log(` - updatedUser: `);
          console.log(user);
          console.log(`\n`);
          
          user.save()
            .then(() => {
              console.log(` - Success! User updated`);
              console.log(`\n`);
              res.json(`Success! User updated`);
            })
            .catch(err => {
              console.log(` - Failure! Didn't update User`);
              console.log(`\n`);
              res.status(400).json(`Error: ${err}`);
            });
        }
      )
      .catch(err => {
        console.log(` - Failure! Didn't update User since can't find User by ID`);
        console.log(`\n`);
        res.status(400).json(`Error: ${err}`);
      });
  }
);

// * Update one User's Projects List by ID
// ! Can't Test with Postman
// POST http://localhost:5000/users/update/projects/:id
// -* Sample accepted req.body data:
// const sample = {
//   projects: [
//     'projectID-1',
//     'projectID-2',
//     'projectID-3'
//   ]
// };
router.route('/update/projects/:id').post(
  (req, res) => {
    console.log('POST /users/update/projects/' + req.params.id);

    User.findById(req.params.id)
      .then(
        user => {
          console.log(` - User ${user.name.first} ${user.name.last} Found! `);

          user.projects = req.body.projects;

          user.save()
          .then(() => {
            console.log(` - Success! User's projects updated`);
            console.log(`\n`);
            res.json(`Success! User's projects updated`);
          })
          .catch(err => {
            console.log(` - Failure! Didn't update User's projects`);
            console.log(`\n`);
            res.status(400).json(`Error: ${err}`);
          });
        }
      )
      .catch(err => {
        console.log(` - Failure! Didn't update User's projects since can't find User by ID`);
        console.log(`\n`);
        res.status(400).json(`Error: ${err}`);
      });
  }
);

// * Update one User's Friends List
// ! Can't Test with Postman
// POST http://localhost:5000/users/update/friends/:id
router.route('/update/friends/:id').post(
  (req, res) => {
    console.log('POST /users/update/friends/' + req.params.id);

    // -* Sample accepted req.body data:
    const sample = {
      friends: [
        'userID-1',
        'userID-2',
        'userID-3'
      ]
    };
    
    User.findById(req.params.id)
      .then(
        user => {
          console.log(` - User ${user.body.name.first} ${user.body.name.last} Found! `);

          user.friends = req.body.friends;

          user.save()
          .then(() => {
            console.log(` - Success! User's friends updated`);
            console.log(`\n`);
            res.json(`Success! User's friends updated`);
          })
          .catch(err => {
            console.log(` - Failure! Didn't update User's friends`);
            console.log(`\n`);
            res.status(400).json(`Error: ${err}`);
          });
        }
      )
      .catch(err => {
        console.log(` - Failure! Didn't update User's friends since can't find User by ID`);
        console.log(`\n`);
        res.status(400).json(`Error: ${err}`);
      });
  }
);

router.post('/register', (req, res) => {
  const { name_first, name_last, main_role, username, email, password, password2 } = req.body;
  let errors = [];

  // Check required fields
  if (!name_first || !name_last || !main_role || !username || !email || !password || !password2) {
    errors.push({ msg: 'Please fill in all fields' });
  }

  // Check passwords match
  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  // Check if user already exists
  User.findOne({ username: username }).then(user => {
    if (user) {
      errors.push({ msg: 'Username is already registered' });
    } else {
      const newUser = new User({
        name: {
          first: name_first,
          last: name_last
        },
        main_role,
        username,
        email,
        password
      });

      // Hash password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => {
              res.redirect('/login');
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/projects',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});

module.exports = router;