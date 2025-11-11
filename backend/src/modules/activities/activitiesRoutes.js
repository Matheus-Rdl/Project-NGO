import express from "express";
import ActivitiesControllers from "./activitiesControllers.js";

const activitiesRouter = express.Router()

const activitiesControllers = new ActivitiesControllers()

activitiesRouter.get('/', async(req, res) =>{
    const { success, statusCode, body } = await activitiesControllers.getActivities()

    res.status(statusCode).send({success, statusCode, body})
})

activitiesRouter.get('/nextMat', async(req, res) => {
    const { success, statusCode, body } = await activitiesControllers.getNextActivityMat()

    res.status(statusCode).send({success, statusCode, body})
})

activitiesRouter.post('/', async(req, res) => {
    const { success, statusCode, body } = await activitiesControllers.addActivity(req.body)

    res.status(statusCode).send({success, statusCode, body})
})

activitiesRouter.delete('/:id', async(req, res) => {
    const { success, statusCode, body } = await activitiesControllers.deleteActivity(req.params.id)

    res.status(statusCode).send({success, statusCode, body})
})

activitiesRouter.put('/:id', async(req, res) => {
    const { success, statusCode, body } = await activitiesControllers.updateActivity(req.params.id, req.body)

    res.status(statusCode).send({success, statusCode, body})
})

export default activitiesRouter