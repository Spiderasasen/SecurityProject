import {userMap} from '../services/userService.js';
import {checkPassword} from '../services/basicAuthService.js'

export function returnPublicPage(req,res)  {
    res.send("Welcome to the Public Page");
}


export function returnPrivatePage(req,res)  {
    console.log(req.session);
    if (req.session) {
        req.session.views = (req.session.views || 0) + 1;
    }
    if (!req.auth) {
        let returnString ="You hacked the site how did you get in here without security"
        if (req.session && req.session.views) {
            returnString += "<br>But you have been to this page " + req.session.views + " times";
        }
        res.send(returnString);
        return;
    }
    if (!req.session.user) {
        req.session.user = userMap.get(req.auth.user);
    }


    let userFullName = req.session.user.userFullName;

    // Display the user's name and view count
    res.send("Welcome, " + userFullName + "! You've viewed this page " + req.session.views + " times.");

}

export async function checkAccessIntercept(req,res,next) {

    let basicAuthorization = req.headers.authorization;
    if (!basicAuthorization) {
        res.setHeader('WWW-Authenticate', 'Basic realm="My Protected Area"');
        res.status(401).send("No Basic Authorization Sent");
        return;
    }

    const auth = new Buffer.from(basicAuthorization.split(' ')[1],'base64').toString().split(':');
    const user = auth[0];
    const pass = auth[1];

    if (await checkPassword(user,pass)) {
        req.auth = {};
        req.auth.user = user;
        req.auth.password = pass;
        next();
        return;
    }

    res.setHeader('WWW-Authenticate', 'Basic realm="My Protected Area"');
    res.status(401).send("Invalid Username/Password");

}