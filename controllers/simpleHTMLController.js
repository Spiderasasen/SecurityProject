import {userMap} from '../services/userService.js';

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
