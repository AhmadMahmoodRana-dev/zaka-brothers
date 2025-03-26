import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

  const [saleData, setSaleData] = useState([]);
  const [loader, setLoader] = useState(true);

  const getSale = async () => {
    try {
      const { data } = await axios.get(
        `https://zbl.zaffarsons.com/zbl/Sales?sdate=01-FEB-25&edate=25-FEB-25&company=1&branch=`
      );
      setSaleData(data);
      setLoader(false);
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    getSale();
  }, []);


  const contextValue = {
    isCollapsed,
    setIsCollapsed,
    user,
    getUser,
    saleData,
    loader,
    theme,
    toggleTheme
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
