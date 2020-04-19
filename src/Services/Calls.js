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
  params.mobile_pay = params.mobile_pay != "" ? parseInt(params.mobile_pay) : ""
  params.bank = params.bank.toLowerCase()
  return params
}

const makeParamsTransaction = (params, beneficiary_id) => {
  params.money_received = parseInt(params.money_received)
  params.rate = parseInt(params.rate)
  params.beneficiary_id = beneficiary_id
  params.user_id = parseInt(params.user_id)
  return params
}

  export const LoadData = async function loadData(setSession, setBeneficiaries, setTransactions, setUsers){
  return await axios.get(`${process.env.REACT_APP_API_URL}`, { headers: getHeaders()})
    .then(function (response) {
      setHeaders(response.headers)
      setSession(true)
      setBeneficiaries(response.data.beneficiaries)
      setTransactions(response.data.transactions)
      setUsers(response.data.users)
      return response.data
    })
    .catch(function (error) {
      setSession(false)
      return error;
    })
  }

  export const signIn = async function logIn(body, setSession) {
    return await axios.post(`${process.env.REACT_APP_API_URL}admin_auth/sign_in`, body)
      .then(function (response) {
        setHeaders(response.headers)
        setSession(true)
        return response
      })
      .catch(function (error) {
        setSession(false)
        return error      
      })
  }

  export const signOut = async function logOut(setSession) {
    return await axios.delete(`${process.env.REACT_APP_API_URL}auth/sign_out`, {headers: getHeaders()})
      .then(function (response) {
        localStorage.clear()
        setSession(false)
        return response
      })
      .catch(function (error) {
        return error      
      })
  }

  export const createBeneficiary = async function create(params, setSession, setData) {
    const body = makeParams(params)
    return await axios.post(`${process.env.REACT_APP_API_URL}beneficiaries`, body, {headers: getHeaders()})
      .then(function (response) {
        setHeaders(response.headers)
        setData(response.data)
        return response
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          setSession(false)
          window.alert("Inicie sesion nuevamente")
          return error.response
        }
        if (error.response.status === 422) {
          window.alert("Numero de cuenta ya existe")
          return error
        }
      })
  }

  export const updateBeneficiary = async function update(params, setSession, setData, beneficiary_id) {
    const body = makeParams(params)
    return await axios.put(`${process.env.REACT_APP_API_URL}beneficiaries/${beneficiary_id}`, body, {headers: getHeaders()})
      .then(function (response) {
        setHeaders(response.headers)
        setData(response.data)
        return response
      })
      .catch(function (error) {
        setSession(false)
        return error.response
      })
  }

  export const deleteBeneficiary = async function (beneficiary_id, setSession, setData) {
    return await axios.delete(`${process.env.REACT_APP_API_URL}beneficiaries/${beneficiary_id}`, {headers: getHeaders()})
      .then(function (response) {
        setHeaders(response.headers)
        setData(response.data)
        return response
      })
      .catch(function (error) {
        setSession(false)
        return error      
      })
  }

  export const createTransaction = async function (params, beneficiary_id, setSession, setData) {
    const body = makeParamsTransaction(params, beneficiary_id)
    return await axios.post(`${process.env.REACT_APP_API_URL}transactions`, body, {headers: getHeaders()})
      .then(function (response) {
        setHeaders(response.headers)
        makeParamsTransaction(params)
        setData(response.data)
        return response
      })
      .catch(function (error) {
        setSession(false)
        return error      
      })
  }
