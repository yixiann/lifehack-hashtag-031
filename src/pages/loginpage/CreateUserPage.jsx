// import React from 'react';
// import { useHistory, useLocation } from "react-router-dom";
// import { Button, Row, Col, Form, Input } from 'antd';
// import { UserOutlined, LockOutlined } from '@ant-design/icons';
// import axios from 'axios';
// import URI, { convertToFormData } from '../../constants/URL'
// import { successModal } from '../../components/UI/submissionModal';
// import { Link } from 'react-router-dom';

// export const CreateUserPage = ({
//   authContext,
//   ...props
// }) => {

//   const createUserAxios = (values) => {
//     var { from } = location.state || { from: { pathname: "/login" } };
//     axios
//       .post(URI.createUser, convertToFormData(values))
//       .then(()=>{
//         history.replace(from)
//         successModal("Successfully Created User")
//       }).catch((err) => {
//         console.log("ERROR", err)
//       });
//   }

//   const [form] = Form.useForm()

//   var history = useHistory();
//   var location = useLocation();

//   async function createUser(){
//     var values = form.getFieldsValue()
//     console.log("VALUE", values)
//     createUserAxios(values)
//   };

//   return (
//     <div style={{ height: '100vh'}}>
//       <Row justify="center" align="middle" style={{height: 'inherit'}}>
//         <Col>
//           <Form
//             form={form}
//             name="createUser"
//           >
//             <Form.Item
//               name="username"
//               rules={[{required: true, message: 'Please input a Username!' }]}
//             >
//               <Input
//                 prefix={<UserOutlined/>}
//                 placeholder="Username"
//               />
//             </Form.Item>
//             <Form.Item
//               name="password"
//               rules={[{required: true, message: 'Please input a Password!' }]}
//             >
//               <Input
//                 prefix={<LockOutlined/>}
//                 type="password"
//                 placeholder="Password"
//               />
//             </Form.Item>
//             <Form.Item>
//             <Button 
//               type="primary"
//               onClick={()=>(form.validateFields().then(createUser()))}
//               style={{alignItems: 'center', width: "-webkit-fill-available"}}
//             >
//               Create User
//             </Button>
//             <Button 
//               type="primary"
//               style={{alignItems: 'center', marginTop: '10px',width: "-webkit-fill-available"}}
//             >
//               <Link to='/login'>
//                 Back
//               </Link>
//             </Button>
//             </Form.Item>
//           </Form>
//         </Col>
//       </Row>
//     </div>
//   );
// }

// export default CreateUserPage

import React, { useContext, useState, useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { Form, Input, Menu, Select } from 'antd';
import axios from 'axios';
import URI, { convertToFormData } from '../../constants/URL';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { errorModal, successModal } from '../../components/UI/submissionModal'


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
    backgroundImage: 'url(https://cdn.pixabay.com/photo/2017/08/06/22/01/books-2596809_960_720.jpg)',
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

  const createUserAxios = (values) => {
    var { from } = location.state || { from: { pathname: "/login" } };
    axios
      .post(URI.createUser, convertToFormData(values))
      .then(()=>{
        history.replace(from)
        successModal("Successfully Created User")
      }).catch((err) => {
        console.log("ERROR", err)
      });
  }

  const [form] = Form.useForm()

  var history = useHistory();
  var location = useLocation();

  async function createUser(){
    var values = form.getFieldsValue()
    console.log("VALUE", values)
    createUserAxios(values)
  };

  const classes = useStyles('dark');

  const { Option } = Select

  const [ checkToken, setCheckToken ] = useState(false)

  return (
    <>
      { true &&
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h4">
                Create Account
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
                  name="type"
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
                  onClick={createUser}
                >
                  Create
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Back
                  <Link href='/login'/>
                </Button>
              </Form>
            </div>
          </Grid>
        </Grid>
      }
    </>
  );
}

export default LoginPage;