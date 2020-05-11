import axios from 'axios'

export const getFetch = (route, token) => axios.get(
  `http://localhost:7000/api${route}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  .then(({ data }) => data.body)
