import express from "express";
import PagesControllers from "./pagesControllers.js";

const pagesRouter = express.Router()

const pagesControllers = new PagesControllers()

pagesRouter.get('/', async(req, res) =>{
    const { success, statusCode, body } = await pagesControllers.getPages()

    res.status(statusCode).send({success, statusCode, body})
})

pagesRouter.post('/', async(req, res) => {
    const { success, statusCode, body } = await pagesControllers.addPage(req.body)

    res.status(statusCode).send({success, statusCode, body})
})

pagesRouter.delete('/:id', async(req, res) => {
    const { success, statusCode, body } = await pagesControllers.deletePage(req.params.id)

    res.status(statusCode).send({success, statusCode, body})
})

pagesRouter.put('/:id', async(req, res) => {
    const { success, statusCode, body } = await pagesControllers.updatePage(req.params.id, req.body)

    res.status(statusCode).send({success, statusCode, body})
})

export default pagesRouter