import axios from 'axios';

const setHeaders = (user) => {
  localStorage.setItem('uid', user.uid) 
  localStorage.setItem('client', user.client)
  localStorage.setItem('access-token', user['access-token'])
  return {'uid': localStorage.uid, 'client': localStorage.client,
          'access-token': localStorage['access-token'] }
}

const makeParams = (params) => {
  params.personal_id = parseInt(params.personal_id)
  params.telephone_number = parseInt(params.telephone_number)
  params.mobile_pay = parseInt(params.mobile_pay)
  return params
}

  export const beneficiaryData = async function loadData(user){
  return await axios.get('http://localhost:3001/', { headers: localStorage})
    .then(function (response) {
      setHeaders(response.headers)
      return response
    })
    .catch(function (error) {
      return error;
    })
  }

  export const signIn = async function logIn(body, setUser) {
    return await axios.post('http://localhost:3001/auth/sign_in', body)
      .then(function (response) {
        setHeaders(response.headers)
        setUser(true)
        return response
      })
      .catch(function (error) {
        return error      
      })
  }

  export const signOut = async function logOut() {
    return await axios.delete('http://localhost:3001/auth/sign_out', {headers: localStorage})
      .then(function (response) {
        localStorage.clear()
        return response
      })
      .catch(function (error) {
        return error      
      })
  }

  export const createBeneficiary = async function create(params) {
    const body = makeParams(params)
    return await axios.post('http://localhost:3001/beneficiary', body, {headers: localStorage})
      .then(function (response) {
        setHeaders(response.headers)
        return response
      })
      .catch(function (error) {
        return error      
      })
  }