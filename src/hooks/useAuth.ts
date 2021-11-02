import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

export function useAuth() {
  const auth = useContext(AuthContext);

  const errorWrapper = async <T extends unknown>(func: () => Promise<T>): Promise<T> => {
    try {
      const response = await func();

      return response;

    } catch(e) {
      auth.handleError(e)
    }
  };

  return { ...auth, errorWrapper };
}
