export const validateName = (name) => {
  const regex = /^[a-zA-Z\s]+$/;
  return regex.test(name) && name.length > 0 && name.length < 35;
};

export const validateDifficulty = (number) => {
  if (number > 0 && number <= 10) return true;
  return false;
};

export const validateDuration = (duration) => {
  if (duration > 0 && duration <= 10) return true;
  return false;
};
