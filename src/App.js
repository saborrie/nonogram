import React from "react";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";

import { AppWrapper } from "./components";
import Design from "./pages/Design";
import Play from "./pages/Play";
import Play2 from "./pages/Play2";

function App() {
  return (
    <AppWrapper>
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Design} />
          <Route exact path="/play" component={Play} />
          <Route exact path="/play2" component={Play2} />
          <Redirect from="*" to="/" />
        </Switch>
      </HashRouter>
    </AppWrapper>
  );
}

export default App;
