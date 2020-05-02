import axios from "axios";
import { setHeaders, getHeaders } from "../../Commons/Commons";

const makeParams = (params) => {
  params.personal_id = parseInt(params.personal_id);
  params.telephone_number = parseInt(params.telephone_number);
  params.mobile_pay =
    params.mobile_pay != "" ? parseInt(params.mobile_pay) : "";
  params.bank = params.bank.toLowerCase();
  return params;
};

export const showBeneficiaries = async function showBeneficiaries(
  setSession,
  setBeneficiaries
) {
  return await axios
    .get(`${process.env.REACT_APP_API_URL}beneficiaries`, { headers: getHeaders() })
    .then(function (response) {
      setHeaders(response.headers);
      //setSession(true);
      setBeneficiaries(response.data);
      return response.data;
    })
    .catch(function (error) {
      //setSession(false);
      return error;
    });
};

export const createBeneficiary = async function create(
  params,
  setSession,
  setData
) {
  const body = makeParams(params);
  return await axios
    .post(`${process.env.REACT_APP_API_URL}beneficiaries`, body, {
      headers: getHeaders(),
    })
    .then(function (response) {
      setHeaders(response.headers);
      setData(response.data);
      return response;
    })
    .catch(function (error) {
      if (error.response.status === 401) {
        setSession(false);
        window.alert("Inicie sesion nuevamente");
        return error.response;
      }
      if (error.response.status === 422) {
        window.alert("Numero de cuenta ya existe");
        return error;
      }
    });
};

export const updateBeneficiary = async function update(
  params,
  setSession,
  setData,
  beneficiary_id
) {
  const body = makeParams(params);
  return await axios
    .put(
      `${process.env.REACT_APP_API_URL}beneficiaries/${beneficiary_id}`,
      body,
      { headers: getHeaders() }
    )
    .then(function (response) {
      setHeaders(response.headers);
      setData(response.data);
      return response;
    })
    .catch(function (error) {
      setSession(false);
      return error.response;
    });
};

export const deleteBeneficiary = async function (
  beneficiary_id,
  setSession,
  setData
) {
  return await axios
    .delete(`${process.env.REACT_APP_API_URL}beneficiaries/${beneficiary_id}`, {
      headers: getHeaders(),
    })
    .then(function (response) {
      setHeaders(response.headers);
      setData(response.data);
      return response;
    })
    .catch(function (error) {
      setSession(false);
      return error;
    });
};
