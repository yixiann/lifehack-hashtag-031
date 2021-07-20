// import React, { useContext, useState, useEffect } from 'react';
// import { useHistory, useLocation } from "react-router-dom";
// import { Button, Row, Col, Form, Input } from 'antd';
// import { UserOutlined, LockOutlined } from '@ant-design/icons';
// import axios from 'axios';
// import URI, { convertToFormData } from '../../constants/URL'

// export const LoginPage = ({
//   authContext,
//   ...props
// }) => {

//   const useAuth = () => {
//     return useContext(authContext);
//   }

//   var history = useHistory();
//   var location = useLocation();
//   var auth = useAuth();
  
//   const [form] = Form.useForm()

//   const [ incorrect, setIncorrect ] = useState(false)

//   const [ token, setToken ] = useState("")

//   const [ checkToken, setCheckToken ] = useState(false)

//   const signInAxios = (values) => {
//     var tokenData = axios
//       .post(URI.signIn, convertToFormData(values))
//       .then((res)=>{
//         return res.data.token
//       }).catch((err) => {
//         console.log("ERROR", err)
//       });
//     return tokenData
//   }

//   async function login(){
//     var { from } = location.state || { from: { pathname: "/home" } };
//     var values = form.getFieldsValue()
//     if(values){
//       var token = await signInAxios(values)
//       if(token){
//         auth.signin(() => {
//           history.replace(from);
//           return {
//             username: values.username,
//             token
//           }
//         })
//       } else {
//         setIncorrect(true)
//       }
//     }
//     window.localStorage.setItem('username', values.username)
//     window.localStorage.setItem('token', token);
//   };

//   // If there is a token stored in local storage, use token to get new token
//   useEffect(()=>{
//     var token = window.localStorage.getItem('token')
//     if(!!token){
//       const headers = {'Content-Type': 'application/json',}
//       axios
//       .post(URI.signInRefresh, {token}, {headers})
//       .then((res)=>{
//         setToken(res?.data?.token)
//         window.localStorage.setItem('token', res?.data?.token);
//       }).catch((err) => {
//         console.log("ERROR", err)
//         setCheckToken(true)
//       });
//     } else {
//       setCheckToken(true)
//     }
//   },[])

//   // If there is a token, sign in
//   useEffect(()=>{
//     var { from } = location.state || { from: { pathname: "/home" } };
//     if(token){
//       auth.signin(() => {
//         history.replace(from);
//         return {
//           username: window.localStorage.getItem('username'),
//           token
//         }
//       })
//     }
//   },[token])

//   const LoginComponent = ({style}) => {
//     return (
//       <div style={style}>
//       { checkToken &&
//         <Row justify="center" align="middle" style={{height: 'inherit'}}>
//           <Col>
//             <Form
//               form={form}
//               name="login"
//             >
//               <Form.Item
//                 name="username"
//                 rules={[{required: true, message: 'Please input your Username!' }]}
//               >
//                 <Input
//                   prefix={<UserOutlined/>}
//                   placeholder="Username"
//                 />
//               </Form.Item>
//               <Form.Item
//                 name="password"
//                 rules={[{required: true, message: 'Please input your Password!' }]}
//               >
//                 <Input
//                   prefix={<LockOutlined/>}
//                   type="password"
//                   placeholder="Password"
//                 />
//               </Form.Item>
//               {
//                 incorrect &&
//                 <p style={{color:'red', margin:'0px', padding: '0px'}}>Incorrect Username or Password</p>
//               }
//               <Form.Item>
//               <Button 
//                 type="primary"
//                 onClick={()=>(form.validateFields().then(login()))}
//                 style={{alignItems: 'center', width: "-webkit-fill-available"}}
//               >
//                 Log in
//               </Button>
//               Or <a href="/createuser">register now!</a>
//               </Form.Item>
//             </Form>
//           </Col>
//         </Row>
//       }
//       </div>
//     )
//   }

//   return (
//     <div style={{alignContent:'center', justifyContent:'center'}}>
//       <LoginComponent
//         style={{backgroundColor:'blue', width:'250px', padding: '25px 0px 0px 0px'}}
//       />
//     </div>
//   );
// }

// export default LoginPage

// Need to do validation
// Need to get form field values

import React, { useContext, useState, useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { Form } from 'antd';
import axios from 'axios';
import URI, { convertToFormData } from '../../constants/URL'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
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
        console.log("ERROR", err)
      });
    return tokenData
  }

  async function login(){
    var { from } = location.state || { from: { pathname: "/home" } };
    var values = form.getFieldsValue()
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
              {/* <form className={classes.form} noValidate> */}
                <Form.Item
                  name="username"
                  // rules={[{required: true, message: 'Please input your Username!' }]}
                >
                  <TextField
                    inputProps={{style: {fontSize: 16}}} // font size of input text
                    InputLabelProps={{style: {fontSize: 16, backgroundColor: 'white'}}} // font size of input label
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  // rules={[{required: true, message: 'Please input your Password!' }]}
                >
                  <TextField
                    inputProps={{style: {fontSize: 16}}} // font size of input text
                    InputLabelProps={{style: {fontSize: 16, backgroundColor: 'white'}}} // font size of input label
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                </Form.Item>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={login}
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
              {/* </form> */}
              </Form>
            </div>
          </Grid>
        </Grid>
      }
    </>
  );
}

export default LoginPage;