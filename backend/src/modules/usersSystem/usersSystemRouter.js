import express from 'express';
import UsersSystemControllers from './usersSystemControllers.js';

const usersSystemRouter = express.Router()

const usersSystemControllers = new UsersSystemControllers()

usersSystemRouter.get('/mat/:mat', async (req, res) => {
  const { mat } = req.params;
  const { success, statusCode, body } = await usersSystemControllers.getByMat(mat)
  res.status(statusCode).send({ success, statusCode, body })
})

export default usersSystemRouter