import axios from 'axios'

export const getFetch = (route, data = null) => axios.get(
  `http://localhost:7000/api${route}`, {
    withCredentials: true,
    data
  })
  .then(({ data }) => data.body)
