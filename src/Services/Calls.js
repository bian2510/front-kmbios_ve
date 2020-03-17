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

  export const beneficiaryData = async function loadData(setUser, setData, filterTemporalData){
  return await axios.get(`${process.env.REACT_APP_API_URL}`, { headers: getHeaders()})
    .then(function (response) {
      setHeaders(response.headers)
      setData(response.data.beneficiaries)
      setUser(true)
      return response.data.beneficiaries
    })
    .catch(function (error) {
      setUser(false)
      return error;
    })
  }

  export const signIn = async function logIn(body, setUser) {
    return await axios.post(`${process.env.REACT_APP_API_URL}admin_auth/sign_in`, body)
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

  export const signOut = async function logOut(setUser) {
    return await axios.delete(`${process.env.REACT_APP_API_URL}auth/sign_out`, {headers: getHeaders()})
      .then(function (response) {
        localStorage.clear()
        setUser(false)
        return response
      })
      .catch(function (error) {
        return error      
      })
  }

  export const createBeneficiary = async function create(params, setUser, setData) {
    const body = makeParams(params)
    return await axios.post(`${process.env.REACT_APP_API_URL}beneficiaries`, body, {headers: getHeaders()})
      .then(function (response) {
        setHeaders(response.headers)
        beneficiaryData(setUser, setData)
        return response
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          setUser(false)
          window.alert("Inicie sesion nuevamente")
          return error.response
        }
        if (error.response.status === 422) {
          window.alert("Numero de cuenta ya existe")
          return error
        }
      })
  }

  export const updateBeneficiary = async function update(params, setUser, setData, beneficiary_id, filterTemporalData) {
    const body = makeParams(params)
    return await axios.put(`${process.env.REACT_APP_API_URL}beneficiaries/${beneficiary_id}`, body, {headers: getHeaders()})
      .then(function (response) {
        setHeaders(response.headers)
        beneficiaryData(setUser, setData, filterTemporalData)
        return response
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          setUser(false)
          window.alert("Inicie sesion nuevamente")
          return error.response
        }
        if (error.response.status === 422) {
          window.alert("Numero de cuenta ya existe")
          return error
        }
      })
  }

  export const deleteBeneficiary = async function (beneficiary_id, setUser, setData, filterTemporalData) {
    return await axios.delete(`${process.env.REACT_APP_API_URL}beneficiaries/${beneficiary_id}`, {headers: getHeaders()})
      .then(function (response) {
        setHeaders(response.headers)
        beneficiaryData(setUser, setData, filterTemporalData)
        return response
      })
      .catch(function (error) {
        setUser(false)
        return error      
      })
  }
