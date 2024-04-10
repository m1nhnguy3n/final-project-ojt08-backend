const express = require('express');
const router = express.Router();

const employeeController = require('../controllers/EmployeeController')

router.post('/', employeeController.createEmployee);

router.get('/', employeeController.getAllEmployees);

router.get('/:id', employeeController.getOneEmployee);

router.delete('/:id', employeeController.deleteEmployee);

router.patch('/', employeeController.updateEmployee);



module.exports = router;
