import jwt from "jsonwebtoken";

/**
 * Function to get the payload of jsonwebtoken
 * 
 * @param {*} token 
 * @returns 
 */
export const getPayloadFromToken = (token) => {
    const decodedToken = jwt.decode(token, {
        complete: true
    });

    if (!decodedToken) {
        throw new Parse.Error(Parse.Error.OBJECT_NOT_FOUND, `provided token does not decode as JWT`);
    }
    return decodedToken.payload;
}

/**
 * Function to get the username from jsonwebtoken
 * 
 * @param {*} token 
 */
export const getUserNameFromToken = (token) => {

    const tokenData = getPayloadFromToken(token);
    const userName = tokenData.first_name + ' ' + tokenData.last_name;
    return userName;
}