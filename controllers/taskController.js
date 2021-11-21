const Task = require('../models/Task')
const Project = require('../models/Project')
const { validationResult } = require('express-validator')

exports.createTask = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    try {
        const { project } = req.body

        const projectExists = await Project.findById(project)

        if (!projectExists) return res.status(404).json({ msg: 'Project not found' })

        if (projectExists.userCreator.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' })

        const task = new Task(req.body)
        await task.save()
        res.json({ task })

    } catch (error) {
        console.log(error)
        res.status(500).send('An error happened')
    }
}

exports.getTasks = async (req, res) => {
    try {
        const { project } = req.body

        const projectExists = await Project.findById(project)

        if (!projectExists) return res.status(404).json({ msg: 'Project not found' })

        if (projectExists.userCreator.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' })

        const tasks = await Task.find({ project })
        res.json(tasks)

    } catch (error) {
        console.log(error)
        res.status(500).send('An error happened')
    }
}

exports.updateTask = async (req, res) => {
    try {
        const { project, name, state } = req.body

        let taskExist = await Task.findById(req.params.id)

        const projectExists = await Project.findById(project)

        if (!taskExist) return res.status(404).json({ msg: 'Task does not exist' })
        
        if (projectExists.userCreator.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' })
        
        const newTask = {}
        if (name) newTask.name = name
        if (state) newTask.state = state

        taskExist = await Task.findOneAndUpdate({_id: req.params.id}, newTask, {new: true})

        res.json(taskExist)

    } catch (error) {
        console.log(error)
        res.status(500).send('An error happened')
    }
}