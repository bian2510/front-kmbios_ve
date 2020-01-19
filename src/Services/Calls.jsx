import axios from 'axios';

const setHeaders = (user) => {
  let headers = {'uid': '', 'client': '', 'access-token': ''}
  headers.uid = user.uid 
  headers.client = user.client
  headers['access-token'] = user['access-token']
  return headers
}

  export const beneficiaryData = async function loadData(user, setUser){
    console.log(user)
  return await axios.get('http://localhost:3001/', { headers: user })
    .then(function (response) {
      return response
    })
    .catch(function (error) {
      return error;
    })
  }

  export const signIn = async function logIn(body, setUser) {
    return await axios.post('http://localhost:3001/auth/sign_in', body)
      .then(function (response) {
        setUser(response.headers)
        return response
      })
      .catch(function (error) {
        return error      
      })
  }

  export const signOut = async function logOut(user, setUser) {
    return await axios.delete('http://localhost:3001/auth/sign_out', {headers: setHeaders(user)})
      .then(function (response) {
        setUser(response.headers)
        return response
      })
      .catch(function (error) {
        return error      
      })
  }