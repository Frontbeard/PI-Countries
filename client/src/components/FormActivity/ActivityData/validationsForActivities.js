export const validateName = (name) => {
  if (name.length > 0 && name.length < 35) return true;
  return false;
};

export const validateDifficulty = (number) => {
  if (number > 0 && number <= 10) return true;
  return false;
};

export const validateDuration = (duration) => {
  if (duration > 0 && duration <= 10) return true;
  return false;
};
