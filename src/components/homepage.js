import React from "react";
import { Button,Navbar,NavbarBrand,NavbarText ,Nav,TabContent, TabPane, NavLink, Card, CardTitle, CardText, Row, Col } from 'reactstrap';
// import components

import UserList from "./userlist";

const Homepage = props => {
  return (
    props.userLoggedIn ? (
      props.role === 'admin' ? <UserList /> : ""
    ) : "Welcome"
  )
}

export default Homepage;