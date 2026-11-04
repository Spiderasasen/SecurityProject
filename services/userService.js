import {createPasswordObject} from './hashService.js';

export let userMap = new Map();

initializeUserList();

function initializeUserList() {
    createUser("shudson","password1","Stephanie Hudson","admin");
    createUser("alewis","password2","Andre lewis","user");
}

async function createUser(userName,userPassword,userFullName,userRole) {
    let newId = userMap.size+1;
    /*let newUser = {
        userId : newId,
        userName : userName,
        userPassword : userPassword,
        userFullName : userFullName,
        userRole : userRole
        }

     */
    let newUser = {
        userId : newId,
        userName : userName,
        userPasswordObject : await createPasswordObject(userPassword),
        userFullName : userFullName,
        userRole : userRole
    }
    userMap.set(userName,newUser);
    return newUser
}
