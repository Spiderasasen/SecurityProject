import express from 'express';
import basicAuth from 'express-basic-auth';
import session from 'express-session';
import  cors from 'cors';
import bodyParser from 'body-parser';

import {getSessionOptions} from './services/sessionService.js';
import {getBasicAuthConfig} from './services/basicAuthService.js';
import {returnPublicPage,returnPrivatePage, checkAccessIntercept} from './controllers/simpleHTMLController.js';


const app = express();
//Replace with your personal port number
const port = 9004;

app.use(session(getSessionOptions()));
console.log(getBasicAuthConfig());
// app.use('/private',basicAuth(getBasicAuthConfig()));
app.use("/private", checkAccessIntercept);

app.get('/',returnPublicPage);
app.get('/private',returnPrivatePage);

app.listen(port,() => {
   console.log("Server is running on port " + port);
}).on('error',(error) => {
   console.error(error);
});
