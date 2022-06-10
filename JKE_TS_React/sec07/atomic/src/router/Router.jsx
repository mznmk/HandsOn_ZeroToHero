import { BrowserRouter, Route, Switch } from "react-router-dom";
import DefaultLayout from "../components/templates/DefaultLayout";
import HeaderOnly from "../components/templates/HeaderOnly"
import Top from "../components/pages/Top";
import Users from "../components/pages/Users";

const Router = () => {
  // [ return component ]
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <DefaultLayout>
            <Top />
          </DefaultLayout>
        </Route>
        <Route path="/users">
          <HeaderOnly>
            <Users />
          </HeaderOnly>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;