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