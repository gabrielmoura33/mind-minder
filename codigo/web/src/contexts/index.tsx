import { ReactNode } from 'react'
import { AuthContextProvider } from './Auth.context'

export function AppContextProvider({ children }: { children: ReactNode }) {
  return <AuthContextProvider>{children}</AuthContextProvider>
}
