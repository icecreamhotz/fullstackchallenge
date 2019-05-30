import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import Header from "./components/HeaderComponent.jsx";
import Locker from "./components/LockerComponent.jsx";

function App() {
  return (
    <Router>
      <Header />
      <Route path="/locker" component={Locker} />
    </Router>
  );
}

export default App;
