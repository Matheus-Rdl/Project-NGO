import express from "express";
import ExamplesControllers from "./examplesControllers.js";

const examplesRouter = express.Router()

const examplesControllers = new ExamplesControllers()

examplesRouter.get('/', async(req, res) =>{
    const { success, statusCode, body } = await examplesControllers.getExamples()

    res.status(statusCode).send({success, statusCode, body})
})

examplesRouter.post('/', async(req, res) => {
    const { success, statusCode, body } = await examplesControllers.addExample(req.body)

    res.status(statusCode).send({success, statusCode, body})
})

examplesRouter.delete('/:id', async(req, res) => {
    const { success, statusCode, body } = await examplesControllers.deleteExample(req.params.id)

    res.status(statusCode).send({success, statusCode, body})
})

examplesRouter.put('/:id', async(req, res) => {
    const { success, statusCode, body } = await examplesControllers.updateExample(req.params.id, req.body)

    res.status(statusCode).send({success, statusCode, body})
})

export default examplesRouter