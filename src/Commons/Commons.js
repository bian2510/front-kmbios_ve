export const capitalize = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const setHeaders = (user) => {
  if (user['access-token'] !== undefined && user['access-token'] !== "") {
    localStorage.setItem('user', JSON.stringify(user))
  } else { return

  }
}

export const multipartHeaders = () => {
  const headers = getHeaders()
  headers["content-type"] = "multipart/form-data"
  return headers
}

export const getHeaders = () => {
  return  JSON.parse(localStorage.getItem('user'))
}

export const banks = [
  "activo",
  "bancaribe",
  "bancrecer",
  "banesco",
  "banplus",
  "bicentenario",
  "bnc",
  "caroni",
  "exterior",
  "fondo_comun",
  "mercantil",
  "plaza",
  "provincial",
  "tesoro",
  "venezuela",
  "100%banco"
];
