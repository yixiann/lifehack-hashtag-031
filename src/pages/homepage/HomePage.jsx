import React, { useEffect} from 'react'
import { Button } from 'antd';

export const HomePage = ({
  ...props
}) => {

  useEffect(() => {
    console.log("TEST HOME")
  },[])

    
  return (
    <div className="Home">
      <p>Home</p>
    </div>
  )
}

export default HomePage
