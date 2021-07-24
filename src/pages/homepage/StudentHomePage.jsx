import React, { useEffect, useState, useContext } from 'react'
import { Layout, Input, Menu, Button, Form, Row, Col, Upload, Modal, Divider, Typography } from 'antd'
import { CheckOutlined, FastBackwardOutlined, FastForwardOutlined, CloseOutlined, WindowsOutlined } from '@ant-design/icons';
import { confirmationModal, loadingModal, successModal } from '../../components/UI/submissionModal';
import swal from '@sweetalert/with-react';
import { convertToFormData } from '../../constants/URL'
import { errorModal } from '../../components/UI/submissionModal';
import { UploadOutlined } from '@ant-design/icons';
import API from '../../API'
import URI from '../../constants/URL'

export const HomePage = ({
  authContext,
  ...props
}) => {

  const [classDetails, setclassDetails] = useState(null)

  useEffect(()=>{
    if(window.localStorage.getItem('class') && !classDetails){
      setInClass(true)
      API.get(`/api/class/fetchclass/${window.localStorage.getItem('class')}`)
      .then(resp => {
        setclassDetails(resp.data)
      })
      .catch(resp => (console.log(resp)))
    }
  })

  const [fileData, setFileData] = useState('')
  const [oriFileData, setOriFileData] = useState()

  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  
  const [chatHistory, setChatHistory] = useState(null)
  const [inClass, setInClass] = useState(false)

  var { user } = useContext(authContext)

  const selectedUserId = 'newUser'

  const style = (colour) => {
    return {
      width: '100%',
      height: '40vh',
      backgroundColor: colour
    }
  }

  const fetchApp = () => {
    API.get('/api/app/').then((res) => {
      console.log(res.data)
      setChatHistory(res.data)
    })
    .catch((err) => {
      console.log("ERROR", err)
    });
  }

  useEffect(() => {
    fetchApp()
  }, [])

  async function storeBase64(file){
    var data = new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
    setFileData(await data)
  }

  const [ form ] = Form.useForm()

  const { Title } = Typography

  const joinClass = () => {
    const values = form.getFieldsValue()
    window.localStorage.setItem('class', values.id)
    setTimeout(() => { setInClass(true); swal.close() }, 300);
    loadingModal('Loading')
  }

  const leave = () => {
    window.localStorage.removeItem('class')
    setInClass(false)
    return true
  }

  const leaveClass = () => {
    confirmationModal(
      {
        title:'Leave Class',
        text: 'The class have not ended. Are you sure you want to leave?',
        loading: false,
        titleLoading: 'Leaving',
        textLoading: '',
        functionCalled: leave,
      }
    )
  }

  const sendMessage = (e) => {
    const data = {
      fromAddress: user,
      toAddress: selectedUserId,
      text: e.message,
      attachments: fileData
    }
    API.post('/api/chat/', convertToFormData(data)).then(() => {
      form.resetFields()
    })
    .then(()=>{setFileData('');fetchApp()})
    .catch((err) => {
      errorModal(err)
      console.log("ERROR", err)
    });
  }

  const handleClick = (attachments) => {
    setPreviewImage(attachments)
    setPreviewVisible(true)
  }

  const handleCancel = () => {
    setPreviewImage('')
    setPreviewVisible(false)
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

  const TextBox = ({text}) => {
    return (
      <div
        style={{
          border: 'solid black 3px',
          borderRadius: '3px',
          backgroundColor: 'white',
          margin: '5px',
          padding: '5px',
          wordWrap: 'normal',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      >
        {text}
      </div>
    )
  }

  const sendApp = (data, type=true) => {
    API.post(URI.app, convertToFormData(data))
    .then(()=>{
      fetchApp()
      if(type){
        successModal('Successfully Sent')
      }
    })
    .catch((err) => {
      errorModal(err)
      console.log("ERROR", err)
    });
  }

  const buttonPress = (type, datas) => {
    var user = window.localStorage.getItem('username')
    var data = {
      classid: 1,
      yes: '',
      no: '',
      toofast: '',
      tooslow: '',
      comments: '',
      attachments: '',
      fromAddress: user
    }
    setTimeout(() => { swal.close() }, 1500);
    var result = {}
    switch(type){
      case 'yes':
        result = {
          ...data,
          yes: user
        }
        return sendApp(result)
      case 'no':
        result = {
          ...data,
          no: user
        }
        return sendApp(result)
      case 'toofast':
        result = {
          ...data,
          toofast: user
        }
        return sendApp(result)
      case 'tooslow':
        result = {
          ...data,
          tooslow: user
        }
        return sendApp(result)
      case 'comment':
        console.log(datas)
        result = {
          ...data,
          comments: datas
        }
        return sendApp(result, false)
      case 'attachment':
        result = {
          ...data,
          attachments: oriFileData
        }
        return sendApp(result, false)
      default:
        return null
    }
  }
  
  return (
    <div style={{
      minWidth:'1500px',
      overflowX: 'scroll'
    }}>
      { !inClass &&
        <div
          className="fill-content"
          style={{
            backgroundImage: 'url(https://img.freepik.com/free-vector/books-seamless-pattern-vector-books-light-bulbs-seamless-texture-reading-background_81894-4192.jpg?size=626&ext=jpg)'
          }}
        >
          <Row align={'middle'} justify={'center'} style={{height: '800px'}}>
            <Col>
              <div
                style={{backgroundColor: '#002766', padding: '30px', borderRadius: "20px"}}
              >
              <Title align={'center'} style={{color: 'white'}}>Class ID</Title>
              <Form
                form={form}
                name="login"
              >
                <Form.Item
                  name="id"
                >
                  <Input
                    placeHolder={'Class ID'}
                    size={'large'}
                  />
                </Form.Item>
              </Form>
              <Row align={'middle'}>
                <Button type='primary' style={{width: '100%', fontSize: '24px', height: '50px'}} onClick={()=>(joinClass())}>
                  Join Class
                </Button>
              </Row>
              </div>
            </Col>
          </Row>
        </div>
      }
      {
        inClass &&
        <div
          style={{
            padding: '20px',
          }}
        >
          <Row>
            <Col span={4}>
              <Button type="primary" onClick={()=>{leaveClass()}} style={{height: '80px'}}>
                <Title style={{padding: '0px', margin: "0px"}}>
                  Leave Class
                </Title>
              </Button>
            </Col>
            <Col span={10}>
              <Title style={{padding: '0px', margin: '0px'}}>
                {`${classDetails?.subject} - ${classDetails?.remarks} (${classDetails?.teacher}) `}                
              </Title>
              <a  style={{fontSize:'20px'}} onClick={()=>(window.open(classDetails.zoomlink, '_blank'))}>
                Click here to be redirected to your Zoom class
              </a>
            </Col>
          </Row>
          
          <Row style={{height: '20px'}}/>
          <Row>
            <Col span={16}>
              <Row gutter={24}>
                <Col span={12}><Button onClick={()=>(buttonPress('yes'))} shape="round" style={style('#95de64')}>
                  <CheckOutlined
                    style={{fontSize: '60px'}}
                  />
                  <Title level={4}>
                    I understand
                  </Title>
                  <Title level={4}>
                    {/* iya /ஆம் */}
                  </Title>
                </Button></Col>
                <Col span={12}><Button onClick={()=>(buttonPress('no'))} shape="round" style={style('#ff7875')}>
                  <CloseOutlined
                    style={{fontSize: '60px'}}
                  />
                  <Title level={4}>
                    I am lost
                  </Title>
                  <Title level={4}>
                    {/* tidak / இல்லை */}
                  </Title>
                </Button></Col>
              </Row>
              <Row style={{height: '20px'}}/>
              <Row gutter={24}>
                <Col span={12}><Button onClick={()=>(buttonPress('toofast'))} shape="round" style={style('#b37feb')}>
                  <FastBackwardOutlined
                    style={{fontSize: '60px'}}
                  />
                  <Title level={4}>
                    Slow Down
                  </Title>
                  <Title level={4}>
                    {/* terlalu laju / மிக வேகமாக */}
                  </Title>
                </Button></Col>
                <Col span={12}><Button onClick={()=>(buttonPress('tooslow'))} shape="round" style={style('#69c0ff')}>
                  <FastForwardOutlined 
                    style={{fontSize: '60px'}}
                  />
                  <Title level={4}>
                    Speed Up
                  </Title>
                  <Title level={4}>
                    {/* terlalu perlahan / மிக மெதுவாக */}
                  </Title>
                </Button></Col>
              </Row>
            </Col>
            <Col span={1}/>
            <Col span={7}>
              <Row>
              <div class='hide-scroll' style={{overflowY: 'scroll', height: '74vh', border: '2px black solid', borderBottom: '0px', width: '30vw', minWidth: '426px'}}>
                <Row 
                  style={{
                    backgroundImage: 'url(https://theabbie.github.io/blog/assets/official-whatsapp-background-image.jpg)',
                    minHeight:'74vh'
                  }}
                  >
                  {chatHistory?.filter(item => (item.fromAddress === user && item.comments !== ""))
                    ?.map(item => {
                      if(item.comments!==''){
                        return (
                          <>
                            { item.fromAddress===user &&
                              <>
                                <Col span={16}/>
                                <Col span={8}>
                                  <TextBox text={item.comments}/>
                                </Col>
                              </>
                            }
                            { item.toAddress===user &&
                              <>
                                <Col span={8}>
                                  <TextBox text={item.comments}/>
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
              </Row>
              <Form
                form={form}
                name="chat"
                onFinish={e => {buttonPress('comment',e.message)}}
                style={{
                  border: '2px black solid',
                  borderTop: '0px'
                }}
              >
                <Row justify="space-around" style={{
                  padding:'23px 0px 0px 0px',
                  backgroundColor: '#002766'
                }}>
                  <Col span={16} align='middle'>
                    { true &&
                      <Form.Item name="message">
                        <Input
                          placeholder="Input message"
                        />
                      </Form.Item>
                    }
                    {
                      false &&
                      <Row gutter={16}>
                        <Col span={12}>
                          <Button style={{width:'100%'}} onClick={()=>(handleClick(fileData))}>Preview</Button>
                        </Col>
                        <Col span={12}>
                          <Button style={{width:'100%'}} onClick={()=>(setFileData(''))}>Clear</Button>
                        </Col>
                      </Row>
                    }
                  </Col>
                  {/* <Upload
                    listType="picture"
                    accept=".jpg, .png"
                    showUploadList={false}
                    beforeUpload={async (file) => {
                        setOriFileData(file)
                        storeBase64(file)
                        return false;
                    }}
                  >
                    <Col span={2} align='middle'>
                      <Button><UploadOutlined/></Button>
                    </Col>
                  </Upload> */}
                  <Form.Item>
                    <Col span={4} align='middle'>
                      <Button htmlType='submit'>Send</Button>
                    </Col>
                  </Form.Item>
                </Row>
              </Form>
              <Modal
                closable={false}
                visible={previewVisible}
                footer={null}
                onCancel={handleCancel}
                width={'80vw'}
              >
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
              </Modal>
            </Col>
          </Row>
        </div>
      }
    </div>
  )
}

export default HomePage
