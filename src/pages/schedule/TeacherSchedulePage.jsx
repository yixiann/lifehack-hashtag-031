import React, { useState, useEffect } from 'react'
import { Upload, Button, Calendar, Modal, Col, List, Row, Form, Input, Select, DatePicker, Spin } from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import API from '../../API';
import URI from '../../constants/URL';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { successModal, errorModal } from '../../components/UI/submissionModal';


const TeacherSchedulePage = ({
  ...props
}) => { 

  const history = useHistory();
  const [form] = Form.useForm();

  const layout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
  };

  // fetch students class data
  const [rawClassData, setRawClassData] = useState([]);
  const [classData, setClassData] = useState([]);
  const [classDetails, setClassDetails] = useState([]);
  const [launchData, setLaunchData] = useState({});
  const [classDetailsVisible, setClassDetailsVisible] = useState(false);
  const [addClassVisible, setAddClassVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // start and end date for create class form
  const [dateStart, setDateStart] = useState(moment());
  const [dateEnd, setDateEnd] = useState(moment());

  // init
  useEffect(() => {
    API.get("/api/class/").then(e => setRawClassData(e.data));
  },[]);


  useEffect(() => {
    if (rawClassData.length > 0) {
      setClassData(rawClassData.map(e => ({
        keyId: e.classid,
        classId: e.classid,
        link: e.zoomlink,
        teacher: e.teacher,
        subject: e.subject,
        dateStart: new Date(e.datestart),
        dateEnd: new Date(e.dateend),
        remarks: e.remarks,
      })))
    }
  }, [rawClassData]);


  // takes 2 Date objects and compares Year, Month, Day
  const compareDateOnly = (a, b) => {
    if (a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear()) {
      return true;
    }
  }

  const onClassClick = item => {
    setClassDetails([
      ["Subject", item.subject],
      ["Teacher", item.teacher],
      ["Class starts at", item.dateStart.toLocaleString()],
      ["Class ends at", item.dateEnd.toLocaleString()],
      ["Class Link", item.link],
      ["Class Id", item.classId],
      ["Remarks", item.remarks],
    ])
    setLaunchData({
      link: item.link,
      classId: item.classId,
      dateEnd: item.dateEnd,
    })
    setClassDetailsVisible(true)
  }

  const launchClass = () => {
    window.localStorage.setItem('class', launchData.classId);
    if (launchData.link) window.open(launchData.link, '_blank');
    if (moment(launchData.dateEnd).isBefore(moment())) {
      console.log("BEFORE")
      history.push(`/lessondata/reviewdata?classid=${launchData.classId}`);
    } else {
      console.log("AFTER")
      history.push(`/lessondata/livedata?classid=${launchData.classId}`);
    }
  }

  const disabledDate = (current) => {
    let dateStart = form.getFieldValue("dateStart");
    return current && current < moment(dateStart);
  }

  const createClass = values => {
    console.log(values)
    setLoading(true)
    const classId = uuidv4().substring(0,6).toUpperCase();
    API.post("/api/class/", {
      classid: classId,
      classname: values.className,
      zoomlink: values.link,
      teacher: values.teacher,
      subject: values.subject,
      datestart: values.dateStart.toJSON(),
      dateend: values.dateEnd.toJSON(),
      remarks: values.remarks,
    }).then(e => {
      console.log("test",e)
      successModal("Class Created.\n Your Class ID is " + e.data.classid);
      setLoading(false);
      setAddClassVisible(false);
      form.resetFields();
      API.get("/api/class/").then(e => setRawClassData(e.data));
    }).catch(e => {
      errorModal("Error occured.")
    })
  }


  return (
    <div className="About">
    <Button size="large" className="custom-blue-button" type="primary" onClick={() => setAddClassVisible(true)}>Add Class</Button>
      <Calendar 
        dateCellRender={moment => {
          const list = classData.filter(e => compareDateOnly(e.dateStart, new Date(moment)));
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
      <Modal
        className="creation-modal"
        centered 
        onCancel={() => setAddClassVisible(false)}
        visible={addClassVisible} 
        title="Add Class"
        footer={null}
      >
        <Spin spinning={loading}>
        <Form
        form={form}
        requiredMark={false}
        {...layout}
        labelAlign='left'
        className="accountsForm"
        onFinish={createClass}
        >
        <Form.Item 
            name="subject" 
            label="Subject"
            rules={[{required: true, message: "Subject required"}]}
            >
            <Input size="large" placeholder="Subject"/>
        </Form.Item>
        <Form.Item 
            name="className" 
            label="Class Name"
            >
            <Input size="large" placeholder="Class Name"/>
        </Form.Item>
        <Form.Item 
            name="teacher" 
            label="Teacher"
            rules={[{required: true, message: "Teacher name is required"}]}
        >
            <Input size="large" placeholder="Teacher Name"/>
        </Form.Item>
        <Form.Item 
            name="dateStart" 
            label="Class Starts"
            rules={[{required: true, message: "Required"}]}
        >
          <DatePicker
            format="YYYY-MM-DD HH:mm:ss"
            showTime={{ defaultValue: moment('08:00:00', 'HH:mm:ss') }}
            onChange={e => form.setFieldsValue({
              dateEnd: e.add(1, 'hours')
            })}
          />
        </Form.Item>
        <Form.Item 
            name="dateEnd" 
            label="Class Ends"
            rules={[{required: true, message: "Required"}]}
        >
          <DatePicker
            format="YYYY-MM-DD HH:mm:ss"
            showTime={{ defaultValue: moment(form.getFieldValue("dateStart")) }}
            disabledDate={disabledDate}
          />
        </Form.Item>
        <Form.Item 
            name="link" 
            label="Link to Class"
        >
            <Input size="large" placeholder="Link"/>
        </Form.Item>
        <Form.Item 
            name="remarks" 
            label="Remarks"
        >
            <Input size="large" placeholder="Any Remarks"/>
        </Form.Item>
        <Button type="primary" htmlType="submit" className="custom-blue-button">ADD CLASS</Button>
        </Form>
        </Spin>
      </Modal>
    </div>
  )
}

export default TeacherSchedulePage