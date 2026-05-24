import api from "./api";

// ---------- TYPES ----------
export interface AuthResponse {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  token?: string;
}

// ---------- LOGIN ----------
export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  // api.post already returns parsed JSON
  return await api.post<AuthResponse>("/auth/login", {
    email,
    password,
  });
};

// ---------- REGISTER ----------
export const register = async (
  name: string,
  email: string,
  password: string,
  role: string
): Promise<AuthResponse> => {
  return await api.post<AuthResponse>("/auth/register", {
    name,
    email,
    password,
    role,
  });
};
