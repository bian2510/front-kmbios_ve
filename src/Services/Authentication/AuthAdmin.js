import axios from 'axios';
import { setHeaders, getHeaders } from "../../Commons/Commons";

export const signInAdmin = async function logIn(body, setSession, setAdmin) {
  return await axios.post(`${process.env.REACT_APP_API_URL}admin_auth/sign_in`, body)
    .then(function (response) {
      setHeaders(response.headers)
      setAdmin(true)
      setSession(true)
      return response
    })
    .catch(function (error) {
      localStorage.clear()
      return error
    })
}

export const signOutAdmin = async function logOut(setSession, setAdmin, admin) {
  return await axios.delete(`${process.env.REACT_APP_API_URL}admin_auth/sign_out`, {headers: getHeaders()})
    .then(function (response) {
      localStorage.clear()
      setAdmin(false)
      setSession(false)
      return response
    })
    .catch(function (error) {
      return error
    })
}
