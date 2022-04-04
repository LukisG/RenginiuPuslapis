import axios from 'axios'
import toast from 'react-hot-toast';
const API_URL = 'http://127.0.0.1:5000/api/users/login/'

const login = async (userData) => {
  const response = await axios.post(API_URL, userData)
    .catch(function (error) {
      if (error.response) {
        toast.error('wrong password or email! Try again!')
      }})

      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data.responseBody))
      }

      return response.data
    }
const logout = () => {
    localStorage.removeItem('user')
  }
  const authService = {
    logout,
    login,
  }

  export default authService