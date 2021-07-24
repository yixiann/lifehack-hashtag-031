import React, { useEffect, useState } from 'react'
import { Col, Row, List, Card, Typography, Slider, } from 'antd';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { Chart, Tooltip, Interval } from 'bizcharts';
import moment from 'moment'
import { errorModal } from '../../components/UI/submissionModal'
import API from '../../API'

const { Title, Text } = Typography

function LiveDataPage(props) {
  const classId = new URLSearchParams(window.location.search).get('classid');
  const [loaded, setLoaded] = useState(false)
  const [classDetails, setclassDetails] = useState(null)

  // useEffect(() => {
  //   if (classId !== null) {
  //     API.get(`/api/class/fetchclass/${classId}`)
  //       .then(resp => {
  //         setclassDetails(resp.data)
  //         setLoaded(prev => true)
  //       })
  //       .catch(resp => (console.log(resp)))
  //   }
  // }, [classId])

  const [pollUpdates, setPollUpdates] = useState(true)

  // Get updates every minute
  useEffect(() => {
    if (pollUpdates) {
      API.get(`/api/class/fetchclass/${classId}`)
        .then(resp => {
          // setLiveData(resp.data.liveData)
          // setBarchartData(resp.data.barchart)
          // setLiveChat(resp.data.chat)
          setPollUpdates(false)
        })
        .catch(resp => (console.log(resp)))
    }
  }, [pollUpdates])

  // setInterval(function () {
  //   setPollUpdates(true)
  // }, 60 * 1000)

  const [liveData, setLiveData] = useState({
    yes: 20,
    no: 12,
    fast: 20,
    slow: 15,
  })
  const [liveChat, setLiveChat] = useState([
    {
      fromUsername: "Donovan",
      message: "Clarify what is by redux?",
      timestamp: moment()
    },
    {
      fromUsername: "Dexter",
      message: "What you mean by trigonometry?",
      timestamp: moment()
    },
    {
      fromUsername: "Yi Xian",
      message: "Why my login page not working?",
      timestamp: moment()
    },
    {
      fromUsername: "Justin",
      message: "Lovin this app weewoo!",
      timestamp: moment()
    },
  ])

  const [barchartData, setBarchartData] = useState([
    { name: "I am lost", count: 7 },
    { name: "I understand", count: 10 },
  ])

  return (
    <div className="LiveDataPage">
      <Title>
        {classDetails !== null ? `Live Data for Class ${classDetails.classname} at ${moment(classDetails.datestart).format("hh:mm a")}` : "Class Not found"}
      </Title>
      {classDetails !== null && (
        <Card
          title={
            <div className="cardheader">
              <Row>Class: {classDetails.classname}</Row>
              <Row>Subject: {classDetails.subject}</Row>
              <Row>Ends in: {moment(classDetails.dateend).fromNow()}</Row>
              <Row>Remarks: {classDetails.remarks}</Row>
            </div>
          }
        >
          <Title className="liveChatSubheaders" level={3}>Pace of lesson</Title>
          <Row>
            <Col span={4}>
              <Text style={{ fontSize: "18px" }}>Moving too slow!</Text>
            </Col>
            <Col span={16}>
              <Slider
                range
                step={10}
                max={40}
                min={-40}
                value={[0 - liveData.slow, liveData.fast]}
                marks={{ 0: 'Good pace!' }}
                tooltipVisible={true}
                tooltipPlacement="bottom"
                tipFormatter={value => {
                  if (value < 0) {
                    return `${-1 * value} students voted to slow down!`
                  } else if (value > 0) {
                    return `${value} students voted for speed up!`
                  } else {
                    return "Good pace keep it up!"
                  }

                }}
              />
            </Col>
            <Col span={4}>
            <Text style={{ fontSize: "18px"}}>Moving too fast!</Text>
          </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Title className="liveChatSubheaders" level={3}>Student's understanding</Title>
              <Chart height={400} padding="auto" data={barchartData} autoFit>
                <Interval
                  adjust={[
                    {
                      type: 'dodge',
                      marginRatio: 0,
                    },
                  ]}
                  position="name*count"
                  color={"name"}
                />
                <Tooltip shared />
              </Chart>
            </Col>
            <Col span={12}>
              <Title className="liveChatSubheaders" level={3}>Live Chat</Title>
              <List className="liveChat">
                {liveChat.map(obj =>
                  <List.Item>
                    <Card
                      className="liveChatCard"
                      type="inner"
                      bordered={false}
                      title={`${obj.fromUsername} asked ${obj.timestamp.fromNow()}`}
                      bodyStyle={{ fontSize: '20px' }}
                    >
                      {obj.message}
                    </Card>
                  </List.Item>)}
              </List>
            </Col>
          </Row>
        </Card>
      )}
    </div>
  )
}

export default LiveDataPage
