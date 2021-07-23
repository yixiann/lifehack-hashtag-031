import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { Button, Table, Form, Input, Typography } from 'antd';
import axios from 'axios';
import URI, { convertToFormData } from '../../constants/URL'
import API from '../../API'
import { confirmationModal, errorModal, successModal } from '../../components/UI/submissionModal';
import moment from 'moment';

function ReviewDataPage(props) {

  const classId = new URLSearchParams(window.location.search).get('classId');

  return (
    <div className="ReviewDataPage">
    {classId}
    ReviewDATa
    </div>
  )
}

export default ReviewDataPage
