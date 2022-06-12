import { useState } from "react";
import axios from "axios";
import { UserProfile } from "../types/userProfile";
import { User } from "../types/api/user";

const useAllUsers = () => {
  // [ state ]
  const [ userProfiles, setUserProfiles ] = useState<UserProfile[]>([]);
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ error, setError ] = useState(false);

  const getUsers = () => {
    setError(false);
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const data = res.data.map((user) => ({
          id: user.id,
          name: `${user.name}(${user.username})`,
          email: user.email,
          address: `${user.address.city}${user.address.suite}${user.address.street}`,
        }));
        setUserProfiles(data);
      }).catch(() => {
        setError(true);
      }).finally(() => {
        setLoading(false);
      });
  };

  return { getUsers, userProfiles, loading, error };
};

export default useAllUsers;