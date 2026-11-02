export function getSessionOptions(){
    const sessionConfig = {}
    sessionConfig.secret = "mySecretKey";
    sessionConfig.resave = "false";
    sessionConfig.saveUninitialized = true;

    return sessionConfig;
}