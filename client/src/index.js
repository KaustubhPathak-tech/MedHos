import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import Reducers from "./reducers";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const store = createStore(Reducers, compose(applyMiddleware(thunk)));
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <Auth0Provider
        domain="dev-5tyq2e855lx755p8.us.auth0.com"
        clientId="EDiiWpfe2lZmi71HdlECwpywHcs6lFuX"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
          <App />
      </Auth0Provider>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
