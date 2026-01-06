// Mock authentication service using local storage
export const login = async (data: { email: string; password: string }) => {
  // Mock login - accept any email/password combination
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          token: "mock-token-" + Date.now(),
          user: {
            email: data.email,
            name: "User",
          },
        },
      });
    }, 500);
  });
};

export const logout = async () => {
  // Mock logout
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: { success: true } });
    }, 300);
  });
};
