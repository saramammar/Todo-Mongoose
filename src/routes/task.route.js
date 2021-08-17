const express = require('express')
const router = new express.Router()
const dataController = require('../../app/controller/task.controller')

router.post('/',dataController.addTask )

router.get('/allTasks', dataController.getAllTasks)
router.get('/allTasks/:id', dataController.getSingle)

router.patch('/edit/:id', dataController.editTask)
router.delete('/delete/:id', dataController.deleteTask)

module.exports = router