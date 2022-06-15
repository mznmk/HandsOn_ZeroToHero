import { FC, memo } from "react";
import { Route, Switch } from "react-router-dom";

import { LoginUserProvider } from "../providers/LoginUserProvider";
import Login from "../components/pages/Login";
import Page404 from "../components/pages/Page404";
import HeaderLayout from "../components/templates/HeaderLayout";
import HomeRoutes from "./HomeRoutes";

const Router: FC = memo(() => {
  // [ return component ]
  return (
    <>
      <Switch>
        <LoginUserProvider>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/home" render={({ match: { url }}) => (
            <Switch>
              {HomeRoutes.map((route) => (
                <Route
                  key={route.path} 
                  exact={route.exact}
                  path={`${url}${route.path}`}
                >
                  <HeaderLayout>
                    {route.children}
                  </HeaderLayout>
                </Route>
              ))}
            </Switch>
          )}>
          </Route>
        </LoginUserProvider>
        <Route path="*">
          <Page404 />
        </Route>
      </Switch>
    </>
  );
});

export default Router;