import React, { useState } from 'react'
import { Upload, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons';

export const AboutPage = ({
  ...props
}) => {

  const [ fileData, setFileData ] = useState('')

  async function storeBase64(file){
    var data = new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
    setFileData(await data)
  }
    
  return (
    <div className="About">
      <>
        <Upload
          listType="picture"
          accept=".jpg, .png"
          beforeUpload={async (file) => {
              storeBase64(file)
              return false;
          }}
        >
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </>
      <img style={{maxWidth:'30vw'}} src={fileData}/>
    </div>
  )
}

export default AboutPage