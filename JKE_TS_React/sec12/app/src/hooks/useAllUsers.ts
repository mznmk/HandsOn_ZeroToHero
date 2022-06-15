/* eslint-disable react-hooks/exhaustive-deps */

import axios from "axios";
import { useCallback, useState } from "react";

import useMessage from "./useMessage";
import User from "../types/api/user";

const useAllUsers = () => {
  // [ state ]
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ users, setUsers ] = useState<User[]>([]);
  const { showMessage } = useMessage();

  // [ custom hook ]
  const getUsers = useCallback(
    () => {
      setLoading(true);
      axios
        .get<User[]>("https://jsonplaceholder.typicode.com/users")
        .then((res) => {
          setUsers(res.data);
        })
        .catch(() => {
          showMessage({
            title: "ユーザー取得に失敗しました",
            status: "error",
          });
        })
        .finally(() => {
          setLoading(false);
        });
    },
    []
  );

  // [ return ]
  return { getUsers, loading, users };
};

export default useAllUsers;