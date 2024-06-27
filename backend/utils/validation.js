const validateEmail = (email) => {
    if(!email) return false;
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
};

const validateUsername = (username) => {
    return username && username.length <= 15;
};

function validatePassword (password) {
    if(password && password.length >= 8){
        const hasLetter = /[a-zA-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        if (hasLetter && hasNumber && hasSymbol) {
                return true;
            } else {
                return false;
            }
    }
    return false;
};

const validateName = (name) => {
    return name && name.length <= 25;
};

const validatePicture = (picture) => {
    return picture && picture.trim().length > 0;
};

function validateInput(input){
    const { username, name, email, password, picture } = input;

     if (!validateUsername(username)) {
        return { isValid: false, message: 'Invalid Username' };
    }
    if (!validateEmail(email)) {
        return { isValid: false, message: 'Invalid Email Address' };
    }
    if (!validatePassword(password)) {
        return { isValid: false, message: 'Invalid Password'};
    }
    if (!validateName(name)) {
        return { isValid: false, message: 'Invalid Name' };
    }
    if (!validatePicture(picture)) {
        return { isValid: false, message: 'Picture should not be empty.' };
    }
    
    return { isValid: true, message: 'All inputs are valid.' };
}

module.exports = {
    validateInput,
    validatePassword
}
