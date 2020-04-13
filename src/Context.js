import React, { createContext, useState } from 'react'
export const Context = createContext()

const Provider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false)
  const [userToken, setUserToken] = useState(false)
  const value = {
    isAuth,
    userToken,
    setToken: (token) => {
      if (!token) {
        setIsAuth(false)
      }
      setUserToken(token)
      setIsAuth(true)
    }
  }

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

export default {
  Provider,
  Consumer: Context.Consumer
}
