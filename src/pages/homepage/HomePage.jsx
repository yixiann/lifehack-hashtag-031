import React, { useEffect, useState, useContext } from 'react';
import { Button, Table, Form, Input, Typography } from 'antd';
import axios from 'axios';
import URI, { convertToFormData } from '../../constants/URL'
import { confirmationModal, errorModal, successModal } from '../../components/UI/submissionModal';

export const HomePage = ({
  authContext,
  ...props
}) => {

  const useAuth = () => {
    return useContext(authContext);
  }

  var auth = useAuth();

  var { token, user } = auth

  const { Title } = Typography

  const [ form ] = Form.useForm()

  const [ data, setData ] = useState([])

  const [ loading, setLoading ] = useState(true)

  const fetchAllTest = () => {
    setLoading(true)
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'jwt '.concat(token)
    }
    axios.get(URI.test, {
      headers: headers
    }).then((res) => {
      setData(res.data.reverse())
      setLoading(false)
    })
    .catch((err) => {
      setLoading(false)
      errorModal(err)
      console.log("ERROR", err)
    });
  }

  const submitTest = (data) => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'jwt '.concat(token)
    }
    axios.post(URI.test, convertToFormData(data), {
      headers: headers
    }).then(()=>{
      successModal("Successfully submitted")
      fetchAllTest()
    })
    .catch((err) => {
      errorModal(err)
      console.log("ERROR", err)
    });
  }


  useEffect(() => {
    fetchAllTest()
  },[])
  
  const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
  };

  const columns = [
    {title: "Text", dataIndex: "text", key: "text" },
    {title: "Number", dataIndex: "number", key:"number"},
  ]

  const submitFn = (e) => {
    console.log("Submit",e)
    confirmationModal({
      title: "Submit",
      text: "Are you sure?",
      titleLoading: "Loading",
      functionCalled: submitTest,
      data: e
    })
  }
  
  return (
    <div className="Home" style={{padding: "10px"}}>
      <Title>A form and table for Testing Purposes</Title>
      <Form
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
      />
    </div>
  )
}

export default HomePage
