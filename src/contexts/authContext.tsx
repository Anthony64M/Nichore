import Router from "next/router";
import { createContext, useEffect, useState } from "react";
import { parseCookies, setCookie, destroyCookie } from "nookies";

import { toast } from "react-toastify";
import { User } from "../server/entities/User";
import { api } from "../services/api";
import { ARTSY_ERROR } from "@errors";

interface SignInData {
  email: string;
  password: string;
}

interface RegisterData extends SignInData {
  name: string;
  username: string;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  token: string;
  user: User;
  register(createUserData: RegisterData): Promise<void>;
  signIn(loginData: SignInData): Promise<void>;
  signOut(): void;
  handleFollow(toFollowUserEmail: string,toFollowUserId: number): Promise<boolean>;
  handleError(e: any): void
}

export const toastConfig = {
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const AuthContext = createContext({} as AuthContextProps);

export function AuthContextProvider({ children }) {
  const [token, setToken] = useState('')
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'artsy.token': token } = parseCookies()

    if (token) {
      api.get("user", { headers: { authorization: token } }).then((response) => {
        setUser(response.data);
      });

      setToken(token)
    }
  }, [])

  async function register({ email, password, name, username }: RegisterData) {
    try {
      const {
        data: { user, token },
      } = await api.post("user", { email, name, username, password });

      setCookie(undefined, 'artsy.token', token, {
        maxAge: 86400000000000000, //muito muito tempo
        sameSite: 'strict',
        path: '/'
      })

      api.defaults.headers.authorization = token

      setUser(user);
      setToken(token);

      Router.push("/");

      toast("🚀 Bem-vindo ao Artsy!", {
        position: "top-right",
        autoClose: 5000,
        ...toastConfig,
      });
    } catch (e) {
      handleError(e)
    }
  }

  async function signIn({ email, password }: SignInData) {
    try {
      const {
        data: { user, token },
      } = await api.post("auth", { email, password });

      setCookie(undefined, 'artsy.token', token, {
        maxAge: 86400000000000000, //muito muito tempo
        sameSite: 'strict',
        path: '/'
      })

      api.defaults.headers.authorization = token

      setUser(user);
      setToken(token)

      Router.push("/");

      toast("🚀 Bem-vindo de volta ao Artsy!", {
        position: "top-right",
        autoClose: 5000,
        ...toastConfig,
      });

    } catch (e) {
      handleError(e)
    }
  }

  function signOut() {
    toast.dark("👋🏼 Obrigado por utilizar o Artsy!", {
      position: "top-right",
      autoClose: 1150,
      ...toastConfig,
    });

    destroyCookie(undefined, 'artsy.token', { path: '/' })
    setToken('')

    setTimeout(() => {
      Router.reload()
    }, 1250);
  }

  async function handleFollow(toFollowUserEmail: string, toFollowUserId: number) {
    if (isAuthenticated) {
      try {
        const response = await api.post(`/follow/${toFollowUserEmail}?id=${toFollowUserId}`)

        return response.data
      } catch (e) {
        handleError(e)
      }
    } else {
      toast.info("🔸 Faça login para seguir");
    }
  }

  const handleError = (e: any) => {
    // console.error(e);
    if (e.isAxiosError && e.response.data.isArtsyError) {
      let err = e.response.data as ARTSY_ERROR;

      toast.error(`${err.message} Código: ${err.code}`, {
        autoClose: 5000,
        position: "top-right",
        ...toastConfig
      });
    } else {
      toast.error(`Algo deu errado`, {
        autoClose: 5000,
        position: "top-right",
        ...toastConfig
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        register,
        signIn,
        signOut,
        handleFollow,
        handleError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
