import express from 'express';
import AuthModule from '../controllers/authModule';


const authRouter = express.Router()

authRouter.route('/login').post(AuthModule.login)
authRouter.route('/register').post(AuthModule.register)
authRouter.route('/resetPasword').post(AuthModule.resetPassword)
authRouter.route('/updateDetail').put(AuthModule.updateUser)
authRouter.route('/logout').delete(AuthModule.logout)
authRouter.route('/deleteUser').delete(AuthModule.deleteUser)

export default authRouter;