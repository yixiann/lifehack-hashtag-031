import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { Button, Table, Form, Input, Typography } from 'antd';
import axios from 'axios';
import URI, { convertToFormData } from '../../constants/URL'
import API from '../../API'
import { confirmationModal, errorModal, successModal } from '../../components/UI/submissionModal';
import moment from 'moment';

export const LessonDataPage = (props) => {

  const { Title } = Typography
  const dataSource = [
    {
      classId: 1,
      className: "1A",
      subject: "History",
      dateStart: moment("202107230900", "YYYYMMDDHHmm"),
      dateEnd: moment("202107231100", "YYYYMMDDHHmm"),
      remarks: "New topic WWII with group discussion",
    },
    {
      classId: 2,
      className: "4J",
      subject: "A-Math",
      dateStart: moment("202107241000", "YYYYMMDDHHmm"),
      dateEnd: moment("202107241145", "YYYYMMDDHHmm"),
      remarks: "Vectors using geoGebra",
    },
    {
      classId: 3,
      className: "5N",
      subject: "A-Math",
      dateStart: moment("202107241800", "YYYYMMDDHHmm"),
      dateEnd: moment("202107241900", "YYYYMMDDHHmm"),
      remarks: "Vectors with physical props",
    },
    {
      classId: 4,
      className: "1C",
      subject: "History",
      dateStart: moment("202107251345", "YYYYMMDDHHmm"),
      dateEnd: moment("202107251500", "YYYYMMDDHHmm"),
      remarks: "New topic WWII with movie trailler",
    },
    {
      classId: 5,
      className: "1A",
      subject: "English",
      dateStart: moment("202107250800", "YYYYMMDDHHmm"),
      dateEnd: moment("2021072511000", "YYYYMMDDHHmm"),
      remarks: "Revisioin for EOY",
    },
]
  const tableColumns = [
    {
      title: "Class Name",
      dataIndex: "className",
    },
    {
      title: "Subject",
      dataIndex: "subject",
    },
    {
      title: "Started at",
      dataIndex: "dateStart",
      render(data) {return data.format("YYYY-MM-DD HH:mm")}
    },
    {
      title: "Ended at",
      dataIndex: "dateEnd",
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
        return record.dateStart > moment()
        ? "Upcoming"
        : record.dateStart < moment() && record.dateEnd > moment()
          ? <Link to={`lessondata/livedata?classId=${record.classId}`}>View Live</Link>
          : <Link to={`lessondata/reviewdata?classId=${record.classId}`}>Review Data</Link> 
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