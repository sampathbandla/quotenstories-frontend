import React, { useState, useEffect } from 'react';
import { Switch, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";

// component
import Header from "./components/header";
import Homepage from "./components/homepage";
import Login from "./components/login";
import Register from "./components/register";
// import Homepage from "./components/homepage";

import './App.css';

const App = () => {
  const [user, setUser] = useState({
    email: "",
      role: "",
      userLoggedIn: false,
      greenPrem: false,
      redPrem: false
  });

  useEffect(() => {
    var localUser = JSON.parse(localStorage.getItem("user"));
    if (localUser) {
      if (localUser.token) {
        setUser({
          email: localUser.email,
          role: localUser.role,
          userLoggedIn: true,
          greenPrem: localUser.greenButton,
          redPrem: localUser.redButton
        });
      }
    }
  }, [])

 return (
    <div>
      <Header userLoggedIn={user.userLoggedIn} role={user.role} prem={{
        green: user.greenPrem,
        red: user.redPrem
      }} />
      <Switch>
        <Route exact path="/" component={() => <Homepage userLoggedIn={user.userLoggedIn} role={user.role} />}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>
      </Switch>
    </div>
  )
};

export default App;
