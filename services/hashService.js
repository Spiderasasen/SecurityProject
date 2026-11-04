import crypto from 'crypto';
import argon from 'argon2';

export async function hashPassword(salt, password) {
    const hash = await argon.hash(password,{salt:salt});
    return hash;
}

async function createSalt() {
    const saltValue = await crypto.randomBytes(32);
    return saltValue;
}

export async function createPasswordObject(password) {
    const salt = await createSalt();
    const passwordHash = await hashPassword(salt,password);
    const passwordObject = {};
    passwordObject.salt = salt;
    passwordObject.passwordHash = passwordHash;
    return passwordObject;
}