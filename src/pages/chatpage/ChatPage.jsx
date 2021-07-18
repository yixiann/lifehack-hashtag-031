import React, { useEffect, useState } from 'react'
import { Layout, Input, Button, Form, Row, Col } from 'antd'
import { Header, Sider } from 'antd/lib/layout/layout'

export const ChatPage = ({
  ...props
}) => {

  const [form] = Form.useForm()
  const [selectedUserId, setSelectedUserId] = useState(null)
  const [chatHistory, setChatHistory] = useState(null)

  useEffect(() => {
    setSelectedUserId(1)
    setChatHistory([
      {
        timeStamp: "moment1",
        message: "Some long ass text send by 1",
        sentBy: 1
      },
      {
        timeStamp: "moment2",
        message: "Some longggerr ass text send by me",
        sentBy: 2
      }
    ])
  }, [])


  return (
    <div className="chat">
      <Form
        form={form}
        name="chat"
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
              <Button>Send</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default ChatPage
