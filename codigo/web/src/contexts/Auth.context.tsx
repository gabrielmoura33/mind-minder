'use client'

import { parseCookies, setCookie } from 'nookies'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { uuid } from 'uuidv4'

interface IUserProps {
  id: string
  name: string
  email: string
}
interface AuthContextProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: IUserProps | any
}
const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUserProps | null>(null)

  useEffect(() => {
    const cookies = parseCookies()
    const user = cookies['@mindminder:user']

    if (!user) {
      const loggedUser = {
        id: uuid(),
        name: 'John Doe',
        email: 'john.doe@email.com',
      }

      setCookie(undefined, '@mindminder:user', JSON.stringify(loggedUser), {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      })

      setUser(loggedUser)
      return
    }

    setUser(JSON.parse(user))
  }, [])

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
