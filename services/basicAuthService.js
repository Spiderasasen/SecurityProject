import {userMap} from "./userService.js";
import {hashPassword} from "./hashService.js";

export function getBasicAuthConfig() {
    const basicAuthConfig = {};
    basicAuthConfig.authorizer = checkPassword;
    basicAuthConfig.challenge = true;
    basicAuthConfig.unauthorizedResponse = "Unauthorized";
    return basicAuthConfig;
}

export async function checkPassword(userName,password) {
    if (userMap.has(userName)) {
        const userObj = userMap.get(userName);
        // const userPassword = userObj.userPassword;
        const passwordObject = userObj.userPasswordObject;
        const passwordHash = await hashPassword(passwordObject.salt, password);
        if (passwordHash === passwordObject.passwordHash) {
            return true;
        }
    }
    return false;
}
