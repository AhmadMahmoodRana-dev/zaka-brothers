import { createContext, useEffect, useState } from "react";


export const Context = createContext();
const getInitialTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) return savedTheme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};
const ContextProvider = (props) => {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("userData"))
  );
  const [theme, setTheme] = useState(getInitialTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  const userLogout = () => {
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem("userData")));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  };
  
  const getUser = () => {
    setUser(JSON.parse(localStorage.getItem("userData")));
  };
  
  useEffect(() => {
    userLogout();
  }, []);
  
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // GET SALE DATA

 


  const contextValue = {
    isCollapsed,
    setIsCollapsed,
    user,
    getUser,
    theme,
    toggleTheme
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
