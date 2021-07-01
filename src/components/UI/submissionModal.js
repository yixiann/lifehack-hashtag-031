import React from 'react';
import swal from '@sweetalert/with-react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons'


export const successModal = (message) => {
  swal({
    title: "Success",
    text: message,
    icon: "success",
    className: "success-swal"
  });
}


export const loadingModal = (titleLoading, textLoading) => {
  const icon = <LoadingOutlined style={{ fontSize: 100, margin:"30px 0px" }} spin />;
  swal({
    title: titleLoading,
    text: textLoading,
    className: "loading-swal", 
    closeOnClickOutside: false,
    content: (
      <Spin indicator={icon}/>
    ),
    button: false
  })
}

export const errorModal = (message) => {
  swal({
    title: "Error",
    text: message,
    icon: "error",
    className: "error-swal"
    // button: false, //uncomment if button it to be hidden
  });
}

export const confirmationModal = ({
 
    title,
    text,
    loading = true,
    titleLoading,
    textLoading,
    functionCalled,
    data,
    functionCancel = () => {return true}, // New to define a value to not fail
    dataCancel

  }) => {

  swal({
    title: title,
    text: text,
    icon: "warning",
    className: "confirmation-swal", 
    buttons: {
      confirm: {
        text: "Confirm",
        value: true,
        visible: true,
        closeModal: true
      },
      cancel: {
        text: "Cancel",
        value: false,
        visible: true,
        closeModal: true,
      }
    },
    dangerMode: true,
  })
  .then((confirm) => {
    if(confirm){
      const icon = <LoadingOutlined style={{ fontSize: 100, margin:"30px 0px" }} spin />;
      if(loading){
        swal({
          title: titleLoading,
          text: textLoading,
          className: "loading-swal", 
          closeOnClickOutside: false,
          content: (
            <Spin indicator={icon}/>
          ),
          button: false
        })
      }
      functionCalled(data)
    } else {
      functionCancel(dataCancel)
    }
  });
}