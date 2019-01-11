var express = require('express')
var router = express.Router()
const knex = require('../db.js')
const jwt = require('jwt-simple');
var passwordHash = require('password-hash');

router.post('/login', function (req, resp, next) {
  var username = req.body.email;
  var password = req.body.password;
  knex('users')
    .where('email', '=', username)
    .then((user) => {
      if (user[0] == null || user[0].email !== username) {

        resp.json({
          status: -1,
          message: 'Incorrect username.'
        });
      } else {
        //if (password === user[0].password) {
        if (passwordHash.verify(password, user[0].password)) {
          var expires = new Date();
          // expires.setHours(expires.getHours() + 2)
          expires.setMinutes(expires.getMinutes() + 1)
          user[0].token = jwt.encode({
            exp: expires.getMilliseconds,
            user: user[0]
          }, 'secret');

          user[0].timeout = expires
          resp.send(user[0]);
        }
        else {
          resp.json({
            message: 'Incorrect password.'
          });
        }
      }
    });

});

// logout user
router.get('/logout', (req, res) => {
  res.json({
    success: true,
    message: "Logout successfully."
  })
})


router.post('/register', function (req, res, next) {
  // console.log(req.body.name + req.body.email+req.body.password)
  var password = req.body.password;
  var hashedPassword = passwordHash.generate(password);
  // console.log(hashedPassword);
  knex
    .from('users')
    .insert({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    .then(() => {
      res.json({
        success: true,
        message: "Data successfully inserted."
      })
    })
    .catch((err) => {
      console.log(err)
      res.json({
        success: false,
        message: "Error. Please try again later."
      })
    })
});


// get all users
router.get('/getUsers', function (req, res, next) {
  knex
    .from('users')
    .select("*")
    .then((users) => {
      res.json(users)
    })
    .catch(() => {
      res.json({
        success: false,
        message: "Error in retriving users."
      })
    })
});

// delete users
router.delete('/deleteUsers/:id', (req, res) => {

  knex
    .from('users')
    .where('user_id', '=', req.params.id)
    .del()
    .then((user) => {
      if (user > 0) {
        res.json({
          success: false,
          message: "User successfully deleted."
        })
      } else {
        res.json({
          success: false,
          message: "Error in deleting user. ID inexistent."
        })
      }
    })
})
  


module.exports = router;
