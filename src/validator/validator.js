const nameRegex = /^[ a-z ]+$/i
const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/

const isValid = function (value) {
    if(!value) return false
    if (typeof value !== "string")   return false
    if (typeof value === 'string' && value.trim().length === 0) return false        
    return true;
};

const isValidbody = function (requestBody) {
    return Object.keys(requestBody).length > 0;
};

module.exports = {
    nameRegex, emailRegex, isValid, isValidbody
}