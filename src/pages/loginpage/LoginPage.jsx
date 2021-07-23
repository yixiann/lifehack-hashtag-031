import React, { useContext, useState, useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { Form, Input, Select } from 'antd';
import axios from 'axios';
import URI, { convertToFormData } from '../../constants/URL';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { errorModal } from '../../components/UI/submissionModal'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    // backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundImage: 'url(https://cdn.pixabay.com/photo/2017/08/06/22/01/books-2596809_960_720.jpg)',
    // backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    fontSize: 16
  },
  resize:{
    fontSize: 20
  },
  link: {
    fontSize: 12
  }
}));

const LoginPage = ({
    authContext,
    ...props
  }) => {

  const classes = useStyles('dark');

  const useAuth = () => {
    return useContext(authContext);
  }

  var history = useHistory();
  var location = useLocation();
  var auth = useAuth();

  const { Option } = Select
  
  const [form] = Form.useForm()

  const [ incorrect, setIncorrect ] = useState(false)

  const [ token, setToken ] = useState("")

  const [ checkToken, setCheckToken ] = useState(false)

  const signInAxios = (values) => {
    var tokenData = axios
      .post(URI.signIn, convertToFormData(values))
      .then((res)=>{
        return res.data.token
      }).catch((err) => {
        errorModal("Incorrect username or password")
        console.log("ERROR", err)
      });
    return tokenData
  }

  async function login(){
    var { from } = location.state || { from: { pathname: `/${window.localStorage.getItem('role')}/dashboard` } };
    var values = form.getFieldsValue()
    console.log("VA", values)
    if(values){
      var token = await signInAxios(values)
      if(token){
        auth.signin(() => {
          history.replace(from);
          return {
            username: values.username,
            token
          }
        })
      } else {
        setIncorrect(true)
      }
    }
    window.localStorage.setItem('username', values.username)
    window.localStorage.setItem('token', token);
  };

  // If there is a token stored in local storage, use token to get new token
  useEffect(()=>{
    var token = window.localStorage.getItem('token')
    if(!!token){
      const headers = {'Content-Type': 'application/json',}
      axios
      .post(URI.signInRefresh, {token}, {headers})
      .then((res)=>{
        setToken(res?.data?.token)
        window.localStorage.setItem('token', res?.data?.token);
      }).catch((err) => {
        console.log("ERROR", err)
        setCheckToken(true)
      });
    } else {
      setCheckToken(true)
    }
  },[])

  // If there is a token, sign in
  useEffect(()=>{
    var { from } = location.state || { from: { pathname: "/home" } };
    if(token){
      auth.signin(() => {
        history.replace(from);
        return {
          username: window.localStorage.getItem('username'),
          token
        }
      })
    }
  },[token])

  return (
    <>
      { checkToken &&
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h4">
                Sign in
              </Typography>
              <Form
                form={form}
                name="login"
                className={classes.form}
              >
                <Form.Item
                  name="username"
                  rules={[{required: true, message: 'Please input your Username!' }]}
                >
                  <Input
                    placeHolder={'Username'}
                    size={'large'}
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{required: true, message: 'Please input your Password!' }]}
                >
                  <Input.Password
                    placeHolder={'Password'}
                    size={'large'}
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />
                </Form.Item>
                <Form.Item
                  name="role"
                  rules={[{required: true, message: 'Please select a Role!' }]}
                >
                  <Select
                    onSelect={(e)=>(window.localStorage.setItem('role',e))}
                    placeholder="Select a role"
                    size='large'
                  >
                    <Option value={"student"}>Student</Option>
                    <Option value={"teacher"}>Teacher</Option>
                  </Select>
                </Form.Item>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={()=>(form.validateFields().then(()=>(login())))}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item>
                    <Link href="/createuser" variant="body2" className={classes.link}>
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            </div>
          </Grid>
        </Grid>
      }
    </>
  );
}

export default LoginPage;