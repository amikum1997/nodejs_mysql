import Joi, {ObjectSchema, ValidationError} from "joi";
import BaseError from '../error/baseError';

interface JoiResponseI {
    success : boolean,
    error : any,
    message : string | null
}

export default {
    validateBody : (joiObject : ObjectSchema, data : any) : JoiResponseI => {
        const  { error, value } = joiObject.validate(data) as {error : ValidationError, value : any};
        if(error){
            const message = error.details[0].message;
            throw new BaseError(message)
        }
        return {success : true, error, message : null}
    },

    validateBodyAsync :async (joiObject : ObjectSchema, data : any) : Promise<JoiResponseI>=> {
        const  { error, value } = await joiObject.validateAsync(data) as {error : ValidationError, value : any};
        if(error){
            const message = error.details[0].message;
            throw new BaseError(message)
        }
        return {success : true, error, message : null}
    }
}