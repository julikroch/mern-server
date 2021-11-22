const Project = require('../models/Project')
const { validationResult } = require('express-validator')

exports.createProject = async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const project = new Project(req.body)
        project.userCreator = req.user.id
        project.save()
        res.json(project)

    } catch (error) {
        console.log(error)
        res.status(500).send('An error happened')
    }
}

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ userCreator: req.user.id })
        res.json({ projects })

    } catch (error) {
        console.log(error)
        res.status(500).send('An error happened')
    }
}

exports.updateProject = async (req, res) => {
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const { name } = req.body
    const newProject = {}

    if (name) newProject.name = name

    try {
        let project = await Project.findById(req.params.id)

        if (!project) {
            return res.status(404).json({ msg: 'Project not found' })
        }

        if (project.userCreator.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' })
        }

        project = await Project.findByIdAndUpdate({ _id: req.params.id }, { $set: newProject }, { new: true })

        res.json({ project })
    } catch (error) {
        console.log(error)
        res.status(500).send('Server error')
    }
}

exports.deleteProject = async (req, res) => {
    try {
        let project = await Project.findById(req.params.id)

        if (!project) {
            return res.status(404).json({ msg: 'Project not found' })
        }

        if (project.userCreator.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' })
        }

        await Project.findOneAndRemove({ _id: req.params.id })
        res.json({ msg: 'Project deleted' })

    } catch (error) {
        console.log(error)
        res.status(500).send('Server error')
    }
}