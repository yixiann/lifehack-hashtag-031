import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Table, Tabs, Slider, Row, Col, Modal, Typography, List, Card } from 'antd';
import { Chart,Axis,Tooltip,Coordinate, Interval, Point, Line, getTheme, Interaction} from "bizcharts";
import DataSet from '@antv/data-set';

import moment from 'moment';

function ReviewDataPage(props) {

  const classId = new URLSearchParams(window.location.search).get('classId');

  const [ visible, setVisible ] = useState(false)

  const [ classVisible, setClassVisible ] = useState(false)

  const { Title } = Typography

  const { TabPane } = Tabs;

  const subjectObject = [
    {subj: 'English', key: 1},
    {subj: 'Chinese', key: 2},
    {subj: 'E Math', key: 3},
    {subj: 'A Math', key: 4},
    {subj: 'Physics', key: 5},
    {subj: 'Chemistry', key: 6},
    {subj: 'Biology', key: 7},
    {subj: 'History', key: 8},
    {subj: 'Literature', key: 9},
  ]

  const subjectList = subjectObject.map((item)=>{return item.subj})

  const pastQuestions = [
    {name: 'Donovan',message: 'What is going on??',class:'Math',timestamp: moment()},
    {name: 'Donovan',message: 'Redox equations?',class:'Chemistry',timestamp: moment()},
    {name: 'Donovan',message: 'Who is Hitler?',class:'History',timestamp: moment()},
    {name: 'Donovan',message: 'What is art',class:'Art',timestamp: moment()},
    {name: 'Donovan',message: 'What is going on??',class:'Math',timestamp: moment()},
    {name: 'Donovan',message: 'Redox equations?',class:'Chemistry',timestamp: moment()},
    {name: 'Donovan',message: 'Who is Hitler?',class:'History',timestamp: moment()},
    {name: 'Donovan',message: 'What is art',class:'Art',timestamp: moment()},
    {name: 'Donovan',message: 'What is going on??',class:'Math',timestamp: moment()},
    {name: 'Donovan',message: 'Redox equations?',class:'Chemistry',timestamp: moment()},
    {name: 'Donovan',message: 'Who is Hitler?',class:'History',timestamp: moment()},
    {name: 'Donovan',message: 'What is art',class:'Art',timestamp: moment()},
  ]

  const data = [
    {name: 'Amierul Ngan',class:'3E1', gender:'Female', result:'62', grade: 'B4'},
    {name: 'Bishan Meng',class:'3E1', gender:'Male', result:'44', grade: 'E8'},
    {name: 'Cheng Wen Kai ',class:'3E1', gender:'Male', result:'58', grade: 'C5'},
    {name: 'Choong Jia Ling ',class:'3E1', gender:'Female', result:'57', grade: 'C5'},
    {name: 'Hao Rui Lin ',class:'3E1', gender:'Female', result:'40', grade: 'E8'},
    {name: 'Jomo Kwame Meng',class:'3E1', gender:'Female', result:'67', grade: 'B3'},
    {name: 'Koh Ling Hui ',class:'3E1', gender:'Female', result:'51', grade: 'C6'},
    {name: 'Lam Zheng En ',class:'3E1', gender:'Male', result:'70', grade: 'A2'},
    {name: 'Leung Wen Kai ',class:'3E1', gender:'Male', result:'78', grade: 'A1'},
    {name: 'Liew Zhi Hui ',class:'3E1', gender:'Male', result:'83', grade: 'A1'},
    {name: 'Lim Kai Feng ',class:'3E1', gender:'Male', result:'57', grade: 'C5'},
    {name: 'Low Jia Wen ',class:'3E1', gender:'Male', result:'74', grade: 'A2'},
    {name: 'Lu Yan Ling ',class:'3E1', gender:'Female', result:'84', grade: 'A1'},
    {name: 'Lye Jia Sheng ',class:'3E1', gender:'Male', result:'45', grade: 'D7'},
    {name: 'Noorfarzanah Muzammil',class:'3E1', gender:'Female', result:'78', grade: 'A1'},
    {name: 'Oon Yi Xi ',class:'3E1', gender:'Female', result:'61', grade: 'B4'},
    {name: 'Poon Jia De ',class:'3E1', gender:'Female', result:'43', grade: 'E8'},
    {name: 'Pria Zulkhairie',class:'3E1', gender:'Female', result:'50', grade: 'C6'},
    {name: 'Qian Jia Jia ',class:'3E1', gender:'Male', result:'83', grade: 'A1'},
    {name: 'Tatparanandam Idris',class:'3E1', gender:'Male', result:'65', grade: 'B3'},
    {name: 'Teu Ngu Gurusamy',class:'3E1', gender:'Male', result:'49', grade: 'D7'},
    {name: 'To Mei Ratnam',class:'3E1', gender:'Female', result:'54', grade: 'C6'},
    {name: 'Toh Jia Min ',class:'3E1', gender:'Male', result:'64', grade: 'B4'},
    {name: 'Umasundari Salleh',class:'3E1', gender:'Male', result:'46', grade: 'D7'},
    {name: 'Woo Jun Jie ',class:'3E1', gender:'Male', result:'40', grade: 'D7'},
    {name: 'Yang Kok Meng ',class:'3E1', gender:'Male', result:'76', grade: 'A1'},
    {name: 'Yeung Jia De ',class:'3E1', gender:'Female', result:'84', grade: 'A1'},
    {name: 'Zhu Xi Ling ',class:'3E1', gender:'Female', result:'73', grade: 'A2'},
    {name: 'Zhuo Yi Xin ',class:'3E1', gender:'Male', result:'72', grade: 'A2'},
  ]

  const dataLessonClass = [
		{ item: 'I understand', count: 40, percent: 0.4 },
		{ item: 'I am lost', count: 21, percent: 0.21 },
		{ item: 'Slow Down', count: 17, percent: 0.17 },
		{ item: 'Speed Up', count: 13, percent: 0.13 },
	];

	const cols = {
		percent: {
			formatter: val => {
				val = val * 100 + '%';
				return val;
			},
		},
	};

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const dataQuestions = [
    // {State: "15-06-21","I understand": getRandomInt(10),"I am lost": getRandomInt(10), "Slow Down": getRandomInt(10), "Speed Up": getRandomInt(10)},
    // {State: "16-06-21","I understand": getRandomInt(10),"I am lost": getRandomInt(10), "Slow Down": getRandomInt(10), "Speed Up": getRandomInt(10)},
    // {State: "17-06-21","I understand": getRandomInt(10),"I am lost": getRandomInt(10), "Slow Down": getRandomInt(10), "Speed Up": getRandomInt(10)},
    // {State: "18-06-21","I understand": getRandomInt(10),"I am lost": getRandomInt(10), "Slow Down": getRandomInt(10), "Speed Up": getRandomInt(10)},
    // {State: "19-06-21","I understand": getRandomInt(10),"I am lost": getRandomInt(10), "Slow Down": getRandomInt(10), "Speed Up": getRandomInt(10)},
    // {State: "20-06-21","I understand": getRandomInt(10),"I am lost": getRandomInt(10), "Slow Down": getRandomInt(10), "Speed Up": getRandomInt(10)},
    // {State: "21-06-21","I understand": getRandomInt(10),"I am lost": getRandomInt(10), "Slow Down": getRandomInt(10), "Speed Up": getRandomInt(10)},
    // {State: "22-06-21","I understand": getRandomInt(10),"I am lost": getRandomInt(10), "Slow Down": getRandomInt(10), "Speed Up": getRandomInt(10)},
    // {State: "23-06-21","I understand": getRandomInt(10),"I am lost": getRandomInt(10), "Slow Down": getRandomInt(10), "Speed Up": getRandomInt(10)},
    // {State: "24-06-21","I understand": getRandomInt(10),"I am lost": getRandomInt(10), "Slow Down": getRandomInt(10), "Speed Up": getRandomInt(10)},
    // {State: "25-06-21","I understand": getRandomInt(10),"I am lost": getRandomInt(10), "Slow Down": getRandomInt(10), "Speed Up": getRandomInt(10)},
    // {State: "26-06-21","I understand": getRandomInt(10),"I am lost": getRandomInt(10), "Slow Down": getRandomInt(10), "Speed Up": getRandomInt(10)},
    // {State: "27-06-21","I understand": getRandomInt(10),"I am lost": getRandomInt(10), "Slow Down": getRandomInt(10), "Speed Up": getRandomInt(10)},
    // {State: "28-06-21","I understand": getRandomInt(10),"I am lost": getRandomInt(10), "Slow Down": getRandomInt(10), "Speed Up": getRandomInt(10)},
    // {State: "29-06-21","I understand": getRandomInt(10),"I am lost": getRandomInt(10), "Slow Down": getRandomInt(10), "Speed Up": getRandomInt(10)},
    // {State: "30-06-21","I understand": getRandomInt(10),"I am lost": getRandomInt(10), "Slow Down": getRandomInt(10), "Speed Up": getRandomInt(10)},
    // {State: "01-07-21","I understand": getRandomInt(10),"I am lost": getRandomInt(10), "Slow Down": getRandomInt(10), "Speed Up": getRandomInt(10)},
    {State: "02-07-21","I understand": getRandomInt(10),"I am lost": getRandomInt(10), "Slow Down": getRandomInt(10), "Speed Up": getRandomInt(10)},
    {State: "03-07-21","I understand": getRandomInt(10),"I am lost": getRandomInt(10), "Slow Down": getRandomInt(10), "Speed Up": getRandomInt(10)},
    {State: "04-07-21","I understand": getRandomInt(10),"I am lost": getRandomInt(10), "Slow Down": getRandomInt(10), "Speed Up": getRandomInt(10)},
    {State: "05-07-21","I understand": getRandomInt(10),"I am lost": getRandomInt(10), "Slow Down": getRandomInt(10), "Speed Up": getRandomInt(10)},
    {State: "06-07-21","I understand": getRandomInt(10),"I am lost": getRandomInt(10), "Slow Down": getRandomInt(10), "Speed Up": getRandomInt(10)},
    {State: "07-07-21","I understand": getRandomInt(10),"I am lost": getRandomInt(10), "Slow Down": getRandomInt(10), "Speed Up": getRandomInt(10)},
    {State: "08-07-21","I understand": getRandomInt(10),"I am lost": getRandomInt(10), "Slow Down": getRandomInt(10), "Speed Up": getRandomInt(10)},
    {State: "09-07-21","I understand": getRandomInt(10),"I am lost": getRandomInt(10), "Slow Down": getRandomInt(10), "Speed Up": getRandomInt(10)},
    {State: "10-07-21","I understand": getRandomInt(10),"I am lost": getRandomInt(10), "Slow Down": getRandomInt(10), "Speed Up": getRandomInt(10)},
    {State: "11-07-21","I understand": getRandomInt(10),"I am lost": getRandomInt(10), "Slow Down": getRandomInt(10), "Speed Up": getRandomInt(10)},
    {State: "12-07-21","I understand": getRandomInt(10),"I am lost": getRandomInt(10), "Slow Down": getRandomInt(10), "Speed Up": getRandomInt(10)},
    {State: "13-07-21","I understand": getRandomInt(10),"I am lost": getRandomInt(10), "Slow Down": getRandomInt(10), "Speed Up": getRandomInt(10)},
    {State: "14-07-21","I understand": getRandomInt(10),"I am lost": getRandomInt(10), "Slow Down": getRandomInt(10), "Speed Up": getRandomInt(10)},
    {State: "15-07-21","I understand": getRandomInt(10),"I am lost": getRandomInt(10), "Slow Down": getRandomInt(10), "Speed Up": getRandomInt(10)},
    {State: "16-07-21","I understand": getRandomInt(10),"I am lost": getRandomInt(10), "Slow Down": getRandomInt(10), "Speed Up": getRandomInt(10)},
    {State: "17-07-21","I understand": getRandomInt(10),"I am lost": getRandomInt(10), "Slow Down": getRandomInt(10), "Speed Up": getRandomInt(10)},
    {State: "18-07-21","I understand": getRandomInt(10),"I am lost": getRandomInt(10), "Slow Down": getRandomInt(10), "Speed Up": getRandomInt(10)},
    {State: "19-07-21","I understand": getRandomInt(10),"I am lost": getRandomInt(10), "Slow Down": getRandomInt(10), "Speed Up": getRandomInt(10)},
    {State: "20-07-21","I understand": getRandomInt(10),"I am lost": getRandomInt(10), "Slow Down": getRandomInt(10), "Speed Up": getRandomInt(10)},
    {State: "21-07-21","I understand": getRandomInt(10),"I am lost": getRandomInt(10), "Slow Down": getRandomInt(10), "Speed Up": getRandomInt(10)},
    {State: "22-07-21","I understand": getRandomInt(10),"I am lost": getRandomInt(10), "Slow Down": getRandomInt(10), "Speed Up": getRandomInt(10)},
    {State: "23-07-21","I understand": getRandomInt(10),"I am lost": getRandomInt(10), "Slow Down": getRandomInt(10), "Speed Up": getRandomInt(10)},
    {State: "24-07-21","I understand": getRandomInt(10),"I am lost": getRandomInt(10), "Slow Down": getRandomInt(10), "Speed Up": getRandomInt(10)},
  ];

  const lessonData = [
    // {date: "15-06-21", subject: subjectList[getRandomInt(9)], topic: `Chapter ${getRandomInt(10)+1}`, score: `${getRandomInt(100)}/100`},
    // {date: "16-06-21", subject: subjectList[getRandomInt(9)], topic: `Chapter ${getRandomInt(10)+1}`, score: `${getRandomInt(100)}/100`},
    // {date: "17-06-21", subject: subjectList[getRandomInt(9)], topic: `Chapter ${getRandomInt(10)+1}`, score: `${getRandomInt(100)}/100`},
    // {date: "18-06-21", subject: subjectList[getRandomInt(9)], topic: `Chapter ${getRandomInt(10)+1}`, score: `${getRandomInt(100)}/100`},
    // {date: "19-06-21", subject: subjectList[getRandomInt(9)], topic: `Chapter ${getRandomInt(10)+1}`, score: `${getRandomInt(100)}/100`},
    // {date: "20-06-21", subject: subjectList[getRandomInt(9)], topic: `Chapter ${getRandomInt(10)+1}`, score: `${getRandomInt(100)}/100`},
    // {date: "21-06-21", subject: subjectList[getRandomInt(9)], topic: `Chapter ${getRandomInt(10)+1}`, score: `${getRandomInt(100)}/100`},
    // {date: "22-06-21", subject: subjectList[getRandomInt(9)], topic: `Chapter ${getRandomInt(10)+1}`, score: `${getRandomInt(100)}/100`},
    // {date: "23-06-21", subject: subjectList[getRandomInt(9)], topic: `Chapter ${getRandomInt(10)+1}`, score: `${getRandomInt(100)}/100`},
    // {date: "24-06-21", subject: subjectList[getRandomInt(9)], topic: `Chapter ${getRandomInt(10)+1}`, score: `${getRandomInt(100)}/100`},
    // {date: "25-06-21", subject: subjectList[getRandomInt(9)], topic: `Chapter ${getRandomInt(10)+1}`, score: `${getRandomInt(100)}/100`},
    // {date: "26-06-21", subject: subjectList[getRandomInt(9)], topic: `Chapter ${getRandomInt(10)+1}`, score: `${getRandomInt(100)}/100`},
    // {date: "27-06-21", subject: subjectList[getRandomInt(9)], topic: `Chapter ${getRandomInt(10)+1}`, score: `${getRandomInt(100)}/100`},
    // {date: "28-06-21", subject: subjectList[getRandomInt(9)], topic: `Chapter ${getRandomInt(10)+1}`, score: `${getRandomInt(100)}/100`},
    // {date: "29-06-21", subject: subjectList[getRandomInt(9)], topic: `Chapter ${getRandomInt(10)+1}`, score: `${getRandomInt(100)}/100`},
    // {date: "30-06-21", subject: subjectList[getRandomInt(9)], topic: `Chapter ${getRandomInt(10)+1}`, score: `${getRandomInt(100)}/100`},
    // {date: "01-07-21", subject: subjectList[getRandomInt(9)], topic: `Chapter ${getRandomInt(10)+1}`, score: `${getRandomInt(100)}/100`},
    // {date: "02-07-21", subject: subjectList[getRandomInt(9)], topic: `Chapter ${getRandomInt(10)+1}`, score: `${getRandomInt(100)}/100`},
    // {date: "03-07-21", subject: subjectList[getRandomInt(9)], topic: `Chapter ${getRandomInt(10)+1}`, score: `${getRandomInt(100)}/100`},
    {date: "04-07-21", subject: subjectList[getRandomInt(9)], topic: `Chapter ${getRandomInt(10)+1}`, score: `${getRandomInt(100)}/100`},
    {date: "05-07-21", subject: subjectList[getRandomInt(9)], topic: `Chapter ${getRandomInt(10)+1}`, score: `${getRandomInt(100)}/100`},
    {date: "06-07-21", subject: subjectList[getRandomInt(9)], topic: `Chapter ${getRandomInt(10)+1}`, score: `${getRandomInt(100)}/100`},
    {date: "07-07-21", subject: subjectList[getRandomInt(9)], topic: `Chapter ${getRandomInt(10)+1}`, score: `${getRandomInt(100)}/100`},
    {date: "08-07-21", subject: subjectList[getRandomInt(9)], topic: `Chapter ${getRandomInt(10)+1}`, score: `${getRandomInt(100)}/100`},
    {date: "09-07-21", subject: subjectList[getRandomInt(9)], topic: `Chapter ${getRandomInt(10)+1}`, score: `${getRandomInt(100)}/100`},
    {date: "10-07-21", subject: subjectList[getRandomInt(9)], topic: `Chapter ${getRandomInt(10)+1}`, score: `${getRandomInt(100)}/100`},
    {date: "11-07-21", subject: subjectList[getRandomInt(9)], topic: `Chapter ${getRandomInt(10)+1}`, score: `${getRandomInt(100)}/100`},
    {date: "12-07-21", subject: subjectList[getRandomInt(9)], topic: `Chapter ${getRandomInt(10)+1}`, score: `${getRandomInt(100)}/100`},
    {date: "13-07-21", subject: subjectList[getRandomInt(9)], topic: `Chapter ${getRandomInt(10)+1}`, score: `${getRandomInt(100)}/100`},
    {date: "14-07-21", subject: subjectList[getRandomInt(9)], topic: `Chapter ${getRandomInt(10)+1}`, score: `${getRandomInt(100)}/100`},
    {date: "15-07-21", subject: subjectList[getRandomInt(9)], topic: `Chapter ${getRandomInt(10)+1}`, score: `${getRandomInt(100)}/100`},
    {date: "16-07-21", subject: subjectList[getRandomInt(9)], topic: `Chapter ${getRandomInt(10)+1}`, score: `${getRandomInt(100)}/100`},
    {date: "17-07-21", subject: subjectList[getRandomInt(9)], topic: `Chapter ${getRandomInt(10)+1}`, score: `${getRandomInt(100)}/100`},
    {date: "18-07-21", subject: subjectList[getRandomInt(9)], topic: `Chapter ${getRandomInt(10)+1}`, score: `${getRandomInt(100)}/100`},
    {date: "19-07-21", subject: subjectList[getRandomInt(9)], topic: `Chapter ${getRandomInt(10)+1}`, score: `${getRandomInt(100)}/100`},
    {date: "20-07-21", subject: subjectList[getRandomInt(9)], topic: `Chapter ${getRandomInt(10)+1}`, score: `${getRandomInt(100)}/100`},
    {date: "21-07-21", subject: subjectList[getRandomInt(9)], topic: `Chapter ${getRandomInt(10)+1}`, score: `${getRandomInt(100)}/100`},
    {date: "22-07-21", subject: subjectList[getRandomInt(9)], topic: `Chapter ${getRandomInt(10)+1}`, score: `${getRandomInt(100)}/100`},
    {date: "23-07-21", subject: subjectList[getRandomInt(9)], topic: `Chapter ${getRandomInt(10)+1}`, score: `${getRandomInt(100)}/100`},
    {date: "24-07-21", subject: subjectList[getRandomInt(9)], topic: `Chapter ${getRandomInt(10)+1}`, score: `${getRandomInt(100)}/100`},
  ];
  
  const marksObject = dataQuestions.map((item)=>{
    return item.State
  })

  const alertDataSource = [
    {name: 'Poon Jia De ',class:'3E1', iAmLost: 18, slowDown: 17, grade: 'E8'},
    {name: 'Umasundari Salleh',class:'3E1', iAmLost: 11, slowDown: 19, grade: 'D7'},
    {name: 'Woo Jun Jie ',class:'3E1', iAmLost: 10, slowDown: 18, grade: 'D7'},
    {name: 'Lye Jia Sheng ',class:'3E1', iAmLost: 9, slowDown: 15, grade: 'D7'},
    {name: 'Cheng Wen Kai ',class:'3E1', iAmLost: 11, slowDown: 6, grade: 'C5'},
  ]

  const [ dataClass, setDataClass ] = useState(dataQuestions)

  useEffect(()=>{
    if(!dataClass){
      setDataClass(dataQuestions)
    }
  },[dataQuestions])

  const ds = new DataSet();
  const dv = ds.createView().source(dataClass);
  dv.transform({
    type: "fold",
    fields: ["I understand", "I am lost", "Slow Down", "Speed Up"],
    key: "年龄段",
    value: "人口数量",
    retains: ["State"]
  });

  
  let chartIns;
  const [datas, setDatas] = useState();
  useEffect(() => {
    // fetch('https://alifd.alibabausercontent.com/materials/@bizcharts/point-scatter/0.2.8/mock.json')
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log(data)
    //     setDatas(data?.slice(10));
    //   })
    const newDatas = [
      {type: "I am lost", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I understand", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Slow down", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Speed up", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I am lost", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I understand", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Slow down", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Speed up", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I am lost", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I understand", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Slow down", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Speed up", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I am lost", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I understand", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Slow down", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Speed up", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I am lost", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I understand", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Slow down", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Speed up", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I am lost", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I understand", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Slow down", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Speed up", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I am lost", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I understand", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Slow down", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Speed up", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I am lost", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I understand", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Slow down", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Speed up", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I am lost", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I understand", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Slow down", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Speed up", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I am lost", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I understand", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Slow down", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Speed up", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I am lost", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I understand", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Slow down", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Speed up", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I am lost", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I understand", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Slow down", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Speed up", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I am lost", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I understand", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Slow down", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Speed up", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I am lost", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I understand", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Slow down", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Speed up", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I am lost", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I understand", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Slow down", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Speed up", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I am lost", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I understand", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Slow down", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Speed up", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I am lost", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I understand", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Slow down", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Speed up", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I am lost", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I understand", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Slow down", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Speed up", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I am lost", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I understand", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Slow down", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Speed up", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I am lost", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I understand", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Slow down", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Speed up", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I am lost", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I understand", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Slow down", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Speed up", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I am lost", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I understand", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Slow down", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Speed up", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I am lost", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I understand", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Slow down", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Speed up", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I am lost", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I understand", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Slow down", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Speed up", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I am lost", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I understand", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Slow down", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Speed up", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I am lost", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I understand", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Slow down", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Speed up", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I am lost", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I understand", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Slow down", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Speed up", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I am lost", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I understand", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Slow down", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Speed up", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I am lost", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I understand", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Slow down", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Speed up", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I am lost", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I understand", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Slow down", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Speed up", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I am lost", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I understand", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Slow down", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Speed up", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I am lost", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I understand", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Slow down", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Speed up", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I am lost", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I understand", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Slow down", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Speed up", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I am lost", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I understand", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Slow down", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Speed up", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I am lost", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I understand", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Slow down", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Speed up", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I am lost", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I understand", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Slow down", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Speed up", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I am lost", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I understand", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Slow down", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Speed up", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I am lost", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I understand", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Slow down", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Speed up", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I am lost", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I understand", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Slow down", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Speed up", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I am lost", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I understand", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Slow down", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Speed up", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I am lost", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I understand", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Slow down", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Speed up", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I am lost", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I understand", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Slow down", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Speed up", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I am lost", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I understand", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Slow down", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Speed up", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I am lost", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I understand", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Slow down", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Speed up", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I am lost", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I understand", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Slow down", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Speed up", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I am lost", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I understand", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Slow down", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Speed up", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I am lost", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I understand", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Slow down", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Speed up", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I am lost", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I understand", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Slow down", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Speed up", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I am lost", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I understand", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Slow down", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Speed up", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I am lost", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I understand", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Slow down", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Speed up", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I am lost", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I understand", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Slow down", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Speed up", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I am lost", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I understand", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Slow down", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Speed up", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I am lost", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I understand", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Slow down", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Speed up", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I am lost", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "I understand", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Slow down", time: getRandomInt(50), student: data[getRandomInt(25)].name},
      {type: "Speed up", time: getRandomInt(50), student: data[getRandomInt(25)].name},
    ]
    setDatas(newDatas)
  }, [])



  const dataResults = (item) => {
    const allResults = {
      "English": [
        {exam: "WA1",marks: 40+getRandomInt(40)},
        {exam: "WA2",marks: 40+getRandomInt(40)},
        {exam: "WA3",marks: 40+getRandomInt(40)},
        {exam: "WA4",marks: 40+getRandomInt(40)},
      ],
      "Chinese": [
        {exam: "WA1",marks: 40+getRandomInt(40)},
        {exam: "WA2",marks: 40+getRandomInt(40)},
        {exam: "WA3",marks: 40+getRandomInt(40)},
        {exam: "WA4",marks: 40+getRandomInt(40)},
      ],
      "E Math": [
        {exam: "WA1",marks: 40+getRandomInt(40)},
        {exam: "WA2",marks: 40+getRandomInt(40)},
        {exam: "WA3",marks: 40+getRandomInt(40)},
        {exam: "WA4",marks: 40+getRandomInt(40)},
      ],
      "A Math": [
        {exam: "WA1",marks: 40+getRandomInt(40)},
        {exam: "WA2",marks: 40+getRandomInt(40)},
        {exam: "WA3",marks: 40+getRandomInt(40)},
        {exam: "WA4",marks: 40+getRandomInt(40)},
      ],
      "Physics": [
        {exam: "WA1",marks: 40+getRandomInt(40)},
        {exam: "WA2",marks: 40+getRandomInt(40)},
        {exam: "WA3",marks: 40+getRandomInt(40)},
        {exam: "WA4",marks: 40+getRandomInt(40)},
      ],
      "Chemistry": [
        {exam: "WA1",marks: 40+getRandomInt(40)},
        {exam: "WA2",marks: 40+getRandomInt(40)},
        {exam: "WA3",marks: 40+getRandomInt(40)},
        {exam: "WA4",marks: 40+getRandomInt(40)},
      ],
      "Biology": [
        {exam: "WA1",marks: 40+getRandomInt(40)},
        {exam: "WA2",marks: 40+getRandomInt(40)},
        {exam: "WA3",marks: 40+getRandomInt(40)},
        {exam: "WA4",marks: 40+getRandomInt(40)},
      ],
      "History": [
        {exam: "WA1",marks: 40+getRandomInt(40)},
        {exam: "WA2",marks: 40+getRandomInt(40)},
        {exam: "WA3",marks: 40+getRandomInt(40)},
        {exam: "WA4",marks: 40+getRandomInt(40)},
      ],
      "Literature": [
        {exam: "WA1",marks: 40+getRandomInt(40)},
        {exam: "WA2",marks: 40+getRandomInt(40)},
        {exam: "WA3",marks: 40+getRandomInt(40)},
        {exam: "WA4",marks: 40+getRandomInt(40)},
      ],
    }
    return allResults[item]
  }

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
          <Button type="primary" onClick={()=>(setVisible(true))}>
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
      <Chart height={600} data={dv.rows} autoFit width={'85vw'}>
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

  const onChange = (value) => {
      if(value[0]!=value[1]){
        if(dataQuestions.slice(value[0], value[1])){
          setDataClass(dataQuestions.slice(value[0], value[1]))
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
            dataSource={data}
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
              <List className="liveChat" bordered={false}>
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
                      onChange={(w)=>(onChange(w))}
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
              <Chart height={400} data={dataLessonClass} scale={cols} autoFit>
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
                  dataSource={alertDataSource}
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