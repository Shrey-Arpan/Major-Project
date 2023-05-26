import React from "react";
import { Provider } from "react-redux";
import store from "./Components/store";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

function MainApp(){
    return (
    <Provider store={store}>
      <Router>
        <App />
        </Router>
        </Provider>
    )
}

export default MainApp;