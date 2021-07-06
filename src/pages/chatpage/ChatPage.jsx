import React, { useEffect} from 'react'

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
