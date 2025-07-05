import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// API Configuration
export const API_BASE_URL = '/api';

// Types for API responses
export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      _id: string;
      userId: string;
      firstName: string;
      lastName: string;
      phoneNumber: string;
      email: string;
      role: string;
      profileComplete: boolean;
    };
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
  };
}

// Cookie management
export const setCookie = (name: string, value: string, days: number) => {
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${value}; path=/; max-age=${maxAge}`;
};

export const getCookie = (name: string): string | null => {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=').map(c => c.trim());
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null;
};

export const removeCookie = (name: string) => {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
};

// Local storage keys
export const STORAGE_KEYS = {
  USER_DATA: 'userData',
  TOKENS: 'tokens'
};

// Store auth data in localStorage and cookies
export const storeAuthData = (data: LoginResponse['data']) => {
  localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(data.user));
  localStorage.setItem(STORAGE_KEYS.TOKENS, JSON.stringify(data.tokens));
  setCookie('accessToken', data.tokens.accessToken, 7); // Store access token in cookie for 7 days
};

// Get stored auth data
export const getStoredAuthData = () => {
  const user = localStorage.getItem(STORAGE_KEYS.USER_DATA);
  const tokens = localStorage.getItem(STORAGE_KEYS.TOKENS);
  return {
    user: user ? JSON.parse(user) : null,
    tokens: tokens ? JSON.parse(tokens) : null
  };
};

// Clear auth data from localStorage and cookies
export const clearAuthData = () => {
  localStorage.removeItem(STORAGE_KEYS.USER_DATA);
  localStorage.removeItem(STORAGE_KEYS.TOKENS);
  removeCookie('accessToken');
};
