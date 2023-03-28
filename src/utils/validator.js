

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
    // Check if value is null, undefined, or an empty string
    if (value === null || value === undefined || value === "") {
      return false;
    }
    // Convert value to a number and check if it is NaN
    const numValue = Number(value);
    return !isNaN(numValue);
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