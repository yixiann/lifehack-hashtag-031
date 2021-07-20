import axios from "axios"

export default axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'jwt '.concat(window.localStorage.getItem('token'))
  }
})