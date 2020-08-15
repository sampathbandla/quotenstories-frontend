import React, { useState } from "react";
import { Button,Form,FormGroup,Label,Input } from 'reactstrap';
import {useHistory } from "react-router-dom";
const axios = require('axios');

const Login = () => {
  let history = useHistory();
  const [user, setUser] = useState({
    email: "",
    password: ""
  })
  
  const loginOnClick = () => {
    let data = {};
    axios({
      method: 'post',
      url: 'https://quotenstories.herokuapp.com/user/login',
      data: {
        email: user.email,
        password: user.password
      }
    }).then(response => {
      if(response.data.ERROR)
      {
        alert("Wrong Password!")
        data.error = true;
        return;
      }
      else
      {
        data = {
          token: response.data.token,
          ...response.data.USER
        }
      }
        
    }).then(() => {
     
      if(data.error)
      {
        return;
      }
      if(data.role == "admin")
      {
        localStorage.setItem("user", JSON.stringify(data));
        history.push("/");
        history.go();
      }
      else
      {
        axios({
          method: 'post',
          url: 'https://quotenstories.herokuapp.com/user/getLoggedUserPermissions',
          data: {
            userId:data._id
          }
        }).then(response => {
          data = {
            ...data,
            greenButton: response.data.USER.greenButton,
            redButton: response.data.USER.redButton
          }
          localStorage.setItem("user", JSON.stringify(data));
          history.push("/");
          history.go();
        })
      }

      
    }).catch(error => {
      console.log(error);
    });
  }

  const emailInputHandler = e => {
    setUser({
      ...user,
      email: e.target.value
    });
  }

  const passwordInputHandler = e => {
    setUser({
      ...user,
      password: e.target.value
    });
  }

  return (
    <>
        <Form className="loginForm">
            <FormGroup>
                <Label for="Email">Email</Label>
                <Input onChange={emailInputHandler}  type="email" name="email" id="Email" placeholder="Email..." />
            </FormGroup>
            <FormGroup>
                <Label for="Password">Email</Label>
                <Input  onChange={passwordInputHandler} type="password" name="password" id="Password" placeholder="Password..." />
            </FormGroup>
            <Button onClick={loginOnClick}>Login</Button>
        </Form>
    </>
  )
}

export default Login;