import React, { useState, useEffect } from 'react'
import { Upload, Button, Calendar, Modal, Col, List, Row } from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';


const AboutPage = ({
  ...props
}) => { 

  const history = useHistory();

  // fetch students class data
  const [classData, setClassData] = useState([]);
  const [classDetails, setClassDetails] = useState([]);
  const [launchData, setLaunchData] = useState({});
  const [classDetailsVisible, setClassDetailsVisible] = useState(false);

  // init
  useEffect(() => {
    setClassData([
      {
        keyId: 0,
        classId: 0,
        link: "https://us02web.zoom.us/j/87894970398?pwd=VDlBMEMrUEYyOEdZalVZdFNpL2ZwUT09",
        teacher: "Ms Ang Jia Ying",
        subject: "English",
        dateStart: new Date(2021, 7, 23, 15, 0, 0),
        dateEnd: new Date(2021, 7, 23, 16, 0, 0),
      },
      {
        keyId: 1,
        classId: 1,
        link: "https://us02web.zoom.us/j/87894970398?pwd=VDlBMEMrUEYyOEdZalVZdFNpL2ZwUT09",
        teacher: "Mr Tan Yi Xian",
        subject: "Math",
        dateStart: new Date(2021, 7, 26, 15, 0, 0),
        dateEnd: new Date(2021, 7, 26, 16, 0, 0),
      },
    ])
  },[]);

  // map data
  useEffect(() => {
  }, [classData]);


  // takes 2 Date objects and compares Year, Month, Day
  const compareDateOnly = (a, b) => {
    // console.log("a\n", a.getDate() + '-' + a.getMonth() + '-' + a.getFullYear());
    // console.log("b\n", b.getDate() + '-' + b.getMonth() + '-' + b.getFullYear());
    if (a.getDate() === b.getDate() && a.getMonth() === b.getMonth() ) {
      return true;
    }
  }

  const onClassClick = item => {
    console.log("onClassClick", item)
    setClassDetails([
      ["Subject", item.subject],
      ["Teacher", item.teacher],
      ["Class starts at", item.dateStart.toLocaleString()],
      ["Class ends at", item.dateEnd.toLocaleString()],
      ["Class Link", item.link],
      ["Class Id", item.classId]
    ])
    setLaunchData({
      link: item.link,
      classId: item.classId,
    })
    setClassDetailsVisible(true)
  }

  const launchClass = () => {
    window.localStorage.setItem('class', launchData.classId);
    window.open(launchData.link, '_blank');
    history.push("/student/dashboard")
    
  }

  return (
    <div className="About">
      <Calendar 
        dateCellRender={moment => {
          const list = classData.filter(e => compareDateOnly(e.dateStart, new Date(moment.year(), moment.month()+1, moment.date())))
          return (
            <>
            {list.length > 0 && list.map(item =>
            <Button
              type="primary"
              className="custom-blue-button"
              onClick={() => onClassClick(item)}
            >
              {item.dateStart.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit'}) + ": " + item.subject}
            </Button>)}
            </>
          )}}
      />

      <Modal
        className="class-details"
        centered 
        onCancel={() => {setClassDetailsVisible(false); setClassDetails([])}}
        visible={classDetailsVisible} 
        title="Class Details"
        footer={
          <Button 
            className="custom-blue-button"
            onClick={launchClass}
          >
            LAUNCH
          </Button>}
      >
      <Row className="container-block">
        <Col>
          <List 
            dataSource={classDetails}
            renderItem={item => (
              <List.Item key={item[0]} className="container">
                <Row gutter={16} className="container__child container__child--flex1">
                  <Col span={6}>
                    {item[0]}
                  </Col>
                  <Col span={18}>
                    {item[1]}
                  </Col>
                </Row>
              </List.Item>
            )}
          />
        </Col>
      </Row>
      </Modal>

    </div>
  )
}

export default AboutPage