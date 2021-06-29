import React, { useEffect} from 'react'
import { Button } from 'antd';

export const ChatPage = ({
  ...props
}) => {

  useEffect(() => {
    console.log("TEST CHAT")
  },[])

    
  return (
    <div className="chat">
      <p>Chat</p>
    </div>
  )
}

export default ChatPage
