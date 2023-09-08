import {retrieve, set} from './storage'
import axios, {type AxiosInstance} from 'axios'

// local storage key for user
export const TOKEN_KEY = 'userToken'
// export const API_URL = import.meta.env.API_URL ?? process.env.API_URL

function tokenFromLocalStorage() {
  if (window.localStorage) {
    const value = retrieve(TOKEN_KEY)
    if (value) {
      try {
        const token = JSON.parse(value)
        return token || null
      } catch (e) {
        return null
      }
    }
  }

  return null
}

function tokenToLocalStorage(token: string) {
  set(TOKEN_KEY, token)
}

function getToken() {
  const localStorageToken = tokenFromLocalStorage()
  if (localStorageToken !== undefined && localStorageToken !== null && localStorageToken !== '') {
    return localStorageToken
  }
}

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.PUBLIC_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': '*',
    Authorization: `bearer ${import.meta.env.PUBLIC_API_TOKEN}`,
  },
})
interface ClientProps {
  get: (url: string, config: any) => any
  getOne: (url: string, config: any) => any
  post: (url: string, {arg}: {arg: any}) => any
  put: (url: string, {arg}: {arg: any}) => any
  delete: (url: string, {arg}: {arg: any}) => any
}
class Client implements ClientProps {
  async get(url: string) {
    // api.interceptors.request.use(function (config) {
    //   const token: string = getToken()
    //   config.headers.Authorization = token ? `Bearer ${token}` : ''
    //   return config
    // })

    return await api
      .get(url)
      .then((res: any) => res)
      .catch(error => {
        return error
      })
  }

  async getOne(url: string) {
    return await api
      .get(url)
      .then((res: any) => res)
      .catch(error => {
        return error
      })
  }

  async post(url: string, {arg}: {arg: any}) {
    const {payload, ...configRest} = arg
    return await api
      .post(url, {data: payload}, {...configRest})
      .then((res: any) => res)
      .catch(error => {
        return error
      })
  }

  async put(url: string, {arg}: {arg: any}) {
    const {payload, id, ...configRest} = arg
    return await api
      .put(`${url}/${id as string}`, {data: payload}, {...configRest})
      .then((res: any) => res)
      .catch(error => {
        return error
      })
  }

  async delete(url: string, {arg}: {arg: any}) {
    const {data, id, ...configRest} = arg
    return await api
      .delete(`${url}/${id as string}`, {...configRest})
      .then((res: any) => res)
      .catch(error => {
        return error
      })
  }
}

export {getToken, tokenToLocalStorage}

export default new Client()
