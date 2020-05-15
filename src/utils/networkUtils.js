import axios from 'axios'

export const getFetch = (route, data = null) => axios.get(
  `http://localhost:7000/api${route}`, {
    withCredentials: true,
    data
  })
  .then(({ data }) => data.body)

export const sendPost = (route, payload = {}, config = {}) => axios.post(
  `http://localhost:7000/api${route}`, {
    ...payload
  },
  {
    withCredentials: true,
    ...config
  })
  .then(({ data }) => data.body)

export const sendPut = (route, payload = {}, config = {}) => axios.put(
`http://localhost:7000/api${route}`, {
  ...payload
},
{
  withCredentials: true,
  ...config
})
  .then(({ data }) => data.body)
