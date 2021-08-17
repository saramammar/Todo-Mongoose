const Data = require('../models/task.model')

const generateStatus = (apiStatus, data, message) => {
    return {
        apiStatus,
        data,
        message
    }
};

const addTask = async (req, res) => {
    const newInsert = new Data(req.body)
    try {
        await newInsert.save()
        res.status(200).send(generateStatus(true, newInsert, "Task added success"))
    }
    catch (e) {
        res.status(500).send(generateStatus(false, e.message, "data inserting problem"))
    }
}

const getAllTasks = async (req, res) => {
    try {
        tasks = await Data.find()
        res.status(200).send(generateStatus(true, tasks, "Tasks fetced success"))
    }
    catch (e) {
        res.status(500).send(generateStatus(false, e.message, "error loading data"))
    }
}

const getSingle = async (req, res) => {
    const id = req.params.id
    try {
        task = await Data.findById(id)
        if (!task) return res.status(404).send(generateStatus(false, null, "Task not found"))
        res.status(200).send(generateStatus(true, task, "Task retrived"))
    }
    catch (e) {
        res.status(500).send(generateStatus(false, e.meesage, "error loading task"))
    }
}

const editTask = async (req, res) => {
    try {
        id = req.params.id
        allowed = ['dueDate']
        requested = Object.keys(req.body)
        const isValidUpdates = requested.every(r => allowed.includes(r))
        if (!isValidUpdates) return res.status(500).send(generateStatus(false, null, "invalid requested"))
        const task = await Data.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
        if (!task) return res.status(404).send(generateStatus(false, null, "Task not found"))
        res.status(200).send(generateStatus(true, task, "Task updated successfully"))
    }
    catch (e) {
        res.status(500).send(generateStatus(false, e.message, "error in edit"))
    }

}

const deleteTask = async (req, res) => {
    try {
        id = req.params.id
        const task = await Data.findByIdAndDelete(id)
        if (!task) return res.status(400).send(generateStatus(false, null, "Task not found"))
        res.status(200).send(generateStatus(true, task, "Task deleted successfully"))
    }
    catch (e) {
        res.status(500).send(generateStatus(false, e.message, "error in delete"))
    }
}

module.exports = {
    addTask, getAllTasks, getSingle, editTask, deleteTask
}