import React, { useEffect} from 'react'
import { Button } from 'antd';

export const AboutPage = ({
  ...props
}) => {

  useEffect(() => {
    console.log("TEST About")
  },[])

    
  return (
    <div className="About">
      <p>About</p>
    </div>
  )
}

export default AboutPage
