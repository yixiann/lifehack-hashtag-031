import React, { useEffect, useState, useContext } from 'react'
import { Layout, Input, Menu, Button, Form, Row, Col, Upload, Modal, Divider } from 'antd'
import { convertToFormData } from '../../constants/URL'
import { errorModal } from '../../components/UI/submissionModal';
import { UploadOutlined } from '@ant-design/icons';
import API from '../../API'

export const ChatPage = ({
  authContext,
  ...props
}) => {

  const [form] = Form.useForm()
  const [selectedUserId, setSelectedUserId] = useState(null)
  const [chatHistory, setChatHistory] = useState(null)
  const [listOfRecipients, setlistOfRecipients] = useState([])
  const [fileData, setFileData] = useState('')
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState('')

  var { user } = useContext(authContext)

  const fetchChat = () => {
    API.get('api/chat/').then((res) => {
      setChatHistory(res.data)
    })
    .catch((err) => {
      console.log("ERROR", err)
    });
  }

  const getUsers = () => {
    API.get('api/user/').then((res) => {
      setlistOfRecipients(res.data.filter((item)=>{
        return item.username !== user
      }))
    })
    .catch((err) => {
      console.log("ERROR", err)
    });
  }

  const sendMessage = (e) => {
    const data = {
      fromAddress: user,
      toAddress: selectedUserId,
      text: e.message,
      attachments: fileData
    }
    API.post('api/chat/', convertToFormData(data)).then(() => {
      form.resetFields()
    })
    .then(()=>{fetchChat(); setFileData('')})
    .catch((err) => {
      errorModal(err)
      console.log("ERROR", err)
    });
  }

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    fetchChat()
  }, [selectedUserId])

  async function storeBase64(file){
    var data = new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
    setFileData(await data)
  }

  const handleClick = (attachments) => {
    setPreviewImage(attachments)
    setPreviewVisible(true)
  }

  const handleCancel = () => {
    setPreviewImage('')
    setPreviewVisible(false)
  }

  // File upload
  // const customUpload = options => {
  //   const { onSuccess, onError, file, onProgress } = options
  //   const fmData = new FormData();
  //   // // const config = {}
  //   // fmData.append("image", file);
  //   // axios.post("endpoint", fmData, 
  //   // // config
  //   // )
  //   // .then()
  //   // .catch()
  //   // // const fmData = new FormData();
  //   const config = { headers: { 
  //   "content-type": "multipart/form-data",      
  //   'Authorization': 'jwt '.concat(token)
  // }}
  //   // fmData.append("image", file);
  //   axios.post("api/chat/",  convertToFormData({toAddress: selectedUserId, text: "space",fromAddress: user, attachments: file}), config)
  //   .then(resp => {
  //     console.log(resp)
  //     onSuccess(file);
  //   })
  //   .catch(err => {
  //     console.log(err)
  //     const error = new Error('Some error');
  //     onError({event:error});
  //   })
  // }

  const TextBox = ({text}) => {
    return (
      <div
        style={{
          border: 'solid black 1px',
          borderRadius: '3px',
          margin: '5px'
        }}
      >
        <p 
          style={{
            padding: '5px'
          }}
        >
          {text}
        </p>
      </div>
    )
  }

  const ImageBox = ({item}) => {
    return (
      <div
        style={{
          border: 'solid black 1px',
          borderRadius: '3px',
          margin: '5px'
        }}
      >
        <img 
          style={{maxWidth: "-webkit-fill-available", padding: '2px'}}
          onClick={()=>(handleClick(item.attachments))}
          src={item.attachments}
        />
      </div>                
    )
  }

  return (
    <div className="Chat">
      <Row className='fill-content'>
        <Col span={6}>
          <Menu>
            {listOfRecipients.map(item => <Menu.Item key={item.id} onClick={() => setSelectedUserId(item.username)}>{item.username}</Menu.Item>)}
          </Menu>
        </Col>
        <Col span={18}>
          <div class='hide-scroll' style={{overflowY: 'scroll', height: '80vh'}}>
          <Row>
            {chatHistory
              ?.filter(item => (item.toAddress === user || item.toAddress === selectedUserId)
                && (item.fromAddress === user || item.fromAddress === selectedUserId))
              ?.map(item => {
                if(item.text!==''){
                  return (
                    <>
                      { item.fromAddress===user &&
                        <>
                          <Col span={16}/>
                          <Col span={8}>
                            <TextBox text={item.text}/>
                          </Col>
                        </>
                      }
                      { item.toAddress===user &&
                        <>
                          <Col span={8}>
                            <TextBox text={item.text}/>
                          </Col>
                          <Col span={16}/>
                        </>
                      }
                    </>
                  )
                }
                if(item.attachments!==''){
                  return (
                    <>
                      { item.fromAddress===user &&
                        <>
                          <Col span={16}/>
                          <Col span={8}>
                            <ImageBox item={item}/>
                          </Col>
                        </>
                      }
                      { item.toAddress===user &&
                        <>
                          <Col span={8}>
                            <ImageBox item={item}/>
                          </Col>
                          <Col span={16}/>
                        </>
                      }
                    </>
                  )
                }
              })
            }
          </Row>
          </div>
          <Divider
            style={{
              margin: '10px 0px',
              borderBlockColor: 'grey'
            }}
          />
          <Form
            form={form}
            name="chat"
            onFinish={e => sendMessage(e)}
          >
            <Row justify="space-around" style={{padding: '20px 0px'}}>
              <Col span={16} align='middle'>
                { fileData===''&&
                  <Form.Item name="message">
                    <Input
                      placeholder="Input message"
                    />
                  </Form.Item>
                }
                {
                  fileData!==''&&
                  <img onClick={()=>(handleClick(fileData))} style={{height:'50px'}} src={fileData}/>
                }
              </Col>
              <Upload
                listType="picture"
                accept=".jpg, .png"
                showUploadList={false}
                beforeUpload={async (file) => {
                    storeBase64(file)
                    return false;
                }}
              >
                <Col span={2} align='middle'>
                  <Button><UploadOutlined/></Button>
                </Col>
              </Upload>
              <Form.Item>
                <Col span={4} align='middle'>
                  <Button htmlType='submit'>Send</Button>
                </Col>
              </Form.Item>
            </Row>
          </Form>
        </Col>
      </Row>
      <Modal
        closable={false}
        visible={previewVisible}
        footer={null}
        onCancel={handleCancel}
        width={'80vw'}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  )
}

export default ChatPage
