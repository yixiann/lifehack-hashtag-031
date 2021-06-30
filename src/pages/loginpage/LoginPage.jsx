import React, { useEffect, useState} from 'react'
import { Button } from 'antd';
import { Link, Redirect } from 'react-router-dom';

export const LoginPage = ({
  ...props
}) => {

  useEffect(() => {
    console.log("TEST Login")
  },[])

  // const [ login, setLogin ] = useState(false)

  return (
    <div className="Login">
      <p>Login</p>
      <Button>
        <Link to='/home'>
          Login
        </Link>
      </Button>
    </div>
  )
}

export default LoginPage
