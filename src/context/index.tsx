import { createContext, useState } from 'react'

interface IAuth {
  token: string
  auth: boolean
}

interface IAppContext {
  auth: IAuth
  setAuth: React.Dispatch<React.SetStateAction<IAuth>>
}

const token = localStorage.getItem('token')

const initialState = {
  auth: {
    token: token ?? '',
    auth: token !== ''
  },
  setAuth: () => {}
}

const AppContext = createContext<IAppContext>(initialState)

const AppProvider = ({ children }: { children: JSX.Element }) => {
  const [auth, setAuth] = useState({
    token: token ?? '',
    auth: token !== ''
  })

  const globalState = {
    auth,
    setAuth
  }

  return (
    <AppContext.Provider value={globalState}>{children}</AppContext.Provider>
  )
}

export { AppContext, AppProvider }
