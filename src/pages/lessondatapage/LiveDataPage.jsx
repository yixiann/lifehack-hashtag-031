import React, { useEffect, useState } from 'react'
import { Col, Row, List, Card, Typography, Slider, } from 'antd';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { Chart, Tooltip, Interval } from 'bizcharts';
import moment from 'moment'

const { Title } = Typography

function LiveDataPage(props) {
  const classId = new URLSearchParams(window.location.search).get('classId');
  const [liveData, setLiveData] = useState({
    yes: 20,
    no: 12,
    fast: 20,
    slow: 3,
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
    { name: "I understand", count: 10 },
    { name: "I am lost", count: 7 },
  ])


  return (
    <div className="LiveDataPage">
      <Title>Live Data {classId}</Title>
      <Card
        title="CLASS TITLE HERE WITH CLASS DETAILS"
      >
      <Title className="liveChatSubheaders" level={3}>Pace of lesson</Title>
        <Row>
          <Col span={4}>
            {liveData.slow} votes for slow down!
            <DoubleLeftOutlined />
          </Col>
          <Col span={14}>
            <Slider
              max={40}
              min={-40}
              value={liveData.fast - liveData.slow}
            />
          </Col>
          <Col span={4}>
            <DoubleRightOutlined />
            {liveData.fast} votes for speed up!
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
                color="name"
                position="name*count"
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
                title={`${obj.fromUsername} ${obj.timestamp.fromNow()}`}
                >
                {obj.message}
                </Card>
              </List.Item>)}
            </List>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default LiveDataPage
