import axios from 'axios';
import { setHeaders, getHeaders, multipartHeaders } from '../../Commons/Commons'

const makeParams = (params, beneficiary_id) => {
  params.money_received = parseInt(params.money_received)
  params.rate = parseInt(params.rate)
  params.beneficiary_id = parseInt(beneficiary_id)
  params.user_id = parseInt(params.user_id)
  return params
}

const makeUpdateParams = (transaction, file) => {
  transaction.voucher = file
  return transaction
}

export const showTransactions = async function showTransactions(
  setSession,
  setTransactions,
) {
  return await axios
    .get(`${process.env.REACT_APP_API_URL}transactions`, { headers: getHeaders() })
    .then(function (response) {
      setHeaders(response.headers);
      setTransactions(response.data);
      return response.data;
    })
    .catch(function (error) {
      setSession(false);
      return error;
    });
};

export const createTransaction = async function (params, beneficiary_id, setSession, setTransactions) {
  const body = makeParams(params, beneficiary_id)
  return await axios.post(`${process.env.REACT_APP_API_URL}transactions`, body, {headers: getHeaders()})
    .then(function (response) {
      setHeaders(response.headers)
      showTransactions(setSession, setTransactions)
      return response
    })
    .catch(function (error) {
      setSession(false)
      console.log("ERROOOOR")
      console.log(error)
      return error
    })
}

export const updateTransaction = async function (transaction, files, setSession, setTransactions) {
  const body = makeUpdateParams(transaction, files)
  const fd = new FormData();
  fd.append('voucher', files[0], files[0].name)
  console.log("request", body)
  return await axios.put(`${process.env.REACT_APP_API_URL}transactions/${transaction.id}`, fd, {headers: multipartHeaders()})
    .then(function (response) {
      setHeaders(response.headers)
      //showTransactions(setSession, setTransactions)
      return response
    })
    .catch(function (error) {
      //setSession(false)
      console.log("ERROOOOR")
      console.log(error)
      return error
    })
}
