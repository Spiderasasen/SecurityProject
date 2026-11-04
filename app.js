import express from 'express';
import basicAuth from 'express-basic-auth';
import session from 'express-session';
import  cors from 'cors';
import bodyParser from 'body-parser';

import {getSessionOptions} from './services/sessionService.js';
import {getBasicAuthConfig} from './services/basicAuthService.js';
import {returnPublicPage,returnPrivatePage, checkAccessIntercept} from './controllers/simpleHTMLController.js';
import {verifyTokenAPI, exampleAPICall, authenticateWithJWTAPI} from "./controllers/jwtController.js";


const app = express();
//Replace with your personal port number
const port = 9004;
app.use(bodyParser.json());
app.use(cors("*"));

app.use(session(getSessionOptions()));
console.log(getBasicAuthConfig());

// app.use('/private',basicAuth(getBasicAuthConfig()));
app.use("/private", checkAccessIntercept);

app.get('/',returnPublicPage);
app.get('/private',returnPrivatePage);

app.use('/api/example', verifyTokenAPI);
app.get('/api/example', exampleAPICall);
app.post('/authenticate', authenticateWithJWTAPI);

app.listen(port,() => {
   console.log("Server is running on port " + port);
}).on('error',(error) => {
   console.error(error);
});
