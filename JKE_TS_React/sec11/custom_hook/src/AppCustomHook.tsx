import UserCard from "./components/UserCard";
import useAllUsers from "./hooks/useAllUsers";

const App = () => {
  // [ state ]
  const { getUsers, userProfiles, loading, error } = useAllUsers();
  
  // [ event ]
  const onClickFetchUser = () => {
    getUsers();
  };

  // [ return component ]
  return (
    <div className="App">
      <h1>Use costom hook</h1>
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
