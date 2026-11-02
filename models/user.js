export class User {
    userId = null;
    userName = null;
    userPassword = null;
    userFullName = null;
    userRole = null;

    constructor (id,name,password,fullName,role) {
        this.userId = id;
        this.userName = name;
        this.userPassword = password;
        this.userFullName = fullName;
        this.userRole = role;
    }

}
