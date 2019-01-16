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

const reset = (email) => auth.sendPasswordResetEmail(email);

/**
 * Social Login
 */
const socialLoginRedirect = (provider) => auth.signInWithRedirect(provider);

const socialLoginPopup = (provider) => auth.signInWithPopup(provider);

export {
    userSession,
    logout,
    socialLoginRedirect,
    socialLoginPopup,
    reset,
}