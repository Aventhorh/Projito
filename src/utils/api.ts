import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

const catchErrors = (err: any) => {
  if (err.response) {
    console.log(err.response);
  } else if (err.request) {
    console.log(err.request);
  } else {
    console.log(err.message);
  }
  return err;
};

export function fetchData<T>(url: string) {
  return api
    .get<Array<T>>(url)
    .then((res) => res)
    .catch(catchErrors);
}
