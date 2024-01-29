const validatePhoneNumber = (value: string): boolean => {
  // Regular expression for validating phone numbers
  const phoneNumberRegex = /^(?:\+94|0)\d{9}$/;

  if (!value) {
    return true;
  }

  // Check if the value matches the regex
  return phoneNumberRegex.test(value);
};

export default validatePhoneNumber;
