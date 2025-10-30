import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
  //const getAll = () => axios.get(baseUrl).then(response => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data); //Palauttaa päivitetyn henkilön datan.
};

const deleteEntry = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data); //Palauttaa promisen, j
  // onka avulla App.js voi .then() ja .catch() käsitellä tuloksen.
  //SON Server ei yleensä palauta response.data DELETE:ssä
  // (usein tyhjä objekti {} tai undefined), tämä OK koska se kuitenkin palauttaa promisen.
};

export default { getAll, create, update, deleteEntry };
