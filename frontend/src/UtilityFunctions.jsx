export const getUser = () => {
  const token = localStorage.getItem("token");
  console.log(`Token is : ${token}`);
  if (!token) return null;

  try {
    const tokenParts = token.split(".");
    if (tokenParts.length !== 3) return null;

    const payload = JSON.parse(atob(tokenParts[1]));

    // // Check if the token has expired
    // const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    // if (payload.exp && payload.exp < currentTime) {
    //   // Token has expired
    //   localStorage.removeItem("token"); // Remove the expired token
    //   return null;
    // }

    return {
      id: payload.userId,
      name: payload.userName,
      email: payload.email,
      exp: payload.exp,
    };
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export const isAuthenticated = () => {
  const user = getUser();
  return user !== null;
};

export const logout = () => {
  localStorage.removeItem("token");
};

// New function to check if token is close to expiring
export const isTokenExpiringSoon = (thresholdMinutes = 5) => {
  const user = getUser();
  if (!user || !user.exp) return false;

  const currentTime = Math.floor(Date.now() / 1000);
  const timeUntilExpiry = user.exp - currentTime;

  return timeUntilExpiry < thresholdMinutes * 60;
};
