import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Table, Tabs, Slider, Row, Col, Modal, Typography, List, Card } from 'antd';
import { Chart,Axis,Tooltip,Coordinate, Interval, Point, Line, getTheme, Interaction} from "bizcharts";
import DataSet from '@antv/data-set';
import { pastQuestions,allStudentOverallSummaryData, studentResultsData, subjectObject, marksObject, lessonClassData, lessonClassDataTime, studentOverallSummaryData, lessonData, lessonAlertData, dataResults } from './hardData';

function ReviewDataPage(props) {

  const classId = new URLSearchParams(window.location.search).get('classid');

  const [ visible, setVisible ] = useState(false)

  const [ classVisible, setClassVisible ] = useState(false)

  const { Title } = Typography

  const { TabPane } = Tabs;

	const cols = {
		percent: {
			formatter: val => {
				val = val * 100 + '%';
				return val;
			},
		},
	};

  const createOverallSummaryData = (subject, data) => {
    const ds = new DataSet();
    const dv = ds.createView().source(data[subject]);
    dv.transform({
      type: "fold",
      fields: ["I understand", "I am lost", "Slow Down", "Speed Up"],
      key: "年龄段",
      value: "人口数量",
      retains: ["State"]
    });
    return dv.rows
  }

  const [ dataClass, setDataClass] = useState(allStudentOverallSummaryData)

  const [datas, setDatas] = useState();
  useEffect(() => {
    setDatas(lessonClassDataTime)
  }, [])

  const columns = [
    {title: "Name", dataIndex: "name", key:'name', align:'left', width: '150px',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {title: "Class", dataIndex: "class", key:'class', align:'left', width: '80px',
      sorter: (a, b) => a.class.localeCompare(b.class),
    },
    {title: "Gender", dataIndex: "gender", key:'gender', align:'left', width: '100px', filters: [
      { text: 'Male', value: 'Male' },
      { text: 'Female', value: 'Female' }],
      onFilter: (value, record) => record.gender === value
    },
    {title: "Results", dataIndex: "result", key:'result', align:'left', width: '80px',
      sorter: (a, b) => a.result.localeCompare(b.result),
      render(text, record) {
        return {
          props: {
            style: { color:record.result<51 ?"red":"green"}
          },
          children: 
          <Row style={{display: 'block'}}>
            {text}
          </Row>
        };
      }
    },
    {title: "Grade", dataIndex: "grade", key:'grade', align:'left', width: '80px',
      sorter: (a, b) => a.grade.localeCompare(b.grade),
      render(text, record) {
        return {
          props: {
            style: { color:record.result<51 ?"red":"green"}
          },
          children: 
          <Row style={{display: 'block'}}>
            {text}
          </Row>
        };
      }
    },
    {title: 'Actions', dataIndex: "actions", key:'actions', width:'100px', align:'left',
    render: (text, record) => {
        return (
          <Button type="primary" onClick={()=>(setVisible(true))}>
            View Details
          </Button>
        )
      }
    }
  ]

  const alertColumns = [
    {title: "Name", dataIndex: "name", key:'name', align:'left', width: '150px',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {title: "Class", dataIndex: "class", key:'class', align:'left', width: '80px',
      sorter: (a, b) => a.class.localeCompare(b.class),
    },
    {title: "I am lost", dataIndex: "iAmLost", key:'iAmLost', align:'left', width: '80px',
      sorter: (a, b) => a.iAmLost.localeCompare(b.iAmLost),
    },
    {title: "Slow Down", dataIndex: "slowDown", key:'slowDown', align:'left', width: '80px',
      sorter: (a, b) => a.slowDown.localeCompare(b.slowDown),
    },
    {title: 'Actions', dataIndex: "actions", key:'actions', width:'100px', align:'left', width: '100px',
      render: (text, record) => {
        return (
          <Button type="primary" onClick={()=>{setClassVisible(false); setVisible(true)}}>
            View Details
          </Button>
        )
      }
    }
  ]

  const lessonColumns = [
    {title: "Date", dataIndex: "date", key:'date', align:'left', width: '80px',
    sorter: (a, b) => a.date.localeCompare(b.date),
    },
    {title: "Subject", dataIndex: "subject", key:'subject', align:'left', width: '80px',
      sorter: (a, b) => a.subject.localeCompare(b.subject),
    },
    {title: "Topic", dataIndex: "topic", key:'topic', align:'left', width: '150px',
      sorter: (a, b) => a.topic.localeCompare(b.topic),
    },
    {title: "Score", dataIndex: "score", key:'score', align:'left', width: '80px',
      sorter: (a, b) => a.score.localeCompare(b.score),
    },
    {title: 'Actions', dataIndex: "actions", key:'actions', width:'100px', align:'left',
    render: (text, record) => {
        return (
          <Button type="primary" onClick={()=>(setClassVisible(true))}>
            View Details
          </Button>
        )
      }
    }
  ]

  const ChartResults = ({subject}) => {
    return (
      <Chart
        appendPadding={[10, 0, 0, 10]}
        autoFit
        height={420}
        width={'65vw'}
        data={dataResults(subject)}
        scale={{ marks: { min: 0, alias: 'Results', type: 'linear-strict' }, exam: { range: [0, 1] } }}
      >
      <Line position="exam*marks" />
      <Point position="exam*marks" />
      <Tooltip showCrosshairs />
    </Chart>
    )
  }

  const ChartClass = ({subject}) => {
    return (
      <Chart height={600} data={createOverallSummaryData(subject, dataClass)} autoFit width={'85vw'}>
        <Coordinate transposed/>
        <Tooltip shared />
        <Axis
          name="State"
          label={{
            offset: 12
          }}
        />
        <Interval
          adjust={[{ type: 'stack' }]}
          position="State*人口数量"
          color={"年龄段"}
          style={{
            fillOpacity:0.75
          }}
          label={['人口数量', { position: 'middle', offset: 0, style: { fill: '#fff' }, layout: { type: 'limit-in-shape' } }]}
        />
      </Chart>
    )
  }

  var chartIns

  const onChange = (value, subj) => {
      if(value[0]!=value[1]){
        if(allStudentOverallSummaryData[subj]?.slice(value[0], value[1])){
          var newObj = {
            ...dataClass,
            [subj]: allStudentOverallSummaryData[subj]?.slice(value[0], value[1]),
          }
          setDataClass(newObj)
        }
      }
  }

  return (
    <div className="ReviewDataPage" style={{
      padding: '20px',
    }}>
      <Row>
        <Col span={2}><Button type='primary'>
          <Link to='/lessondata'>
            Back
          </Link>
        </Button></Col>
        <Col span={20}/>
      </Row>
      <Row style={{height: '20px'}}/>
      <Row>
        <Title level={1}>Students' Results</Title>
      </Row>
      <Row>
          <Table
            scroll={{ y: '68vh' }}
            pagination={{ pageSize: 50 }}
            columns={columns}
            dataSource={studentResultsData}
          />
      </Row>
      <Row>
      <Title level={1}>Lesson Data</Title>
      </Row>
      <Row>
        <Table
          scroll={{ y: '68vh' }}
          pagination={{ pageSize: 50 }}
          columns={lessonColumns}
          dataSource={lessonData}
        />
      </Row>
      <Modal
        visible={visible}
        onCancel={()=>{setVisible(false)}}
        footer={false}
        width={'90vw'}
      >
        <div class='hide-scroll' style={{overflowY: 'scroll', height: '80vh', width: '90vw'}}>
          <Row>
            <Col span={18}>
              <Row>
                <Col span={8}>
                  <Title level={3}>
                    Student Data
                  </Title>
                  <Card
                    style={{
                      width: '400px'
                    }}
                    type="inner"
                    bordered={true}
                    title={`Donovan`}
                    bodyStyle={{fontSize: '20px'}}
                  >
                    <Row><Col span={12}>Class:</Col><Col>3E1</Col></Row>
                    <Row><Col span={12}>Average Results:</Col><Col style={{color: 'green'}}>74</Col></Row>
                    <Row><Col span={12}>Average Grade:</Col><Col style={{color: 'green'}}>A2</Col></Row>
                    <Row><Col span={12}>L1R5:</Col><Col>6</Col></Row>
                    <Row><Col span={12}>L1R4:</Col><Col>8</Col></Row>
                  </Card>
                </Col>
                <Col span={16}>
                  <Title level={3}>
                    Student's Goals (9 Subjects)
                  </Title>
                  <Card
                    style={{
                      width: '800px'
                    }}
                    type="inner"
                    bordered={true}
                    title={`Subject Grades`}
                    bodyStyle={{fontSize: '20px'}}
                  >
                    <Row><Col span={6}>English:</Col><Col span={6}>A1</Col><Col span={6}>Chinese:</Col><Col span={6}>A2</Col></Row>
                    <Row><Col span={6}>E Math:</Col><Col span={6}>A2</Col><Col span={6}>A Math:</Col><Col span={6}>B3</Col></Row>
                    <Row><Col span={6}>Physics:</Col><Col span={6}>A2</Col><Col span={6}>Chemistry:</Col><Col span={6}>A2</Col></Row>
                    <Row><Col span={6}>Biology:</Col><Col span={6}>A2</Col><Col span={6}>History:</Col><Col span={6}>A2</Col></Row>
                    <Row><Col span={6}>Literature:</Col><Col span={6}>B3</Col><Col span={6}></Col><Col span={6}></Col></Row>
                  </Card>
                </Col>
              </Row>
              <Title level={3}>
                Past Results
              </Title>
              <Tabs defaultActiveKey="1">
                { 
                  subjectObject.map((item)=>{return(
                    <TabPane tab={item.subj} key={item.key}>
                      <ChartResults subject={item.subj}/>
                    </TabPane>
                  )})
                }
              </Tabs>
            </Col>
            <Col span={6}>
              <Title className="liveChatSubheaders" level={3}>Past Questions</Title>
              <List bordered={false}>
              <div class='hide-scroll' style={{overflowY: 'scroll', height: '74vh', width: '400px'}}>
                {pastQuestions.map(obj =>
                <List.Item bordered={false}>
                  <Card
                    style={{
                      width: '400px'
                    }}
                    type="inner"
                    bordered={false}
                    title={`${obj.name} asked ${obj.timestamp.fromNow()} in ${obj.class}`}
                    bodyStyle={{fontSize: '20px'}}
                  >
                    {obj.message}
                  </Card>
                </List.Item>)}
                </div>
              </List>
            </Col>
          </Row>
          <Row>
            <Title level={3}>
              Overall Summary
            </Title>
          </Row>
          <Row>
            <Tabs defaultActiveKey="1">
              { 
                subjectObject.map((item)=>{return(
                  <TabPane tab={item.subj} key={item.key}>
                    <ChartClass subject={item.subj}/>
                    <Slider 
                      range
                      onChange={(w)=>(onChange(w, item.subj))}
                      defaultValue={[0, 23]}
                      style={{width: '97vw'}}
                      max={23}
                      min={0}
                      included={true}
                      marks={marksObject}
                      style={{margin: '5px 40px 30px 40px'}}
                    />
                  </TabPane>
                )})
              }
            </Tabs>
          </Row>
        </div>
      </Modal>
      <Modal
        visible={classVisible}
        onCancel={()=>{setClassVisible(false)}}
        footer={false}
        width={'90vw'}
      >
        <div class='hide-scroll' style={{overflowY: 'scroll', height: '80vh', width: '90vw'}}>
          <Row>
            <Col span={12}>
              <Title level={3}>
                Class Data
              </Title>
              <Chart height={400} data={lessonClassData} scale={cols} autoFit>
                <Coordinate type="theta" radius={0.75} />
                <Tooltip showTitle={false} />
                <Axis visible={false} />
                <Interval
                  position="percent"
                  adjust="stack"
                  color="item"
                  style={{
                    lineWidth: 1,
                    stroke: '#fff',
                  }}
                  label={['count', {
                    content: (data) => {
                      return `${data.item}: ${data.percent * 100}%`;
                    },
                  }]}
                  state={{
                    selected: {
                      style: (t) => {
                        const res = getTheme().geometries.interval.rect.selected.style(t);
                        return { ...res, fill: 'red' }
                      }
                    }
                  }}
                />
              </Chart>
            </Col>
            <Col span={12}>
              <Title level={3}>
                Student Alert
              </Title>
              <Row>
                <Table
                  columns={alertColumns}
                  dataSource={lessonAlertData}
                  scroll={{ y: '59vh' }}
                  style={{
                    width: '800px'
                  }}
                />
              </Row>
            </Col>
          </Row>
          <Row>
            <Title level={3}>
              Class Data with time
            </Title>
            <Chart
              height={700}
              width={'85vw'}
              data={datas}
              autoFit
              interactions={['legend-highlight', 'brush']}
              onGetG2Instance={(c => {
                chartIns = c;
                c.on('beforepaint', () => {
                  console.log(c.filteredData)
                })
              })}
            >
              <Point
                position="time*student"
                color="type"
                shape="circle"
                style={{
                  fillOpacity: 0.85
                }} />
            </Chart>
          </Row>
        </div>
      </Modal>
    </div>
  )
}

export default ReviewDataPage