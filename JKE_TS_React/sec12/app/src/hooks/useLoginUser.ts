import {
  useContext
} from "react";
import {
  LoginUserContext,
  LoginUserContextType
} from "../providers/LoginUserProvider";

const useLoginUser = () => useContext<LoginUserContextType>(LoginUserContext);

export default useLoginUser;