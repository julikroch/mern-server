const express = require('express')
const router = express.Router()
const projectsController = require('../controllers/projectsController')
const auth = require('../middleware/auth')
const { check } = require('express-validator')

router.post('/',
    auth,
    [
        check('name', 'Project name must be completed').not().isEmpty()
    ],
    projectsController.createProject
)

router.get('/',
    auth,
    projectsController.getProjects
)

//Update project
router.put('/:id',
    auth,
    [
        check('name', 'Project name must be completed').not().isEmpty()
    ],
    projectsController.updateProject
)

router.delete('/:id',
    auth,
    projectsController.deleteProject
)
module.exports = router