import { createContext, useState } from "react";

export const QueryContext = createContext("");

export const QueryContextProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  const [isQuery,setIsQuery] = useState(true)

  return (
    <QueryContext.Provider value={{ query, setQuery,isQuery,setIsQuery }}>
      {children}
    </QueryContext.Provider>
  );
};
