import express from "express";
import CollectionsControllers from "./collectionsControllers.js";

const collectionsRouter = express.Router()

const collectionsControllers = new CollectionsControllers()

collectionsRouter.get('/', async(req, res) =>{
    const { success, statusCode, body } = await collectionsControllers.getCollections()

    res.status(statusCode).send({success, statusCode, body})
})

collectionsRouter.post('/', async(req, res) => {
    const { success, statusCode, body } = await collectionsControllers.addCollection(req.body)

    res.status(statusCode).send({success, statusCode, body})
})

collectionsRouter.delete('/:id', async(req, res) => {
    const { success, statusCode, body } = await collectionsControllers.deleteCollection(req.params.id)

    res.status(statusCode).send({success, statusCode, body})
})

collectionsRouter.put('/:id', async(req, res) => {
    const { success, statusCode, body } = await collectionsControllers.updateCollection(req.params.id, req.body)

    res.status(statusCode).send({success, statusCode, body})
})

export default collectionsRouter