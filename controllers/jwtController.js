
import {authenticateUserWithJWT,verifyJWT}from '../services/jwtService.js';

export async function authenticateWithJWTAPI(req,res) {
    let userName = req.body.userName;
    let userPass = req.body.userPassword;
    let result = await authenticateUserWithJWT(userName,userPass);
    res.json(result);
}

export function verifyTokenAPI(req,res,next) {
    let authHeader = req.headers.authorization;
    let valid = false;
    if (authHeader) {
        let token = authHeader.split(' ')[1];
        let verified = verifyJWT(token);
        if (verified) {
            next();
            valid = true;
        }
    }
    if (!valid) res.status(401).send("Invalid Token")
}

export function exampleAPICall(req,res) {
    res.json("{success:true}");
}