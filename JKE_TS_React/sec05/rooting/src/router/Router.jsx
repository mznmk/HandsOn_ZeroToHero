import { Switch, Route } from "react-router-dom";

import Home from "../Home";
import page1Routes from "./Page1Routes";
import page2Routes from "./Page2Routes";
import Page404 from "../Page404";

const Router = () => {
  // [ return component ]
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route
        path="/page1" 
        render={({ match: { url } }) => (
          <Switch>
            {page1Routes.map((route) => (
              <Route
                key={route.path}
                exact={route.exact}
                path={`${url}${route.path}`}
              >
                {route.children}
              </Route>
            ))}
          </Switch>
        )}
      />  
      <Route
        path="/page2"
        render={({ match: { url }}) => (
          <Switch>
            {page2Routes.map((route) => (
              <Route
                key={route.path}
                exact={route.exact}
                path={`${url}${route.path}`}
              >
                {route.children}
              </Route>
            ))}
          </Switch>
        )}
      />
      <Route path="*">
        <Page404 />
      </Route>
    </Switch>
  );
};

export default Router;