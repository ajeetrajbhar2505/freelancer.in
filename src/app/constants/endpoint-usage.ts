import { environment } from '../../environments/environment';
import { ApiEndpoints } from './api-endpoints';


const signUpUrl = environment.apiURL + ApiEndpoints.signup; 
const loginUrl = environment.apiURL + ApiEndpoints.login;
const getOTPUrl = environment.apiURL + ApiEndpoints.getOTP;
const resetPasswordUrl = environment.apiURL + ApiEndpoints.resetPassword;
const verifyEMAIL = environment.apiURL + ApiEndpoints.verifyEMAIL;
const verifyOTP = environment.apiURL + ApiEndpoints.verifyOTP;
const createRoomUrl  = environment.apiURL + ApiEndpoints.createRoom;
const getUsersUrl  = environment.apiURL + ApiEndpoints.getUsers;
const getRoomUsersUrl  = environment.apiURL + ApiEndpoints.getRoomUsers;
const getMessagesUrl = environment.apiURL + ApiEndpoints.getmessages;
const createTokenUrl = environment.apiURL + ApiEndpoints.createToken;
const decodedTokenUrl = environment.apiURL + ApiEndpoints.decodedToken;
const getRecieverDetailsUrl = environment.apiURL + ApiEndpoints.getRecieverDetails;
const createMessageUrl = environment.apiURL + ApiEndpoints.createMessage;

export {
    signUpUrl,
    loginUrl,
    verifyOTP,
    verifyEMAIL,
    createRoomUrl,
    getMessagesUrl,
    getOTPUrl,
    resetPasswordUrl,
    getUsersUrl,
    createTokenUrl,
    decodedTokenUrl,
    getRoomUsersUrl,
    getRecieverDetailsUrl,
    createMessageUrl
};
