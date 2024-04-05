import { environment } from '../../environments/environment';
import { ApiEndpoints } from './api-endpoints';


const signUpUrl = environment.apiURL + ApiEndpoints.signup; 
const loginUrl = environment.apiURL + ApiEndpoints.login;
const getOTPUrl = environment.apiURL + ApiEndpoints.getOTP;
const resetPasswordUrl = environment.apiURL + ApiEndpoints.resetPassword;
const verifyEMAIL = environment.apiURL + ApiEndpoints.verifyEMAIL;
const verifyOTP = environment.apiURL + ApiEndpoints.verifyOTP;
const getRoomsUrl  = environment.apiURL + ApiEndpoints.getrooms;
const getMessagesUrl = environment.apiURL + ApiEndpoints.getmessages;

export {
    signUpUrl,
    loginUrl,
    verifyOTP,
    verifyEMAIL,
    getRoomsUrl,
    getMessagesUrl,
    getOTPUrl,
    resetPasswordUrl
};
