import React, { useEffect } from 'react';
import { Button, Table, Form, InputNumber, Input, Typography } from 'antd';

export const HomePage = ({
  ...props
}) => {

  useEffect(() => {
    // console.log("TEST HOME")
  },[])

  const { Title } = Typography

  const [ form ] = Form.useForm()

  const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
  };

  const columns = [
    {title: "Text", dataIndex: "text", key: "text" },
    {title: "Number", dataIndex: "number", key:"number"},
  ]

  const fakeData = [
    {text: "Hello", number: 9},
    {text: "Bye", number: 2}
  ]

  const submitFn = (e) => {
    console.log("Submit",e)
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
        dataSource={fakeData}
      />
    </div>
  )
}

export default HomePage
