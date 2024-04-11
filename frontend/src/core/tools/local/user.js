export const getLocalUser = () => {
  const localUser = localStorage.getItem("user");
  if (localUser) {
    return JSON.parse(localUser);
  }
  return null;
};

export const setLocalUser = (userObject) => {
  localStorage.setItem("user", JSON.stringify(userObject));
};

export const removeLocalUser = () => {
  localStorage.removeItem("user");
};
