import { IRequest, IResponse, INext } from "../interface/vendors"
import BaseError from "../error/baseError";


const AuthModule = {
    login : async(req : IRequest , res  :IResponse) => {},
    register : async(req : IRequest , res  :IResponse) => {},
    forgotPassword : async(req : IRequest , res  :IResponse) => {},
    resetPassword : async(req : IRequest , res  :IResponse) => {},
    verifyUser : async(req : IRequest , res  :IResponse) => {},
}

export default AuthModule;


