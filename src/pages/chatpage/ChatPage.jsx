import React, { useEffect, useState, useContext } from 'react'
import { Layout, Input, Menu, Button, Form, Row, Col, Upload } from 'antd'
import { convertToFormData } from '../../constants/URL'
import axios from 'axios'
import { errorModal } from '../../components/UI/submissionModal';
import { UploadOutlined } from '@ant-design/icons';

export const ChatPage = ({
  authContext,
  ...props
}) => {

  const [form] = Form.useForm()
  const [selectedUserId, setSelectedUserId] = useState(null)
  const [chatHistory, setChatHistory] = useState(null)
  const [listOfRecipients, setlistOfRecipients] = useState([])

  const { Header, Footer, Sider, Content } = Layout


  var { token, user } = useContext(authContext)

  useEffect(() => {
    // get all valid users
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'jwt '.concat(token)
    }
    axios.get('api/user/', {
      headers: headers
    }).then((res) => {
      setlistOfRecipients(res.data)
    })
      .catch((err) => {
        console.log("ERROR", err)
      });
  }, [])

  const sendMessage = (e) => {
    const data = {
      fromAddress: user,
      toAddress: selectedUserId,
      text: e.message,
      token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo5LCJ1c2VybmFtZSI6ImhlbGxvIiwiZXhwIjoxNjI1NzI0NDUxLCJlbWFpbCI6IiJ9.nDNBHhxzT_97R1p8PoEwxYl5PYDnqOurNEmyphz2DzY'
    }
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'jwt '.concat(token)
    }
    axios.post('api/chat/', convertToFormData(data), {
      headers: headers
    }).then(() => {
      // successModal("Successfully submitted")
      form.resetFields()
    })
      .catch((err) => {
        errorModal(err)
        console.log("ERROR", err)
      });
  }
  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'jwt '.concat(token)
    }
    axios.get('api/chat/', {
      headers: headers
    }).then((res) => {
      setChatHistory(res.data)
    })
      .catch((err) => {
        console.log("ERROR", err)
      });
  }, [selectedUserId])

  // File upload
  const customUpload = options => {
    const { onSuccess, onError, file, onProgress } = options

    // const fmData = new FormData();
    const config = { headers: { 
    "content-type": "multipart/form-data",      
    'Authorization': 'jwt '.concat(token)
  }}
    // fmData.append("image", file);
    axios.post("api/chat/",  convertToFormData({toAddress: selectedUserId, text: "space",fromAddress: user, attachments: file}), config)
    .then(resp => {
      console.log(resp)
      onSuccess(file);
    })
    .catch(err => {
      console.log(err)
      const error = new Error('Some error');
      onError({event:error});
    })
  }

  return (
    <div className="chat">
      <Layout>
        <Menu>
          {listOfRecipients.map(item => <Menu.Item key={item.id} onClick={() => setSelectedUserId(item.username)}>{item.username}</Menu.Item>)}
        </Menu>
      </Layout>
      {chatHistory
        ?.filter(item => (item.toAddress === user || item.toAddress === selectedUserId)
          && (item.fromAddress === user || item.fromAddress === selectedUserId))
        ?.map(item => <li>{item.text}</li>)}
      <Form
        form={form}
        name="chat"
        onFinish={e => sendMessage(e)}
      >
        <Row>
          <Col span={20}>
            <Form.Item
              name="message">
              <Input
                placeholder="Input message"
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item>
              <Button htmlType='submit'>Send</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Upload
      customRequest={customUpload}
      >
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
    </div>
  )
}

export default ChatPage
