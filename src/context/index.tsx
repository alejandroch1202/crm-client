import { createContext, useState } from 'react'

interface IAuth {
  token: string
  auth: boolean
}

interface IAppContext {
  auth: IAuth
  setAuth: React.Dispatch<React.SetStateAction<IAuth>>
}

const initialState = {
  auth: {
    token: '',
    auth: false
  },
  setAuth: () => {}
}

const AppContext = createContext<IAppContext>(initialState)

const AppProvider = ({ children }: { children: JSX.Element }) => {
  const [auth, setAuth] = useState({
    token: '',
    auth: false
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
