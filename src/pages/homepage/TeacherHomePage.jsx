import React, { useEffect, useState, useContext } from 'react';
import { Button, Table, Form, Input, Typography } from 'antd';
import URI, { convertToFormData } from '../../constants/URL'
import API from '../../API'
import { confirmationModal, errorModal, successModal } from '../../components/UI/submissionModal';
import { useHistory } from 'react-router-dom';

export const HomePage = ({
  authContext,
  ...props
}) => {

  const useAuth = () => {
    return useContext(authContext);
  }

  var auth = useAuth();

  const { Title } = Typography

  const [ form ] = Form.useForm()

  const [ data, setData ] = useState([])

  const [ loading, setLoading ] = useState(true)

  const history = useHistory();

  useEffect(() => {
    history.push('/teacher/schedule');
  }, [])


  // const fetchAllTest = () => {
  //   setLoading(true)
  //   API.get(URI.test)
  //   .then((res) => {
  //     setData(res.data.reverse())
  //     setLoading(false)
  //   })
  //   .catch((err) => {
  //     setLoading(false)
  //     errorModal(err)
  //     console.log("ERROR", err)
  //   });
  // }

  // const submitTest = (data) => {
  //   API.post(URI.test, convertToFormData(data))
  //   .then(()=>{
  //     successModal("Successfully submitted")
  //     fetchAllTest()
  //   })
  //   .catch((err) => {
  //     errorModal(err)
  //     console.log("ERROR", err)
  //   });
  // }


  // useEffect(() => {
  //   fetchAllTest()
  // },[])
  
  // const layout = {
  //   labelCol: {span: 8},
  //   wrapperCol: {span: 16},
  // };

  // const columns = [
  //   {title: "Text", dataIndex: "text", key: "text" },
  //   {title: "Number", dataIndex: "number", key:"number"},
  // ]

  // const submitFn = (e) => {
  //   console.log("Submit",e)
  //   confirmationModal({
  //     title: "Submit",
  //     text: "Are you sure?",
  //     titleLoading: "Loading",
  //     functionCalled: submitTest,
  //     data: e
  //   })
  // }
  
  // This page is not in use
  return (
    <div>
      <Title>Empty Page</Title>
      {/* <Form
        style={{ margin: '30px' }}
        form={form}
        labelAlign='left'
        name='form'
        {...layout}
        onFinish={submitFn}
      >              
        <Form.Item 
          label='Text'
          name='text'
        >
          <Input/>
        </Form.Item>
        <Form.Item 
          label='Number'
          name='number'
          normalize={value => parseInt(value? value.replace(/[^0-9]+/,''):0)}
        >
          <Input/>
        </Form.Item>
        <Button
          htmlType='submit'
          type='primary'
        >
          Submit
        </Button>
      </Form>
      
      <Table
        style={{margin: "30px"}}
        columns={columns}
        dataSource={data}
        loading={loading}
      /> */}
    </div>
  )
}

export default HomePage
