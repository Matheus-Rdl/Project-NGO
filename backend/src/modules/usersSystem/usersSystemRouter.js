import express from 'express';
import UsersSystemControllers from './usersSystemControllers.js';

const usersSystemRouter = express.Router()

const usersSystemControllers = new UsersSystemControllers()

usersSystemRouter.get('/mat/:mat', async (req, res) => {
  const { mat } = req.params;
  const { success, statusCode, body } = await usersSystemControllers.getByMat(mat)
  res.status(statusCode).send({ success, statusCode, body })
});

usersSystemRouter.put('/mat/:mat', async (req, res) => {
  const { mat } = req.params;
  const { success, statusCode, body } = await usersSystemControllers.upsertByMat(mat, req.body);
  res.status(statusCode).send({ success, statusCode, body })
});

usersSystemRouter.post('/login', async (req, res) => {
  const { success, statusCode, body } =
    await usersSystemControllers.login(req.body);

  res.status(statusCode).send({ success, statusCode, body });
});

export default usersSystemRouter