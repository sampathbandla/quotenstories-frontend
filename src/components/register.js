import React,{ useState } from "react";
import { Button,Form,FormGroup,Label,Input } from 'reactstrap';
import {useHistory } from "react-router-dom";
const axios = require('axios');
var validator = require("email-validator");

const Register = () => {
  let history = useHistory();

  const [user, setUser] = useState({
    email: "",
    password: "",
    role: "admin",
  });
  
  const registerOnClick = () => {
    if(user.email == "" || user.password  == "")
    {
      alert("Please enter email and password!")
      return;
    }
    if(!validator.validate(user.email))
    {
      alert("Please enter correct email!")
      return;
    }
    let data = {}
    axios({
      method: 'post',
      url: 'https://quotenstories.herokuapp.com/user/register',
      data: {
        email: user.email,
        password: user.password,
        role: user.role,
      }
    }).then(response => {
      data = {
        token: response.data.token,
        ...response.data.USER
      }
      
    }).then(() => {

      axios({
        method: 'post',
        url: 'https://quotenstories.herokuapp.com/user/getLoggedUserPermissions',
        data: {
          userId:data._id
        }
      }).then(response => {
        // console.log(response);
        data = {
          ...data,
          greenButton: response.data.USER.greenButton,
          redButton: response.data.USER.redButton
        }
        localStorage.setItem("user", JSON.stringify(data));
        history.push("/");
        history.go();
      })

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

  const roleInputHandler = e => {
    console.log(e.target.value)
    setUser({
      ...user,
      role: e.target.value
    })
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
            <FormGroup>
                <Label for="Role">Role</Label>
                <Input onChange={roleInputHandler} type="select" name="Role" id="Role">
                    <option value="admin">Admin</option>
                    <option value="customer">Customer</option>
                </Input>
            </FormGroup>
            <Button onClick={registerOnClick}>Register</Button>
        </Form>
    </>
  )
}

export default Register;