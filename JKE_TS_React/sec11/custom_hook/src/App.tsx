import { useState } from "react";
import axios from "axios";
import UserCard from "./components/UserCard";
import { User } from "./types/api/user";
import { UserProfile } from "./types/userProfile";

const App = () => {
  // [ state ]
  const [ userProfiles, setUserProfiles ] = useState<UserProfile[]>([]);
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(false);
  
  // [ event ]
  const onClickFetchUser = () => {
    setLoading(true);
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

  // [ return component ]
  return (
    <div className="App">
      <h1>Not Use Custom Hook</h1>
      <button onClick={onClickFetchUser}>データ取得</button>
      {error ? (
        <p style={{ color: "red" }}>データ取得失敗...</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {userProfiles.map((user) => (
            <UserCard key={user.id} user={user}/>
          ))}
        </>
      )}
    </div>
  );
}

export default App;
