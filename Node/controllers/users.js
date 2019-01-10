var express = require('express')
var router = express.Router()
const knex = require('../db.js')
const jwt = require('jwt-simple');

router.post('/login', function (req, resp, next) {
  var username = req.body.email;
  var password = req.body.password;
  knex('users')
    .where('email', '=', username)
    .then((user) => {
      if (user[0] == null || user[0].email!==username) {
        
        resp.json({
          status: -1,
          message: 'Incorrect username.'
        });
      } else {
        if (password === user[0].password) {
          var expires = new Date();
          console.log('token generated'+expires.getMinutes());
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

router.post('/register',function(req,res,next){
  console.log(req.body.name + req.body.email+req.body.password)
  knex
  .from('users')
  .insert({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
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

module.exports = router;
