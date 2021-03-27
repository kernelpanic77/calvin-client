import React, { createContext, useState } from "react";

export const authContext = createContext();

export const AuthContextProvider = (props) => {
  const [auth, setAuth] = useState(false);

  return (
    <authContext.Provider value={{ auth, setAuth }}>
      {props.children}
    </authContext.Provider>
  );
};
