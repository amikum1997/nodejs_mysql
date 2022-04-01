import express from 'express';


const router = express.Router()

router.get('/status', (req, res) => res.send({status : 'ok'}));
// router.use('/auth', authRouter)


export default router;
