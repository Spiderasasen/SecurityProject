import jwt from 'jsonwebtoken';

import {checkPassword} from './basicAuthService.js';
import {userMap} from './userService.js';

const jwtSecretKey = "secretKeyForToken";
const expiresIn = '5m';

function generateJWT(jsonObject) {
    console.log(jsonObject);
    const token = jwt.sign(jsonObject,jwtSecretKey,{ expiresIn});
    console.log(token);
    return token;
}

export function verifyJWT(token) {
    try {
        const verified = jwt.verify(token, jwtSecretKey);
        if(verified){
            //Access Granted
            return true;
        }else{
            // Access Denied
            return false;
        }
    } catch (error) {
        // Access Denied
        return false;
    }
}

export async function authenticateUserWithJWT(userName,userPassword) {
    let authenticateResult = {};
    authenticateResult.success = false;
    if (await checkPassword(userName,userPassword)) {
        authenticateResult.success=true;
        let user = {...userMap.get(userName)};
        delete user.userPasswordObject
        authenticateResult.token = generateJWT(user);
    }

    return authenticateResult;
}