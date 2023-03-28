

const validator = {
    isValidEmail : (email) => {
    if (!email) {
      return false;
    }
    const atIndex = email.indexOf('@');
    if (atIndex === -1 || email.indexOf('@', atIndex + 1) !== -1) {
      return false; // not an email
    }
    const parts = email.split('@');
    if (parts[1].indexOf('.') === -1) {
      return false; // not an email
    }
    return true;
  },

  isNumber: (value) => {
    if (value == "") {
      return false; // not a number
    }
    // Check if value is a number using isNaN() function
    return !isNaN(value);
  },

  isValidPhoneNumber: (phoneNumber) => {
    if (!phoneNumber) {
      return false; // phone number is empty
    }
    // Remove any non-numeric characters from the phone number
    const strippedNumber = phoneNumber.replace(/\D/g, '');
    
    // Check if the stripped number has 10 digits
    if (strippedNumber.length !== 10) {
      return false; // phone number has an incorrect length
    }
    return true;
  },
};

export default validator;