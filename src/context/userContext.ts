import { createContext, useContext } from "react"

export type GlobalContent = {
  isAuthenticated: string
  setIsAuthenticated:(c: string) => void
}
export const UserContext = createContext<GlobalContent>({
    isAuthenticated: localStorage.getItem("token") || '', // set a default value
    setIsAuthenticated: () => {},
})
export const useUserContext = () => useContext(UserContext)