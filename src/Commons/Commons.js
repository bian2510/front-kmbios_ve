export const capitalize = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const setHeaders = (user) => {
  if (user['access-token'] !== "") {
    localStorage.setItem('user', JSON.stringify(user))
  } else { return

  }
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
