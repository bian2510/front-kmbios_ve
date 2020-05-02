import axios from 'axios';
import { setHeaders, getHeaders } from '../../Commons/Commons'

const makeParams = (params, beneficiary_id) => {
  params.money_received = parseInt(params.money_received)
  params.rate = parseInt(params.rate)
  params.beneficiary_id = parseInt(beneficiary_id)
  params.user_id = parseInt(params.user_id)
  return params
}

export const showTransactions = async function showTransactions(
  setSession,
  setTransactions,
) {
  return await axios
    .get(`${process.env.REACT_APP_API_URL}transactions`, { headers: getHeaders() })
    .then(function (response) {
      setHeaders(response.headers);
      //setSession(true);
      setTransactions(response.data);
      return response.data;
    })
    .catch(function (error) {
      setSession(false);
      return error;
    });
};

export const createTransaction = async function (params, beneficiary_id, setSession, setData) {
  const body = makeParams(params, beneficiary_id)
  return await axios.post(`${process.env.REACT_APP_API_URL}transactions`, body, {headers: getHeaders()})
    .then(function (response) {
      setHeaders(response.headers)
      makeParams(params)
      setData(response.data)
      return response
    })
    .catch(function (error) {
      setSession(false)
      return error
    })
}
