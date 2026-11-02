import {userMap} from "./userService.js";

export function getBasicAuthConfig() {
    const basicAuthConfig = {};
    basicAuthConfig.authorizer = checkPassword;
    basicAuthConfig.challenge = true;
    basicAuthConfig.unauthorizedResponse = "Unauthorized";
    return basicAuthConfig;
}

function checkPassword(userName,password) {
    if (userMap.has(userName)) {
        const userObj = userMap.get(userName);
        const userPassword = userObj.userPassword;
        if (password === userPassword) {
            return true;
        }
    }
    return false;
}
