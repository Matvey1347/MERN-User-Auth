import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ForgotPasswordFileds, GetTokenRes, ResetPasswordFileds, User, UserFileds, UserLoginFileds } from "../interfaces/Auth";
import { ResError, ResMessage } from "../interfaces/Types";
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios, { AxiosError } from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
const baseUrl = import.meta.env.VITE_BACK_URL;

interface AuthContextParams {
  user: User,
  authToken: string,
  registerMutation: UseMutationResult<GetTokenRes, AxiosError<ResMessage>, UserFileds>,
  loginMutation: UseMutationResult<GetTokenRes, AxiosError<ResMessage>, UserLoginFileds>,
  forgotPasswordMutation: UseMutationResult<ResMessage, AxiosError<ResMessage>, ForgotPasswordFileds>,
  resetPasswordMutation: UseMutationResult<ResMessage, AxiosError<ResMessage>, ResetPasswordFileds>,
  
  logout: () => void
}

export const AuthContext = createContext<AuthContextParams>({} as AuthContextParams);


const showError = (errorMessage: string) => {
  console.error("Error fetching data:", errorMessage);
  toast.error(errorMessage);
}

const showSuccess = (successMessage: string) => {
  console.log("Success fetching data:", successMessage);
  toast.success(successMessage);
}

const showErrorRes = (error: ResError) => {
  const cusMessage = error?.response?.data.message as string;
  const errorMessage = cusMessage ? cusMessage : error.message;
  console.error("Fetching data failed:", errorMessage);
  toast.error(errorMessage);
}

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const navigator = useNavigate();
  const [user, setUser] = useState<User>({} as User);
  const [authToken, setAuthToken] = useState<string>(localStorage.getItem("token") || "");

  const handleAuthSuccess = (data: GetTokenRes | User, isShowSuccess: boolean = true) => {
    let token = "";
    let user = {} as User;
    if ('token' in data) {
      token = data.token;
      user = data.user;
      setAuthToken(token);
      setUser(user);
      localStorage.setItem("token", token);
    } else {
      user = data;
      setUser(user);
    }

    if (isShowSuccess) showSuccess("Успешная авторизация");
    navigator('/profile');
  }

  const getUserData = async () => {
    if (!authToken) return;

    await axios.get(
      `${baseUrl}/api/user/`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }
    ).then((res) => {
      handleAuthSuccess(res.data, false);
    }).catch((error: ResError) => {
      logout();
      showError(error.message);
    })
  }

  useEffect(() => {
    getUserData();
  }, []);

  const registerMutation = useMutation<GetTokenRes, AxiosError<ResMessage>, UserFileds>({
    mutationFn: async (data: UserFileds) => (
      await axios.post(`${baseUrl}/api/auth/register`, data)
    ).data,
    onSuccess: (data: GetTokenRes) => {
      handleAuthSuccess(data);
    },
    onError: (error: ResError) => {
      showErrorRes(error);
    },
  });

  const loginMutation = useMutation<GetTokenRes, AxiosError<ResMessage>, UserLoginFileds>({
    mutationFn: async (data: UserLoginFileds) => (
      await axios.post(`${baseUrl}/api/auth/login`, data)
    ).data,
    onSuccess: (data: GetTokenRes) => {
      handleAuthSuccess(data);
    },
    onError: (error: ResError) => {
      showErrorRes(error);
    },
  });

  const logout = () => {
    setAuthToken("");
    setUser({} as User);
    localStorage.removeItem("token");
    navigator('/auth/login');
  }

  const forgotPasswordMutation = useMutation<ResMessage, AxiosError<ResMessage>, ForgotPasswordFileds>({
    mutationFn: async (data: ForgotPasswordFileds) => (
      await axios.post(`${baseUrl}/api/auth/forgot-password`, data)
    ).data,
    onSuccess: (data: ResMessage) => {
      showSuccess(data.message);
      navigator('/auth/check-email');
    },
    onError: (error: ResError) => {
      showErrorRes(error);
    }
  });

  const resetPasswordMutation = useMutation<ResMessage, AxiosError<ResMessage>, ResetPasswordFileds>({
    mutationFn: async (data: ResetPasswordFileds) => (
      await axios.patch(`${baseUrl}/api/auth/reset-password`, data)
    ).data,
    onSuccess: (data: ResMessage) => {
      showSuccess(data.message);
      navigator('/auth/login');
    },
    onError: (error: ResError) => {
      showErrorRes(error);
    }
  });


  return <AuthContext.Provider value={{
    user,
    authToken,

    registerMutation,
    loginMutation,
    forgotPasswordMutation,
    resetPasswordMutation,

    logout
  }}>
    {children}
  </AuthContext.Provider>;
}


export const useAuthContext = (): AuthContextParams => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};