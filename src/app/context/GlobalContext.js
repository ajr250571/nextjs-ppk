"use client";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
// import { useLocalStorage } from "../hooks/useLocalStorage";

const GlobalContext = createContext();

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) throw new Error("useTasks no se puede usar con GlobalProvider");
  return context;
};

export const GlobalProvider = ({ children }) => {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    username: "",
  });

  const isLogged = () => {
    if (!user.email) {
      router.push("/login");
    }
  };

  const getProfile = async () => {
    const profile = await axios.get("/api/profile");
    setUser(profile.data);
  };

  const logout = async () => {
    try {
      const res = await axios.get("/api/auth/logout");
      setUser({
        email: "",
        username: "",
      });
    } catch (error) {
      console.error(error.message);
    }
    router.push("/login");
  };

  return (
    <GlobalContext.Provider
      value={{
        user,
        getProfile,
        logout,
        isLogged,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
