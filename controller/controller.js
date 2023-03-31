const url = require('url');
var User = require('../models/model');

// create and save new user
exports.create = (req, res) => {
  // validate request
  if (!req.body) {
    res
      .status(400)
      .send({ message: 'There is no data in the create request!' });
    return;
  }
  // new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    gender: req.body.gender,
  });

  // save user in the database
  user
    .save(user)
    .then((data) => {
      //res.send(data)
      res.redirect(
        url.format({
          pathname: '/api/users',
          query: {
            id: user.id,
          },
        })
      );
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating a new user',
      });
    });
};

// Retrieve and return a single user
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    User.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: 'Not found user with id ' + id,
          });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error retrieving user with id ' + id,
        });
      });
  } else {
    User.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || 'Error Occurred while retrieving user information',
        });
      });
  }
};

// Retrieve and return all users
exports.findAll = (req, res) => {
  User.find()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Error Occurred while retrieving user information',
      });
    });
};

// Update a new identified user by user id
exports.update = (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send({ message: 'There is no data in the create request' });
  }

  const id = req.params.id;
  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Update user with ${id}. user not found!`,
        });
      } else {
        res.redirect(
          url.format({
            pathname: '/api/users',
            query: {
              id,
            },
          })
        );
      }
    })
    .catch((err) => {
      res.status(500).send({ message: `Error Update user data : ${err}` });
    });
};

// Delete a user with specified user id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Delete with id ${id}. user id is wrong`,
        });
      } else {
        res.send({
          message: 'User was deleted successfully!',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete User with id=' + id,
      });
    });
};
