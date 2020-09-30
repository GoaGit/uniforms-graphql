import "regenerator-runtime/runtime";
import "./styling/index.less";

import { Route, Router } from "react-router-dom";

// import 'antd/dist/antd.css';
import { ApolloProvider } from "@apollo/client";
import EmailEditor from "./forms/components/email-editor";
import { Meteor } from "meteor/meteor";
import React from "react";
import apolloClient from "./apollo";
import { createBrowserHistory } from "history";
import { render } from "react-dom";

export const App = () => {
  const history = createBrowserHistory();
  return (
    <div id={"app"}>
      <ApolloProvider client={apolloClient}>
        <Router history={history}>
          <Route exact path="/">
            <EmailEditor />
          </Route>
        </Router>
      </ApolloProvider>
    </div>
  );
};

// mount app
const start = () => {
  render(<App />, document.getElementById("react-root"));
};

Meteor.startup(start);
