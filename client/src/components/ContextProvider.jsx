import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const MyContext = createContext({});

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!user) {
      const { data } = axios.get("/profile").then(({ data }) => {
        setUser(data);
        setReady(true);
      });
    }
  }, []);

  return (
    <MyContext.Provider value={{ user, setUser, ready }}>
      {children}
    </MyContext.Provider>
  );
};

export default ContextProvider;
