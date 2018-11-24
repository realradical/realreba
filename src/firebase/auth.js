import { auth } from './firebase';

/**
 * Create user session
 * @param {string} action - createUser, signIn
 * @param {string} email
 * @param {string} password
 */
const userSession = (action, email, password) => auth[`${action}WithEmailAndPassword`](email, password);

/**
 * Destroy current user session
 */
const logout = () => auth.signOut();

/**
 * Facebook Login
 */
const facebookLogin = (provider) => auth.signInWithPopup(provider);

export {
    userSession,
    logout,
    facebookLogin
}