import express from "express";
import CoursesControllers from "./coursesControllers.js";

const coursesRouter = express.Router()

const coursesControllers = new CoursesControllers()

coursesRouter.get('/', async(req, res) =>{
    const { success, statusCode, body } = await coursesControllers.getCourses()

    res.status(statusCode).send({success, statusCode, body})
})

coursesRouter.get('/nextMat', async(req, res) => {
    const { success, statusCode, body } = await coursesControllers.getNextCourseMat()

    res.status(statusCode).send({success, statusCode, body})
})

coursesRouter.post('/', async(req, res) => {
    const { success, statusCode, body } = await coursesControllers.addCourse(req.body)

    res.status(statusCode).send({success, statusCode, body})
})

coursesRouter.delete('/:id', async(req, res) => {
    const { success, statusCode, body } = await coursesControllers.deleteCourse(req.params.id)

    res.status(statusCode).send({success, statusCode, body})
})

coursesRouter.put('/:id', async(req, res) => {
    const { success, statusCode, body } = await coursesControllers.updateCourse(req.params.id, req.body)

    res.status(statusCode).send({success, statusCode, body})
})

export default coursesRouter