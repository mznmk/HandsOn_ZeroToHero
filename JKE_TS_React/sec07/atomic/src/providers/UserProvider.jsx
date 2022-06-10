import { createContext, useState } from "react";

export const UserContext = createContext({});

export const UserProvider = (props) => {
  // [ props ]
  const { children } = props;
  
  // [ context ]
  const [userInfo, setUserInfo] = useState(null);

  // [ return cmmponent ]
  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};