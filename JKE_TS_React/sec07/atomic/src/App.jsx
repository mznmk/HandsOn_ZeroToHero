// import { UserProvider } from "./providers/UserProvider";
import { RecoilRoot } from "recoil";
import Router from "./router/Router";
import "./styles.css";

const App = () => {
  // [ return component ]
  return (
    <>
      <RecoilRoot>
        <Router /> 
      </RecoilRoot>
      {/* <UserProvider>
        <Router />
      </UserProvider> */}
    </>
  );
};

export default App;