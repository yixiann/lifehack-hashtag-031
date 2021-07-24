import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Table, Typography } from 'antd';
import API from '../../API'
import moment from 'moment';

export const LessonDataPage = (props) => {

  const { Title } = Typography
  const [dataSource, setdataSource] = useState([
    {
      classid: 1,
      classname: "1A",
      subject: "History",
      datestart: moment("202107230900", "YYYYMMDDHHmm"),
      dateend: moment("202107231100", "YYYYMMDDHHmm"),
      remarks: "New topic WWII with group discussion",
    },
    {
      classid: 2,
      classname: "4J",
      subject: "A-Math",
      datestart: moment("202107241000", "YYYYMMDDHHmm"),
      dateend: moment("202107241145", "YYYYMMDDHHmm"),
      remarks: "Vectors using geoGebra",
    },
    {
      classid: 3,
      classname: "5N",
      subject: "A-Math",
      datestart: moment("202107241800", "YYYYMMDDHHmm"),
      dateend: moment("202107241900", "YYYYMMDDHHmm"),
      remarks: "Vectors with physical props",
    },
    {
      classid: 4,
      classname: "1C",
      subject: "History",
      datestart: moment("202107251345", "YYYYMMDDHHmm"),
      dateend: moment("202107251500", "YYYYMMDDHHmm"),
      remarks: "New topic WWII with movie trailler",
    },
    {
      classid: 5,
      classname: "1A",
      subject: "English",
      datestart: moment("202107250800", "YYYYMMDDHHmm"),
      dateend: moment("2021072511000", "YYYYMMDDHHmm"),
      remarks: "Revisioin for EOY",
    },
])
useEffect(() => {
  API.get("/api/class")
  .then(resp => setdataSource(resp.data.map(obj => ({...obj, datestart: moment(obj.datestart), dateend: moment(obj.dateend)}))))
  .catch(err => console.log(err))
},[])

  const tableColumns = [
    {
      title: "Class Name",
      dataIndex: "classname",
    },
    {
      title: "Subject",
      dataIndex: "subject",
    },
    {
      title: "Started at",
      dataIndex: "datestart",
      render(data) {return data.format("YYYY-MM-DD HH:mm")}
    },
    {
      title: "Ended at",
      dataIndex: "dateend",
      render(data) {return data.format("YYYY-MM-DD HH:mm")}

    },
    {
      title: "Remarks",
      dataIndex: "remarks",
    },
    {
      title: "Action",
      dataIndex: "action",
      render(text, record) {
        return record.datestart > moment()
        ? "Upcoming"
        : record.datestart < moment() && record.dateend > moment()
          ? <Link to={`lessondata/livedata?classid=${record.classid}`}>View Live</Link>
          : <Link to={`lessondata/reviewdata?classid=${record.classid}`}>Review Data</Link> 
      }
    }
  ]
  return (
    <div className="LessonDataPage">
      <Title>Lesson Data Dashboard</Title>
      <Table 
      columns={tableColumns}
      dataSource={dataSource}
      />
    </div>
  )

}

export default LessonDataPage