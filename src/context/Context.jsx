import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Context = createContext();

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) return savedTheme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const ContextProvider = (props) => {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("userData"))
  );
  const [theme, setTheme] = useState(getInitialTheme);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate(); // ⬅️ Add this

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  const getUser = () => {
    setUser(JSON.parse(localStorage.getItem("userData")));
  };

  const logout = () => {
    localStorage.removeItem("userData");
    setUser(null);
    navigate("/login"); // ⬅️ Instantly redirect to login
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem("userData")));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const contextValue = {
    isCollapsed,
    setIsCollapsed,
    user,
    setUser,
    getUser,
    logout,       // ⬅️ Add logout here
    theme,
    toggleTheme,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
