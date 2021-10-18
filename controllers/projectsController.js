const Project = require('../models/Project')

exports.createProject = async (req, res) => {
    try {
        const project = new Project(req.body)
        project.userCreator = req.user.id
        project.save()
        res.json(project)
    } catch (error) {
        console.log(error)
        res.status(500).send('An error happened')
    }
}