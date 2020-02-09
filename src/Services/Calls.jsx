import axios from 'axios';

const setHeaders = (user) => {
  if (user['access-token'] !== "") {
    localStorage.setItem('user', JSON.stringify(user))
  } else { return

  }
}

const getHeaders = () => {
  return  JSON.parse(localStorage.getItem('user'))
}

const makeParams = (params) => {
  params.personal_id = parseInt(params.personal_id)
  params.telephone_number = parseInt(params.telephone_number)
  params.mobile_pay = parseInt(params.mobile_pay)
  params.bank = params.bank.toLowerCase()
  return params
}

  export const beneficiaryData = async function loadData(setUser, filterTemporalData){
  return await axios.get('http://localhost:3001/', { headers: getHeaders()})
    .then(function (response) {
      setHeaders(response.headers)
      filterTemporalData(response.data)
      return response.data
    })
    .catch(function (error) {
      setUser(false)
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
        setUser(false)
        return error      
      })
  }

  export const signOut = async function logOut() {
    return await axios.delete('http://localhost:3001/auth/sign_out', {headers: getHeaders()})
      .then(function (response) {
        localStorage.clear()
        return response
      })
      .catch(function (error) {
        return error      
      })
  }

  export const createBeneficiary = async function create(params, setUser, filterTemporalData) {
    const body = makeParams(params)
    return await axios.post('http://localhost:3001/beneficiary', body, {headers: getHeaders()})
      .then(function (response) {
        setHeaders(response.headers)
        beneficiaryData(setUser, filterTemporalData)
        return response
      })
      .catch(function (response, error) {
        setUser(false)
        return error      
      })
  }