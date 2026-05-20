import React, {
  useState,
  useContext,
  createContext,
  ReactNode,
  useEffect
} from 'react';

import AsyncStorage
from '@react-native-async-storage/async-storage';

import { User } from '../constants/types';

import { apiService } from '../services/api';

import { wsService } from '../services/websocket';

// =========================
// TYPES
// =========================
interface AuthContextType {

  user: User | null;

  isAuthenticated: boolean;

  isLoading: boolean;

  login: (
    email: string,
    password: string
  ) => Promise<boolean>;

  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<boolean>;

  logout: () => Promise<void>;
}

// =========================
// CONTEXT
// =========================
const AuthContext =
  createContext<AuthContextType | undefined>(
    undefined
  );

// =========================
// PROVIDER
// =========================
export function AuthProvider({
  children
}: {
  children: ReactNode
}) {

  const [user, setUser] =
    useState<User | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  // =========================
  // INIT AUTH
  // =========================
  useEffect(() => {

    checkAuthStatus();

  }, []);

  // =========================
  // CHECK AUTH
  // =========================
  const checkAuthStatus = async () => {

    try {

      const response =
        await apiService.getProfile();

      if (response?.user) {

        console.log(
          '✅ User authenticated:',
          response.user.username
        );

        setUser(response.user);

        // conecta websocket
        await wsService.connect();

      } else {

        console.log(
          '❌ No authenticated user'
        );
      }

    } catch (error) {

      console.log(
        '❌ Not authenticated'
      );

    } finally {

      setIsLoading(false);
    }
  };

  // =========================
  // LOGIN
  // =========================
  const login = async (
    email: string,
    password: string
  ): Promise<boolean> => {

    try {

      const response =
        await apiService.login(
          email,
          password
        );

      if (!response?.user) {

        return false;
      }

      // =========================
      // SAVE TOKEN
      // =========================
      if (response?.token) {

        await AsyncStorage.setItem(
          'authToken',
          response.token
        );

        console.log(
          '💾 Token saved'
        );
      }

      console.log(
        '✅ Login success:',
        response.user.username
      );

      setUser(response.user);

      // conecta websocket
      await wsService.connect();

      return true;

    } catch (error) {

      console.error(
        '❌ Login error:',
        error
      );

      return false;
    }
  };

  // =========================
  // REGISTER
  // =========================
  const register = async (
    username: string,
    email: string,
    password: string
  ): Promise<boolean> => {

    try {

      const response =
        await apiService.register(
          username,
          email,
          password
        );

      if (!response?.user) {

        return false;
      }

      // =========================
      // SAVE TOKEN
      // =========================
      if (response?.token) {

        await AsyncStorage.setItem(
          'authToken',
          response.token
        );

        console.log(
          '💾 Token saved'
        );
      }

      console.log(
        '✅ Register success:',
        response.user.username
      );

      setUser(response.user);

      // conecta websocket
      await wsService.connect();

      return true;

    } catch (error) {

      console.error(
        '❌ Register error:',
        error
      );

      return false;
    }
  };

  // =========================
  // LOGOUT
  // =========================
  const logout = async () => {

    try {

      await apiService.logout();

      // remove token
      await AsyncStorage.removeItem(
        'authToken'
      );

      wsService.disconnect();

      setUser(null);

      console.log(
        '👋 User logged out'
      );

    } catch (error) {

      console.error(
        '❌ Logout error:',
        error
      );
    }
  };

  // =========================
  // CONTEXT VALUE
  // =========================
  const value = {

    user,

    isAuthenticated: !!user,

    isLoading,

    login,

    register,

    logout
  };

  return (

    <AuthContext.Provider value={value}>

      {children}

    </AuthContext.Provider>
  );
}

// =========================
// HOOK
// =========================
export function useAuth() {

  const context =
    useContext(AuthContext);

  if (context === undefined) {

    throw new Error(
      'useAuth must be used within an AuthProvider'
    );
  }

  return context;
}