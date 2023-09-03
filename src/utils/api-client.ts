import {set} from './storage'

export const cookieDomain = import.meta.env.COOKIE_DOMAIN
export const tokenCookieName = cookieDomain ? 'token' : 'staging_token'

// local storage key for user
export const TOKEN_KEY = 'userToken'

function tokenFromLocalStorage() {
  if (window?.localStorage) {
    const value = window.localStorage.getItem(TOKEN_KEY)
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

function onFetchDone(response: any) {
  // handle no content response (204)
  if (response.status === 204) {
    return Promise.resolve()
  }
  if (response.status >= 200 && response.status < 300) {
    return response.json()
  } else {
    const error = new Error(response.statusText)
    // @ts-expect-error Property 'response' does not exist on type 'Error'
    error.response = response
    throw error
  }
}

async function client(endpoint: string, {arg}: {arg: any}) {
  const token = getToken()
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: '',
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  const config = arg ?? {}
  const {body, ...restConfig} = config
  const bodyConfig = body ? {body: JSON.stringify(body)} : {}
  const fetchConfig = {
    method: body ? 'POST' : 'GET',
    ...restConfig,
    ...bodyConfig,
    headers: {
      ...headers,
      ...restConfig.headers,
    },
  }

  return await fetch(`${import.meta.env.API_URL}/${endpoint}`, fetchConfig).then(onFetchDone)
}

export {getToken, tokenToLocalStorage}

export default client
