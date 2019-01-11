var express = require('express')
var router = express.Router()
const knex = require('../db.js')



// get all employees
router.get('/getEmployees', function (req, res, next) {
  knex
    .from('employees')
    .select("*")
    .then((employees) => {
      res.json(employees)
    })
    .catch(() => {
      res.json({
        success: false,
        message: "Error in retriving employees."
      })
    })
});

// get specific employee 
router.get('/getEmployees/:id', function (req, res, next) {
  //console.log('id from getbyid()'+req.params.id)
  knex
    .from('employee')
    .select('*')
    .where('emp_id', '=', req.params.id)
    .then((employee) => {
      if (employee.length > 0) {
        res.json(employee)
      } else {
        res.json({
          success: false,
          message: "Error in retriving employee. ID inexistent."
        })
      }
    })
    .catch(() => {
      res.json({
        success: false,
        message: "Error in retriving employee."
      })
    })
});

router.post('/addEmployees', (req, res, next) => {
  console.log(req.body);
  knex
    .from('employees')
    .insert({
      emp_name: req.body.emp_name,
      salary: req.body.salary,
    })
    .then((resp) => {
      res.send(
        resp
      )
    })
    .catch((err) => {
      console.log(err);
      res.send(resp);
    })
})

// delete employees
router.delete('/deleteEmployees/:id', (req, res) => {

  knex
    .from('employees')
    .where('emp_id', '=', req.params.id)
    .del()
    .then((emp) => {
      if (emp > 0) {
        res.json({
          success: false,
          message: "Employee successfully deleted."
        })
      } else {
        res.json({
          success: false,
          message: "Error in deleting employee. ID inexistent."
        })
      }
    })
})

//update employee
router.put('/updateEmployees/:id',(req,res)=>{
  console.log("Id from .put()"+req.params.id)
  knex('employees')
  .update({
    emp_name: req.body.emp_name,
    salary: req.body.salary
  })
  .where('emp_id', '=', req.params.id)
  .then((customer) => {
    if (customer > 0) {
      res.json({
        success: true,
        message: "Customer successfully updated."
      })
    } else {
      res.json({
        success: false,
        message: "Error in updating customer. ID inexistent."
      })
    }
  })

})


//Search employee by name
router.get('/searchEmployees/:name', function (req, res, next) {
  console.log('name from search()'+req.params.name)
  knex
    .from('employee')
    .select('*')
    .where('emp_name', '=', req.params.name)
    .then((employee) => {
      if (employee.length > 0) {
        res.json(employee)
      } else {
        res.json({
          success: false,
          message: "Error in retriving employee. ID inexistent."
        })
      }
    })
    .catch(() => {
      res.json({
        success: false,
        message: "Error in retriving employee."
      })
    })
});
module.exports = router;




























// var express = require('express');
// var router = express.Router();
// const knex = require('../db');

// // get all employees
// router.get('/getEmployees', function (req, res, next) {
//   knex
//     .from('employees')
//     .select("*")
//     .then((employees) => {
//       res.json(employees)
//     })
//     .catch(() => {
//       res.json({
//         success: false,
//         message: "Error in retriving employees."
//       })
//     })
// });

// // get specific employee
// router.get('/getEmployees/:id', (req, res) => {
//   knex
//     .from('employees')
//     .select('*')
//     .where('emp_id', '=', req.params.id)
//     .then((employee) => {
//       if (employee.length > 0) {
//         res.json(employee)
//       } else {
//         res.json({
//           success: false,
//           message: "Error in retriving employee. ID inexistent."
//         })
//       }
//     })
//     .catch(() => {
//       res.json({
//         success: false,
//         message: "Error in retriving employee."
//       })
//     })
// })

// // update employee
// router.put('/putEmployee/:id', (req, res) => {
//     knex
//       .from('employee')
//       .update({
//         emp_name: req.body.name,
//         salary: salary,
//       })
//       .where('emp_id', '=', req.params.id)
//       .then((employee) => {
//         if (employee > 0) {
//           res.json({
//             success: false,
//             message: "Employee successfully updated."
//           })
//         } else {
//           res.json({
//             success: false,
//             message: "Error in updating employee. ID inexistent."
//           })
//         }
//       })
//   })
