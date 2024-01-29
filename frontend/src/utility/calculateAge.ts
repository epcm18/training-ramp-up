const calculateAge = (dob: Date): number | null => {
  if (!dob) {
    return 0;
  }

  const today = new Date();
  const birthDate = new Date(dob);
  const age = today.getFullYear() - birthDate.getFullYear();

  return age;
};

export default calculateAge;
