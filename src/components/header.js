import React from "react";
import { Button,Navbar,NavbarBrand,NavbarText ,Nav } from 'reactstrap';
// import components

const Header = props => {

  const logout = () => {
    localStorage.clear();
    window.location.reload()
  }
  return (
    <Navbar color="dark" dark expand="sm">
        <NavbarBrand href="/">Auth</NavbarBrand>
        <Nav className="mr-auto " navbar></Nav>
        <div className="buttondiv">
        {
          props.userLoggedIn ? (
            props.role === 'admin' ? (
              <>
              <Button >RedButton</Button>
              <Button >GreenButton</Button>
              </>
            ):"")
          : (
            <>
            <Button href="/login">Login</Button>
            <Button href="/register">Register</Button>
            </>
          )
        }
        {
          props.userLoggedIn && props.role === "customer" ? (
            props.prem.green === true ? (
              <>
              <Button>GreenButton</Button>
              </>
            ): ""
          ):""
        }
        {
          props.userLoggedIn && props.role === "customer" ? (
            props.prem.red === true ? (
              <>
               <Button>RedButton</Button>
               </>
            ) : ""
          ):""
        }
        {
          props.userLoggedIn ? (
            <>
               <Button onClick={logout}>Logout</Button>
            </>
          ):""
        }
        </div>
      </Navbar>
  )
}

export default Header;