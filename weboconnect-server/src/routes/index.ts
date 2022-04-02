import express from 'express';
import authRouter from './authRoute';


const router = express.Router()

router.get('/status', (req, res) => res.send({status : 'ok'}));
router.use('/auth', authRouter)


export default router;
