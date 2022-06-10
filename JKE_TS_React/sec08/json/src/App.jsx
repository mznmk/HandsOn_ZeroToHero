import axios from "axios";

function App() {
  // [ event ]
  const onClickUsers = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        console.log(res.data);
      }).catch((err) => {
        console.log(err);
      });
  };
  const onClickUser1 = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/users?id=1")
      .then((res) => {
        console.log(res.data);
      }).catch((err) => {
        console.log(err);
      });
  };

  // [ return component ]
  return (
    <div className="App">
      <button onClick={onClickUsers}>users</button>
      <button onClick={onClickUser1}>user1</button>
    </div>
  );
}

export default App;
