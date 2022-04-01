import express from 'express';
import AuthModule from '../controllers/authModule';


const authRouter = express.Router()

authRouter.route('/login').post(AuthModule.login)
authRouter.route('/register').post(AuthModule.register)
authRouter.route('/forgotPassword').post(AuthModule.forgotPassword)
authRouter.route('/resetPasword').post(AuthModule.resetPassword)
authRouter.route('/varifyUser').post(AuthModule.verifyUser)

export default authRouter;