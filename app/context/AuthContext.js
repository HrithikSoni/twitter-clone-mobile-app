import React, { createContext, useState } from "react";
import * as SecureStore from "expo-secure-store";
import axiosConfig from "../helpers/axiosConfig";
import { set } from "date-fns";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        error,
        login: (email, password) => {
          setIsLoading(true);
          axiosConfig
            .post("/login", {
              email,
              password,
              device_name: "mobile",
            })
            .then((response) => {
              const userResponse = {
                token: response.data.token,
                id: response.data.user.id,
                name: response.data.user.name,
                username: response.data.user.username,
                avatar: response.data.user.avatar,
              };
              setUser(userResponse);
              SecureStore.setItemAsync("user", JSON.stringify(userResponse));
              setError(null), setIsLoading(false);
            })
            .catch((error) => {
              console.log(error.response);
              const key = Object.keys(error.response.data.errors)[0];
              setError(error.response.data.errors[key][0]);
              setIsLoading(false);
            });
        },
        logout: () => {
          setIsLoading(true);
          axiosConfig.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${user.token}`;
          axiosConfig
            .post("/logout")
            .then((response) => {
              setUser(null);
              SecureStore.deleteItemAsync("user");
              setError(null), setIsLoading(false);
            })
            .catch((err) => {
              console.log(err), setUser(null);
              SecureStore.deleteItemAsync("user");
              setError(err.response.data.message), setIsLoading(false);
            });
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
