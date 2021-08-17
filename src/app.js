require('dotenv').config()

const express = require('express')
require('../app/db/connection')

const app = express()

const taskRoutes = require('./routes/task.route')

app.use(express.json())
app.use(taskRoutes)

module.exports = app