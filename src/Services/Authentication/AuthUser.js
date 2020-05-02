import axios from 'axios';
import { setHeaders, getHeaders } from '../../Commons/Commons'

export const signInUser = async function logIn(body, setSession) {
  return await axios.post(`${process.env.REACT_APP_API_URL}user_auth/sign_in`, body)
    .then(function (response) {
      setHeaders(response.headers)
      setSession(true)
      return response
    })
    .catch(function (error) {
      localStorage.clear()
      return error
    })
}

export const signOutUser = async function logOut(setSession) {
  return await axios.delete(`${process.env.REACT_APP_API_URL}user_auth/sign_out`, {headers: getHeaders()})
    .then(function (response) {
      localStorage.clear()
      setSession(false)
      return response
    })
    .catch(function (error) {
      return error
    })
}
