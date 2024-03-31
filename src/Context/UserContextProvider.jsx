import { useState } from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({ children }) => {
  const [allUsers, setAllUsers] = useState(
    JSON.parse(localStorage.getItem("allUsers")) || []
  );
  return (
    <UserContext.Provider value={{ allUsers, setAllUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
