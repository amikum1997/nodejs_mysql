import express,{Application} from "express";
import cors from 'cors';
import router from "../routes";
import HandleError from "../error/errorHandel";
import path from 'path'
import dotenv from 'dotenv-safe';


const app: Application = express();

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// ENV
dotenv.config({
    allowEmptyValues: true,
    path: path.join(__dirname, '../../.env'),
    sample: path.join(__dirname, '../../.env.example'),
});

// mount api v1 routes
app.use('/v1', router);

// BASE ERROR HANDELING
app.use(HandleError.returnError);


export default app;