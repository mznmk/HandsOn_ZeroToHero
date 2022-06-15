import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import useLoginUser from "./useLoginUser";
import useMessage from "./useMessage";
import User from "../types/api/user";

const useAuth = () => {
  // [ state ]
  const history = useHistory();
  const { setLoginUser } = useLoginUser();
  const [ loading, setLoading ] = useState<boolean>(false);
  const { showMessage } = useMessage();

  // [ custom hook ]
  const login = useCallback(
    (id: string) => {
      setLoading(true);

      axios
        .get<User>(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((res) => {
          if (res.data) {
            // set login user data
            const isAdmin = res.data.id === 10 ? true : false;
            setLoginUser( { ...res.data, isAdmin } );
            // login success
            showMessage({
              title: "ログインしました",
              status: "success",
            })
            history.push("/home");
          } else {
            // login failure
            showMessage({
              title: "ユーザーが見つかりません",
              status: "error",
            });
          }
        })
        .catch(() => {
          // login error
          showMessage({
            title: "ログインできません",
            status: "error",
          });
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [history, showMessage, setLoginUser]
  );

  // [ return ]
  return { login, loading };
};

export default useAuth;